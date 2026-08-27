import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    // Retry with increasing delay up to 3 seconds
    return Math.min(times * 200, 3000);
  },
});

redis.on("connect", () => {
  console.log("Redis connected successfully.");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err.message);
});

export default redis;