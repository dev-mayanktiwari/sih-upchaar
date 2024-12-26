import redis from "redis";
import dotenv from "dotenv";
dotenv.config();


// const redisUrl = process.env.REDIS_URL;

// console.log("REDIS_URL", redisUrl);

const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

export default client;
