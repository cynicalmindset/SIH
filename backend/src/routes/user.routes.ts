import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate, async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

export default router;