import { Worker } from "bullmq";
import redis from "../config/redis";
import prisma from "../config/prisma";

const worker = new Worker(
  "analysis",
  async (job) => {
    const { analysisId, spillId } = job.data;

    console.log(`Processing analysis: ${analysisId}`);

    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: "PROCESSING",
      },
    });

    // ML processing will come here later

    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: "COMPLETED",
      },
    });

    console.log(`Analysis completed: ${analysisId}`);
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

export default worker;
