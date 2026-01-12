import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");
  const { pathname } = request.nextUrl;

  // if the user does not have a JWT and is not accessing /login, redirect to /login
  if (!jwt && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if the user has a JWT and tries to access /login, redirect to the home page
  if (jwt && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|pokeball.svg.png).*)",
  ],
};
