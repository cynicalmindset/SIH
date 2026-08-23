import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  const { spillId } = req.body;

  const analysis = await prisma.analysis.create({
    data: {
      spillId,
      status: "PENDING",
    },
  });

  res.status(201).json(analysis);
});

export default router;