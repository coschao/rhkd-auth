import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // 예: /about/* 경로를 /home으로 리다이렉트
    if (request.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
}

// 특정 경로에만 적용
export const config = {
    matcher: '/about/:path*',
};