// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
import { NextRequest, NextResponse } from "next/server";

// export function proxy(request: NextRequest) {
//     // 예: /about/* 경로를 /home으로 리다이렉트
//     if (request.nextUrl.pathname.startsWith('/about')) {
//         return NextResponse.redirect(new URL('/home', request.url));
//     }
//     return NextResponse.next();
// }

// // 특정 경로에만 적용
// export const config = {
//     matcher: '/api/post/:path*',
// };

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']


export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(`[Proxy] Incoming request for ${pathname}`);

    // 인증 불필요한 경로 제외
    const publicPaths = ["/login", "/register", "/api/auth"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Authorization 헤더에서 Bearer 토큰 추출
    const authorization = request.headers.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const token = authorization.split(" ")[1];

    // 토큰 검증 (proxy는 Edge/Node 경계에서 실행되므로 jwt.verify 대신 간단 검증)
    if (!isValidToken(token)) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }

    // 검증된 토큰 정보를 헤더로 전달
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-token", token);

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
}

function isValidToken(token: string): boolean {
  // JWT 구조 확인 (header.payload.signature)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // payload 디코딩 후 만료시간 확인
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        console.log("Token expired");
        return false; // 만료된 토큰
    }
    return true;
  }
  catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}

// Routes Proxy should not run on
export const config = {
    //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    //matcher: [ "/((?!_next/static|_next/image|favicon.ico).*)" ] // 정적 파일 제외하고 나머지 전부
    matcher: [
        "/api/post/:path*", // 보호된 페이지/라우트
    ]
}