import { auth } from "@/app/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedin = !!req.auth
  const { nextUrl } = req
  const { pathname } = nextUrl

  console.log(`[Proxy] Incoming request for ${pathname}`);

  // 1. Database Route Protection
  const isDatabaseRoute = pathname.startsWith("/database")
  if (isDatabaseRoute && !isLoggedin) {
    return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, nextUrl))
  }

  // 2. API Token Check Integration
  if (pathname.startsWith("/api/post")) {
    const authorization = req.headers.get("authorization")
    
    if (!isLoggedin && (!authorization || !authorization.startsWith("Bearer "))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
