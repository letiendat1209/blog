export const rateLimitByRole = async (req, res, next) => {
  const role = req.user?.role ?? "GUEST";

  const limits = {
    GUEST: 10,
    USER: 60,
    ADMIN: 1000,
  };

  const limit = limits[role];

  // key theo IP + role
  const key = `rl:${role}:${getClientIp(req)}`;

  const count = await incrWithTTL(key, 60);

  if (count > limit) {
    return res.status(429).json({ error: "Too many requests" });
  }

  next();
};
