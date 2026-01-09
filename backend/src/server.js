import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/prisma.js";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";

import authRouters from "./routes/authRoutes.js";
import userRouters from "./routes/userRoutes.js";
import postRouters from "./routes/postRoutes.js";
import commentRouters from "./routes/commentRoutes.js";
import uploadRouters from "./routes/uploadRoutes.js";
import tagRouters from "./routes/tagRoutes.js"
import reactionRouters from "./routes/reactionRoutes.js"

import { startCronJobs } from "./cron/index.js";


config();
connectDB();
startCronJobs();

const app = express();
const PORT = process.env.PORT || 5001;

// ============================================
// CORS Configuration (QUAN TRỌNG cho OAuth)
// ============================================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Cho phép gửi cookies
  })
);

app.use("/upload", uploadRouters);

// ============================================
// Body parsing middleware
// ============================================
app.use(express.json({
  limit: "10mb",
}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ============================================
// Serve static files (cho test page)
// ============================================
app.use(express.static("public"));

// ============================================
// Initialize Passport
// ============================================
app.use(passport.initialize());

// ============================================
// API Routes
// ============================================
app.use("/auth", authRouters);
app.use("/users", userRouters);
app.use("/post", postRouters);
app.use("/comments", commentRouters);
app.use("/tags", tagRouters);
app.use("/reactions", reactionRouters)

// ============================================
// Health check endpoint
// ============================================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.path,
  });
});

// ============================================
// Global Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ============================================
// Start Server
// ============================================
const server = app.listen(PORT, () => {
  console.log("\n🚀 ================================");
  console.log(`   Server running on port ${PORT}`);
  console.log("   ================================");
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Test OAuth: http://localhost:${PORT}/test-oauth.html`);
  console.log(`   Google OAuth: http://localhost:${PORT}/auth/google`);
  console.log(`   GitHub OAuth: http://localhost:${PORT}/auth/github`);
  console.log("   ================================\n");
});

// ============================================
// Error Handlers
// ============================================

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled promise rejection:", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  console.error("❌ Uncaught Exception:", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("\n⚠️  SIGTERM received, shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    console.log("✅ Server closed successfully");
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("\n⚠️  SIGINT received, shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    console.log("✅ Server closed successfully");
    process.exit(0);
  });
});

export default app;
