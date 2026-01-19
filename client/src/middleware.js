// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 🔍 DEBUG: Log tất cả cookies
  const allCookies = req.cookies.getAll();
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Path:", pathname);
  console.log("All cookies:", allCookies);
  console.log("Cookie count:", allCookies.length);

  const refreshToken = req.cookies.get("jid");
  console.log("jid cookie:", refreshToken);
  console.log("jid value:", refreshToken?.value);
  console.log("========================");

  if (!refreshToken) {
    console.log("❌ NO JID - Redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("✅ JID FOUND - Allowing access");
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
