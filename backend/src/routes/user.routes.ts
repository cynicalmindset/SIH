import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// ── GET /api/users ─────────────────────────────────────────────────────────
// Returns all users. passwordHash is explicitly excluded from the response.
router.get("/", authenticate, async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(users);
  } catch (error) {
    console.error("users list error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;