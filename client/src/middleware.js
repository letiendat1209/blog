// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 🔥 CHỈ check có refresh token cookie "jid"
  const refreshToken = req.cookies.get("jid");

  if (!refreshToken) {
    // KHÔNG có session → redirect login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Có refresh token → CHO QUA
  // Client-side sẽ tự verify và auto refresh
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
