import express from 'express';
import cors from 'cors';
import prisma from './config/prisma.ts';
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import spillRoutes from "./routes/spill.routes";
import analysisRoutes from "./routes/analysis.routes";
import redis from './config/redis.ts';

const app = express();

// ── CORS ───────────────────────────────────────────────────────────────────
// Allow the Vite dev server and any configured production origin.
// VITE_CLIENT_ORIGIN defaults to http://localhost:5173 for local development.
const allowedOrigins = [
  process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
  })
);

// ── Body parser ────────────────────────────────────────────────────────────
app.use(express.json());

// ── API routes ─────────────────────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/users",    userRoutes);
app.use("/api/spills",   spillRoutes);
app.use("/api/analysis", analysisRoutes);

// ── Root ───────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ message: "Planet Maritime Intelligence API", version: "1.0" });
});

// ── Health checks ──────────────────────────────────────────────────────────
app.get("/health", async (_req, res) => {
  try {
    await prisma.$runCommandRaw({ ping: 1 });
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.get("/health/redis", async (_req, res) => {
  try {
    await redis.ping();
    res.json({ status: "ok", redis: "connected" });
  } catch {
    res.status(500).json({ status: "error", redis: "disconnected" });
  }
});

export default app;