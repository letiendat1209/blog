import { incrWithTTL } from "../lib/redis.js";
import { getClientIp } from "../utils/index.js";

export const guestCommentRateLimit = async (req, res, next) => {
  try {
    const ip = getClientIp(req);
    const guestId = req.cookies?.guest_id ?? "no-cookie";

    const key = `rl:guest:${ip}:${guestId}`;

    // 5 comment / 60s
    const count = await incrWithTTL(key, 60);

    if (count > 5) {
      return res.status(429).json({
        message: "Bạn comment quá nhanh, vui lòng thử lại sau",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limit error:", err);
    res.status(500).json({ message: "Rate limit failed" });
  }
};
