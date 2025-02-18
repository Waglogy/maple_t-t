import { NextRequest, NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/home", "/packages", "/booking"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Get token from cookies
  const { pathname } = req.nextUrl;

  // If the route is protected and no token exists, redirect to login
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific routes
export const config = {
  matcher: ["/home", "/packages", "/booking"], // Apply only to these routes
};
