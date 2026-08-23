import express from 'express';
import prisma from './config/prisma.ts'
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import spillRoutes from "./routes/spill.routes";
import analysisRoutes from "./routes/analysis.routes";



const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/spills", spillRoutes);
app.use("/api/analysis", analysisRoutes);

app.get('/',(req,res)=>{
    res.json({
        message:"ghosh ki ma ka bhosda",
    })
})

app.get("/health", async (req, res) => {
  try {
    await prisma.$runCommandRaw({ ping: 1 });

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export default app