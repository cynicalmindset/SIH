import { Queue } from "bullmq";
import redis from "../config/redis";

export const analysisQueue = new Queue("analysis", {
  connection: redis,
});
