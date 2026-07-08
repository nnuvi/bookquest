import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";

import { requestId } from "./middleware/requestId.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";
import notificationRoutes from "./routes/notification.route.js";
import recordRoutes from "./routes/record.route.js";
import userRoutes from "./routes/user.route.js";
import friendRoutes from "./routes/friend.route.js";
import borrowRoutes from "./routes/borrow.route.js";
import returnRoutes from "./routes/return.route.js";

import env from "./config/env.js";

const app = express();

const allowedOrigins = new Set([
  env.CLIENT_LOCAL_URL,
  env.CLIENT_MOBILE_URL,
  env.CLIENT_BASE_URL,
]);

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Global Middlewares
app.use(cors(corsOptions));

app.use(requestId);

app.use(requestLogger);

app.use(express.json({ limit: "1mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Health Check
app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/return", returnRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/record", recordRoutes);
app.use("/api/notification", notificationRoutes);

// Error Middlewares

// Handle unknown routes
app.use(notFound);

// Global error handler last
app.use(errorHandler);

export default app;
