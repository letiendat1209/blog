import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Tạo access token
export const signAccessToken = ({ userId, sessionId, role }) => {
  return jwt.sign(
    {
      id: userId,
      sid: sessionId,
      role, // optional nhưng rất nên
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    }
  );
};

// Tạo refresh token
export const signRefreshToken = (userId) => {
  const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "30", 10);
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const token = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${days}d`,
  });
  return { token, expiresAt };
};

// Tạo hash token (để lưu vào db)
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
