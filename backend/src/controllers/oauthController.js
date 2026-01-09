import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, hashToken } from "../auth/auth.js";
import { v4 as uuidv4 } from "uuid";
import { upsertSession } from "../services/sessionService.js";
import ms from "ms";

const COOKIE_NAME = process.env.COOKIE_REFRESH_NAME;
const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || "lax";
const COOKIE_PATH = process.env.COOKIE_PATH || "/";
const FRONTEND_URL = process.env.FRONTEND_URL;

const accessExpiresInMs = ms(process.env.ACCESS_TOKEN_EXPIRES_IN);
/**
 * Xử lý OAuth callback (Google/GitHub)
 * Được gọi sau khi user authorize từ OAuth provider
 */
export const handleOAuthCallback = async (req, res) => {
  try {
    const oauthProfile = req.user;

    if (!oauthProfile) {
      return res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
    }

    const {
      provider,
      providerId,
      email,
      name,
      avatarUrl,
      accessToken,
      refreshToken,
      expiresAt,
    } = oauthProfile;

    // 1. Tìm account theo provider
    let account = await prisma.account.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
      include: { user: true },
    });

    let user;

    if (account) {
      user = account.user;

      await prisma.account.update({
        where: { id: account.id },
        data: {
          accessToken,
          refreshToken,
          expiresAt,
          updatedAt: new Date(),
        },
      });
    } else {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        user = existingUser;

        await prisma.account.create({
          data: {
            userId: user.id,
            provider,
            providerId,
            accessToken,
            refreshToken,
            expiresAt,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email,
            name,
            avatarUrl,
            status: "ACTIVE",
            accounts: {
              create: {
                provider,
                providerId,
                accessToken,
                refreshToken,
                expiresAt,
              },
            },
          },
        });
      }
    }

    // 2. Check status
    if (user.status === "BANNED") {
      return res.redirect(`${FRONTEND_URL}/login?error=account_banned`);
    }

    // 3. Tạo refresh token + session
    const { token: refreshTokenPlain, expiresAt: refreshExpiresAt } =
      signRefreshToken(user.id);
    const refreshHash = hashToken(refreshTokenPlain);

    const deviceId = req.headers["x-device-id"] || uuidv4();

    // ⚠️ upsertSession PHẢI return session
    const session = await upsertSession(
      user.id,
      deviceId,
      req,
      refreshHash,
      refreshExpiresAt
    );

    // 4. Tạo access token CÓ sessionId
    const jwtAccessToken = signAccessToken({
      userId: user.id,
      sessionId: session.id,
      role: user.role,
    });

    // 5. Set refresh token cookie
    res.cookie(COOKIE_NAME, refreshTokenPlain, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: COOKIE_PATH,
      expires: refreshExpiresAt,
    });

    // 6. Set access token cookie
    res.cookie("access_token", jwtAccessToken, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: "/",
      maxAge: accessExpiresInMs,
    });

    return res.redirect(`${FRONTEND_URL}/auth/callback`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    return res.redirect(`${FRONTEND_URL}/login?error=server_error`);
  }
};


/**
 * Logout
 */
export const logout = async (req, res) => {
  try {
    // 1️⃣ Revoke theo sessionId (ưu tiên)
    if (req.sessionId) {
      await prisma.session.update({
        where: { id: req.sessionId },
        data: { revoked: true },
      });
    }
    // 2️⃣ Fallback: revoke theo refresh token
    else if (req.cookies[COOKIE_NAME]) {
      const tokenHash = hashToken(req.cookies[COOKIE_NAME]);
      await prisma.session.update({
        where: { tokenHash },
        data: { revoked: true },
      });
    }

    // 3️⃣ Clear refresh token
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: COOKIE_PATH,
    });

    // 4️⃣ Clear access token
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      path: COOKIE_PATH,
    });

    return res.sendStatus(204);
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "logout_failed" });
  }
};

/**
 * Get current user info
 */
export const getCurrentUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        status: true,
        createdAt: true,
        accounts: {
          select: {
            provider: true,
            createdAt: true,
          },
        },
      },
    });

    return res.json({ status: "success", data: user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Get user failed", error: err.message });
  }
};

export const devLogin = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // 1️⃣ Refresh token
    const { token: refreshTokenPlain, expiresAt } = signRefreshToken(userId);
    const refreshHash = hashToken(refreshTokenPlain);

    const deviceId = req.headers["x-device-id"] || uuidv4();

    // 2️⃣ Upsert session
    const session = await upsertSession(
      userId,
      deviceId,
      req,
      refreshHash,
      expiresAt
    );

    // 3️⃣ Access token có sid
    const accessToken = signAccessToken({
      userId,
      sessionId: session.id,
    });

    // 4️⃣ Set cookie
    res.cookie(COOKIE_NAME, refreshTokenPlain, {
      httpOnly: true,
      secure: false, // dev only
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return res.json({
      status: "success",
      accessToken,
    });
  } catch (err) {
    console.error("dev-login error:", err);
    return res.status(500).json({ message: "Dev login failed" });
  }
};
