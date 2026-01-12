import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");
  const { pathname } = request.nextUrl;

  // 1. Si el usuario NO tiene el JWT y NO está en /login, mándalo a /login
  if (!jwt && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Si el usuario TIENE el JWT e intenta entrar a /login, mándalo al home
  if (jwt && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configura en qué rutas debe ejecutarse el middleware
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
