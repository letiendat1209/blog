import { prisma } from "../config/prisma.js";

const MAX_SESSIONS = 5;

// Helper: cleanup expired + revoked sessions
const cleanupExpiredSessions = async (userId) => {
  await prisma.session.deleteMany({
    where: {
      userId,
      OR: [{ expiresAt: { lt: new Date() } }, { revoked: true }],
    },
  });
};

// Helper: enforce max sessions limit
const enforceSessionLimit = async (userId, excludeSessionId = null) => {
  const sessions = await prisma.session.findMany({
    where: {
      userId,
      revoked: false,
      expiresAt: { gte: new Date() },
      ...(excludeSessionId && { id: { not: excludeSessionId } }),
    },
    orderBy: { updatedAt: "desc" }, // newest first
  });

  // ✅ Chỉ revoke khi vượt quá limit
  if (sessions.length > MAX_SESSIONS) {
    const sessionsToRevoke = sessions.slice(MAX_SESSIONS);

    await prisma.session.updateMany({
      where: {
        id: { in: sessionsToRevoke.map((s) => s.id) },
      },
      data: { revoked: true },
    });
  }
};

// Helper: create or update session
const upsertSession = async (userId, deviceId, req, refreshHash, expiresAt) => {
  // 1️⃣ Cleanup trước
  await cleanupExpiredSessions(userId);

  // 2️⃣ Check session theo device
  const existingSession = await prisma.session.findFirst({
    where: {
      userId,
      deviceId,
      revoked: false,
      expiresAt: { gte: new Date() },
    },
  });

  let session;

  if (existingSession) {
    // 🔁 Update session cũ
    session = await prisma.session.update({
      where: { id: existingSession.id },
      data: {
        tokenHash: refreshHash,
        expiresAt,
        userAgent: req.get("user-agent") || null,
        ip: req.ip || null,
        updatedAt: new Date(),
      },
    });
  } else {
    // 3️⃣ Enforce limit TRƯỚC khi tạo mới
    await enforceSessionLimit(userId);

    // ➕ Create session mới
    session = await prisma.session.create({
      data: {
        userId,
        deviceId,
        userAgent: req.get("user-agent") || null,
        ip: req.ip || null,
        tokenHash: refreshHash,
        expiresAt,
      },
    });
  }

  // ⭐ CỰC KỲ QUAN TRỌNG
  return session;
};

export { cleanupExpiredSessions, upsertSession };
