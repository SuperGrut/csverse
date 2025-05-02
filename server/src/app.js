import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import routers
import resourceRouter from "./routes/resources.routes.js";
import commentRouter from "./routes/comment.routes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config({
  path: "./.env", // Corrected path assuming .env is in the root
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Added limit
app.use(express.json({ limit: "16kb" })); // Added limit

// Define API version prefix
const API_VERSION = process.env.API_VERSION || "v1";

// Mount routers
app.use(`/api/${API_VERSION}/resources`, resourceRouter);
app.use(`/api/${API_VERSION}/comments`, commentRouter);
app.use(`/api/${API_VERSION}/users`, userRouter);

export { app };
