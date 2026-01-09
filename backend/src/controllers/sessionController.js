import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, hashToken } from "../auth/auth.js";
import { cleanupExpiredSessions } from "../services/sessionService.js";
import crypto from "crypto";
import ms from "ms";

const COOKIE_NAME = process.env.COOKIE_REFRESH_NAME || "jid";
const COOKIE_SECURE = process.env.COOKIE_SECURE === "true" || false;
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || "lax";
const COOKIE_PATH = process.env.COOKIE_PATH; 

const accessExpiresInMs = ms(process.env.ACCESS_TOKEN_EXPIRES_IN);
/**
 * Production-grade refresh
 * - Atomic rotate refresh token
 * - Detect reuse (double refresh)
 * - Return new access token
 */
export const refresh = async (req, res) => {
  const requestId = crypto.randomUUID(); // for production log correlation
  try {
    const tokenFromCookie = req.cookies[COOKIE_NAME];
    if (!tokenFromCookie) {
      console.warn(`[${requestId}] Refresh failed: no token`);
      return res.status(401).json({ message: "No refresh token" });
    }

    let payload;
    try {
      payload = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET);
    } catch {
      console.warn(`[${requestId}] Invalid refresh token`);
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokenHash = hashToken(tokenFromCookie);

    // Atomic transaction to rotate token + detect reuse
    const session = await prisma.$transaction(async (tx) => {
      // 1️⃣ Find session by tokenHash
      const existing = await tx.session.findUnique({
        where: { tokenHash },
        include: { user: true },
      });

      if (!existing) {
        console.warn(`[${requestId}] Refresh token not found / revoked`);
        return null;
      }

      if (existing.revoked) {
        console.warn(
          `[${requestId}] Refresh token reuse detected for userId=${existing.userId}`
        );
        // Optional: revoke all sessions if reuse detected
        await tx.session.updateMany({
          where: { userId: existing.userId },
          data: { revoked: true },
        });
        return null;
      }

      if (new Date() > existing.expiresAt) {
        console.warn(
          `[${requestId}] Refresh token expired for userId=${existing.userId}`
        );
        return null;
      }

      if (existing.user.status === "BANNED") {
        console.warn(`[${requestId}] Account banned userId=${existing.userId}`);
        return null;
      }

      // 2️⃣ Rotate token atomically
      const { token: newRefreshPlain, expiresAt } = signRefreshToken(
        existing.userId
      );
      const newHash = hashToken(newRefreshPlain);

      const updatedSession = await tx.session.update({
        where: { id: existing.id },
        data: {
          tokenHash: newHash,
          expiresAt,
          updatedAt: new Date(),
        },
        include: { user: true },
      });

      return { session: updatedSession, newRefreshPlain, expiresAt };
    });

    if (!session) {
      return res.status(401).json({ message: "Refresh failed" });
    }

    // 3️⃣ Sign new access token (with sid)
    const newAccess = signAccessToken({
      userId: session.session.userId,
      sessionId: session.session.id,
      role: session.session.user.role,
    });

    // 4️⃣ Set refresh token cookie (ROTATE)
    res.cookie(COOKIE_NAME, session.newRefreshPlain, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: COOKIE_PATH,
      expires: session.expiresAt,
    });

    // ✅ 5️⃣ SET LẠI ACCESS TOKEN COOKIE (CÁI THIẾU TRƯỚC GIỜ)
    res.cookie("access_token", newAccess, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: "/", // QUAN TRỌNG
      maxAge: accessExpiresInMs,
    });

    // 6️⃣ Return cho FE biết thời gian (optional)
    return res.json({
      expiresIn: Math.floor(accessExpiresInMs / 1000),
    });
  } catch (err) {
    console.error(`[${requestId}] Refresh error:`, err);
    return res.status(500).json({
      message: "Refresh failed",
      error: "Internal server error",
      requestId,
    });
  }
};

/**
 * Get all sessions for current user
 */
export const getSessions = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentSessionId = req.sessionId;

    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Cleanup expired sessions
    await cleanupExpiredSessions(currentUser.id);

    const sessions = await prisma.session.findMany({
      where: {
        userId: currentUser.id,
        revoked: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        deviceId: true,
        userAgent: true,
        ip: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    const data = sessions.map((session) => ({
      id: session.id,
      deviceId: session.deviceId,
      userAgent: session.userAgent || "Unknown device",
      ip: session.ip || "Unknown IP",
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
      current: session.id === currentSessionId,
    }));

    return res.json({
      status: "success",
      data,
    });
  } catch (err) {
    console.error("Get sessions error:", err);
    return res.status(500).json({
      message: "Get sessions failed",
    });
  }
};


/**
 * Revoke a specific session
 */
export const revokeSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const currentUser = req.user;

    if (!currentUser) {
      return res.sendStatus(401);
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.sendStatus(404);
    }

    if (session.userId !== currentUser.id) {
      return res.sendStatus(403);
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    });

    // FE tự quyết định logout nếu revoke trúng session hiện tại
    return res.sendStatus(204);
  } catch (err) {
    console.error("Revoke session error:", err);
    return res.sendStatus(500);
  }
};


/**
 * Revoke all sessions for current user
 */
export const revokeAllSessions = async (req, res) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      return res.sendStatus(401);
    }

    await prisma.session.updateMany({
      where: { userId: currentUser.id },
      data: { revoked: true },
    });

    // Clear refresh token => current session chết luôn
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: COOKIE_PATH,
    });

    // FE sẽ clear access token store & redirect login
    return res.sendStatus(204);
  } catch (err) {
    console.error("Revoke all error:", err);
    return res.sendStatus(500);
  }
};

