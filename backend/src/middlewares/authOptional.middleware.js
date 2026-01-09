import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const authOptional = async (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      req.user = null;
      return next();
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, role: true },
    });

    req.user = user ?? null;
    next();
  } catch {
    req.user = null;
    next();
  }
};
