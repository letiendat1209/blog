import Redis from "ioredis";

let redis = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);

  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis error:", err);
  });
} else {
  console.log("⚠️ Redis disabled (no REDIS_URL)");
}

export { redis };

/**
 * Tăng counter + set TTL nếu là lần đầu
 */
export const incrWithTTL = async (key, ttlSeconds) => {
  if (!redis) {
    // fallback khi không có redis
    return 1;
  }

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, ttlSeconds);
  }

  return count;
};
