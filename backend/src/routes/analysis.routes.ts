import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";
import { analysisQueue } from "../queues/analysis.queue";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  const { spillId } = req.body;

  const analysis = await prisma.analysis.create({
    data: {
      spillId,
      status: "PENDING",
    },
  });

  await analysisQueue.add("process-analysis", {
    analysisId: analysis.id,
    spillId,
  });

  res.status(202).json({
    message: "Analysis queued",
    analysisId: analysis.id,
  });
});

export default router;