import { RedisOptions } from "bullmq";

export const connection: RedisOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
};
