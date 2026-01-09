import express from "express";
import passport from "../config/passport.js";
import {
  handleOAuthCallback,
  logout,
  getCurrentUser,
  devLogin,
} from "../controllers/oauthController.js";
import {
  refresh,
  getSessions,
  revokeSession,
  revokeAllSessions,
} from "../controllers/sessionController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// GOOGLE OAUTH
// ============================================
router.get("/google",passport.authenticate("google", {session: false,scope: ["profile", "email"],}));

router.get("/google/callback", passport.authenticate("google", {
  session: false,
  failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:3000"
    }/login?error=google_failed`,
  }),
  handleOAuthCallback
);

// ============================================
// GITHUB OAUTH
// ============================================
router.get("/github",passport.authenticate("github", {session: false,scope: ["user:email"],}));

router.get("/github/callback",passport.authenticate("github", {
    session: false,
    failureRedirect: `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/login?error=github_failed`,
  }),
  handleOAuthCallback
);

// ============================================
// PUBLIC ROUTES
// ============================================
router.post("/logout", logout);
router.post("/refresh", refresh);
// ============================================
// PROTECTED ROUTES
// ============================================
router.get("/me", authMiddleware, getCurrentUser);
router.get("/sessions", authMiddleware, getSessions);
router.post("/sessions/:sessionId/revoke", authMiddleware, revokeSession);
router.post("/sessions/revoke-all", authMiddleware, revokeAllSessions);

//DEV LOGIN
router.post("/dev-login", devLogin);

export default router;
