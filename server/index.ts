import express from 'express';
import { ENV } from "./src/config/env.ts"
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.ts';
import productRoutes from './src/routes/productRoutes.ts';
import commentRoutes from './src/routes/commentRoutes.ts';

const app = express();

app.use(cors({
  origin: ENV.FRONTEND_URL, // Allow all origins
})); // Enable CORS for all routes
app.use(clerkMiddleware()); // Add Clerk middleware to handle authentication and user management
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/health", (req, res) => {
  res.json({
    message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
  console.log(`http://localhost:${ENV.PORT}`);
});