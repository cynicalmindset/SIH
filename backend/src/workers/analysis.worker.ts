import { Worker } from "bullmq";
import axios from "axios";
import redis from "../config/redis";
import prisma from "../config/prisma";

// URL of the FastAPI ML microservice.
// Override via ML_SERVICE_URL in .env for non-local environments.
const ML_SERVICE_URL = process.env.ML_SERVICE_URL ?? "http://localhost:8000";

const worker = new Worker(
  "analysis",
  async (job) => {
    const { analysisId, spillId } = job.data;

    console.log(`[worker] Starting analysis ${analysisId} for spill ${spillId}`);

    // ── Step 1: Mark as PROCESSING ─────────────────────────────────────────
    await prisma.analysis.update({
      where: { id: analysisId },
      data: { status: "PROCESSING" },
    });

    // ── Step 2: Fetch spill data to send to ML service ─────────────────────
    const spill = await prisma.spillEvent.findUnique({
      where: { id: spillId },
    });

    if (!spill) {
      await prisma.analysis.update({
        where: { id: analysisId },
        data: { status: "FAILED" },
      });
      throw new Error(`SpillEvent ${spillId} not found`);
    }

    // ── Step 3: Call ML service ────────────────────────────────────────────
    // Sends spill coordinates and detection time.
    // Expects: { latitude, longitude, confidence }
    let mlResult: { latitude: number; longitude: number; confidence?: number };

    try {
      const response = await axios.post(
        `${ML_SERVICE_URL}/predict`,
        {
          spillId,
          latitude: spill.latitude,
          longitude: spill.longitude,
          detectedAt: spill.detectedAt,
          imageUrl: spill.imageUrl ?? null,
        },
        { timeout: 30_000 } // 30 s timeout — ML inference may take time
      );

      mlResult = response.data;
      console.log(`[worker] ML prediction received:`, mlResult);
    } catch (mlError: any) {
      console.error(`[worker] ML service call failed:`, mlError?.message ?? mlError);

      // Mark as FAILED so frontend knows the analysis did not complete
      await prisma.analysis.update({
        where: { id: analysisId },
        data: { status: "FAILED" },
      });

      throw new Error(`ML service error: ${mlError?.message ?? "unknown"}`);
    }

    // ── Step 4: Persist ML results ─────────────────────────────────────────
    // originLat / originLon are the predicted spill source coordinates.
    // originTime is estimated as the spill detection time (ML can override this later).
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: "COMPLETED",
        originLat: mlResult.latitude,
        originLon: mlResult.longitude,
        originTime: spill.detectedAt, // ML service can supply this when model is real
      },
    });

    // ── Step 5: Update the parent SpillEvent status ────────────────────────
    await prisma.spillEvent.update({
      where: { id: spillId },
      data: { confidence: mlResult.confidence ?? null, status: "COMPLETED" },
    });

    console.log(`[worker] Analysis ${analysisId} completed. Origin: ${mlResult.latitude}, ${mlResult.longitude}`);
  },
  {
    connection: redis,
    // Retry failed jobs up to 3 times with exponential back-off
    settings: {},
  }
);

// ── Event listeners ────────────────────────────────────────────────────────
worker.on("completed", (job) => {
  console.log(`[worker] Job ${job.id} completed successfully`);
});

worker.on("failed", (job, error) => {
  console.error(`[worker] Job ${job?.id} failed:`, error.message);
});

worker.on("error", (error) => {
  console.error(`[worker] Worker error:`, error.message);
});

export default worker;
