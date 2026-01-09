import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:5001/auth/google/callback";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "http://localhost:5001/auth/github/callback";
// ============================================
// GOOGLE STRATEGY
// ============================================
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          const avatarUrl = profile.photos?.[0]?.value;

          if (!email) {
            return done(new Error("Email not provided by Google"), null);
          }

          const oauthProfile = {
            provider: "google",
            providerId: profile.id,
            email,
            name,
            avatarUrl,
            accessToken,
            refreshToken,
            expiresAt: refreshToken
              ? new Date(Date.now() + 60 * 60 * 1000)
              : null, // 1 hour (estimate)
          };

          return done(null, oauthProfile);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
} else {
  console.warn("⚠️  Google OAuth not configured");
}

// ============================================
// GITHUB STRATEGY
// ============================================
if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // GitHub có thể trả về nhiều emails, lấy primary
          const primaryEmail =
            profile.emails?.find((e) => e.primary)?.value ||
            profile.emails?.[0]?.value;
          const name = profile.displayName || profile.username;
          const avatarUrl = profile.photos?.[0]?.value;

          if (!primaryEmail) {
            return done(new Error("Email not provided by GitHub"), null);
          }

          const oauthProfile = {
            provider: "github",
            providerId: profile.id,
            email: primaryEmail,
            name,
            avatarUrl,
            accessToken,
            refreshToken: refreshToken || null,
            expiresAt: null, // GitHub tokens không expire
          };

          return done(null, oauthProfile);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
} else {
  console.warn("⚠️  GitHub OAuth not configured");
}

// Passport serialization (không dùng session nhưng cần có)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
