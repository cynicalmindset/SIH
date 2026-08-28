import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";
import { analysisQueue } from "../queues/analysis.queue";

const router = Router();

// ── POST /api/analysis ─────────────────────────────────────────────────────
// Creates an Analysis record and queues it for processing.
// Returns 202 immediately — processing is asynchronous.
router.post("/", authenticate, async (req, res) => {
  try {
    const { spillId } = req.body;

    if (!spillId) {
      return res.status(400).json({ message: "spillId is required" });
    }

    // Verify the spill exists
    const spill = await prisma.spillEvent.findUnique({ where: { id: spillId } });
    if (!spill) {
      return res.status(404).json({ message: "SpillEvent not found" });
    }

    // Guard: one analysis per spill
    const existing = await prisma.analysis.findUnique({ where: { spillId } });
    if (existing) {
      return res.status(409).json({
        message: "Analysis already exists for this spill",
        analysisId: existing.id,
        status: existing.status,
      });
    }

    const analysis = await prisma.analysis.create({
      data: { spillId, status: "PENDING" },
    });

    await analysisQueue.add("process-analysis", {
      analysisId: analysis.id,
      spillId,
    });

    return res.status(202).json({
      message: "Analysis queued",
      analysisId: analysis.id,
      status: analysis.status,
    });
  } catch (error) {
    console.error("analysis create error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ── GET /api/analysis/spill/:spillId ──────────────────────────────────────
// Returns the analysis record for a given spill, including status and ML results.
// Frontend polls this to track progress and retrieve origin predictions.
router.get("/spill/:spillId", authenticate, async (req, res) => {
  try {
    const { spillId } = req.params;

    const analysis = await prisma.analysis.findUnique({
      where: { spillId },
      include: {
        spill: {
          select: {
            id: true,
            latitude: true,
            longitude: true,
            detectedAt: true,
            status: true,
          },
        },
      },
    });

    if (!analysis) {
      return res.status(404).json({ message: "No analysis found for this spill" });
    }

    return res.json({
      id: analysis.id,
      spillId: analysis.spillId,
      status: analysis.status,
      originLat: analysis.originLat,
      originLon: analysis.originLon,
      originTime: analysis.originTime,
      createdAt: analysis.createdAt,
      updatedAt: analysis.updatedAt,
      spill: analysis.spill,
    });
  } catch (error) {
    console.error("analysis get error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ── GET /api/analysis/:id ─────────────────────────────────────────────────
// Returns a single analysis by its own ID (useful after POST returns analysisId).
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        spill: {
          select: {
            id: true,
            latitude: true,
            longitude: true,
            detectedAt: true,
            status: true,
          },
        },
      },
    });

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    return res.json({
      id: analysis.id,
      spillId: analysis.spillId,
      status: analysis.status,
      originLat: analysis.originLat,
      originLon: analysis.originLon,
      originTime: analysis.originTime,
      createdAt: analysis.createdAt,
      updatedAt: analysis.updatedAt,
      spill: analysis.spill,
    });
  } catch (error) {
    console.error("analysis get by id error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;