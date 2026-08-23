import {Router} from "express";
import prisma from "../config/prisma";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,async (req,res)=>{
    const spills = await prisma.SpillEvent.findMany({
        orderBy:{
            createdAt:"desc",
        }
    })
    res.json(spills);
})


router.post("/",authenticate,async (req,res)=>{
    const { latitude, longitude, detectedAt, imageUrl } = req.body;
    const user = (req as any).user;
    const spill = await prisma.SpillEvent.create({
        data:{
            latitude,
            longitude,
            detectedAt: new Date(detectedAt),
            imageUrl,
            createdById: user.userId,
        }
    })
    res.status(201).json(spill);
})


router.get("/:id", authenticate, async (req, res) => {
  const spill = await prisma.spillEvent.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!spill) {
    return res.status(404).json({
      message: "Spill not found",
    });
  }

  res.json(spill);
});

export default router;