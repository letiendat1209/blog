import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Lấy access token (cookie > header)
    const token =
      req.cookies?.access_token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: "No access token" });
    }

    // 2️⃣ Verify JWT
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch {
      return res.status(401).json({ message: "Invalid access token" });
    }

    // 3️⃣ BẮT BUỘC có sessionId
    if (!payload.sid) {
      return res.status(401).json({ message: "Session information missing" });
    }

    // 4️⃣ Check session tồn tại & chưa revoked
    const session = await prisma.session.findUnique({
      where: { id: payload.sid },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
          },
        },
      },
    });

    if (!session || session.revoked) {
      return res.status(401).json({ message: "Session revoked or not found" });
    }

    // 5️⃣ Check user status
    if (session.user.status === "BANNED") {
      return res.status(403).json({ message: "Account banned" });
    }

    // 6️⃣ Attach vào req
    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    };

    req.sessionId = session.id;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
