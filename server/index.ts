import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./src/config/env.ts";

import userRoutes from "./src/routes/userRoutes.ts";
import productRoutes from "./src/routes/productRoutes.ts";
import commentRoutes from "./src/routes/commentRoutes.ts";

const app = express();

/**
 * CORS Configuration
 */
app.use(
  cors({
    origin: ENV.FRONTEND_URL || true, // fallback for safety
    credentials: true,
  })
);

/**
 * Middlewares
 */
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Request Logger (optional)
 */
if (ENV.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

/**
 * Common Check Server is running or not
 */
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "NexaCart API",
  });
});

/**
 * Routes
 */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

/**
 * 404 Handler
 */
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/**
 * Global Error Handler
 */
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/**
 * Start Server
 */
const PORT = process.env.PORT || ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});