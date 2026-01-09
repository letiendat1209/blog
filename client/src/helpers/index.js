import { NextResponse } from "next/server";

export function redirectToLogin(req) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export function redirectForbidden(req) {
  return NextResponse.redirect(new URL("/403", req.url));
}

export function extractImageIds(html) {
  if (!html) return [];

  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll("img[data-id]")).map((img) =>
    img.getAttribute("data-id")
  );
}
