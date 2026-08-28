import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// ── GET /api/spills ────────────────────────────────────────────────────────
// Returns all spill events, newest first, with their linked analysis if available.
router.get("/", authenticate, async (_req, res) => {
  try {
    const spills = await prisma.spillEvent.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        analysis: {
          select: {
            id: true,
            status: true,
            originLat: true,
            originLon: true,
            originTime: true,
            updatedAt: true,
          },
        },
      },
    });
    return res.json(spills);
  } catch (error) {
    console.error("spills list error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ── POST /api/spills ───────────────────────────────────────────────────────
// Creates a new spill incident report.
router.post("/", authenticate, async (req, res) => {
  try {
    const { latitude, longitude, detectedAt, imageUrl } = req.body;
    const user = (req as any).user;

    if (latitude === undefined || longitude === undefined || !detectedAt) {
      return res
        .status(400)
        .json({ message: "latitude, longitude and detectedAt are required" });
    }

    const spill = await prisma.spillEvent.create({
      data: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        detectedAt: new Date(detectedAt),
        imageUrl: imageUrl ?? null,
        createdById: user.userId,
      },
    });

    return res.status(201).json(spill);
  } catch (error) {
    console.error("spill create error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ── GET /api/spills/:id ────────────────────────────────────────────────────
// Returns a single spill event with its linked analysis.
router.get("/:id", authenticate, async (req, res) => {
  try {
    const spill = await prisma.spillEvent.findUnique({
      where: { id: req.params.id },
      include: {
        analysis: {
          select: {
            id: true,
            status: true,
            originLat: true,
            originLon: true,
            originTime: true,
            updatedAt: true,
          },
        },
        createdBy: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!spill) {
      return res.status(404).json({ message: "Spill not found" });
    }

    return res.json(spill);
  } catch (error) {
    console.error("spill get error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;