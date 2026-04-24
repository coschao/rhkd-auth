import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Passkey from "next-auth/providers/passkey"
import redisDriver from "unstorage/drivers/redis";
import { createStorage } from "unstorage";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import { customAuthorize } from '@/lib/actions/server-auth';

const storage = createStorage({
    driver: redisDriver({
        url: process.env.REDIS_URL, // || 'redis://localhost:6379',
    }),
});

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    adapter: UnstorageAdapter(storage),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: '이메일아이디', type: 'text', placeholder: 'userid@example.com' },
                password: { label: '비밀번호', type: 'password' },
            },
            async authorize(credentials) {
                return await customAuthorize(credentials as Record<string, unknown>);
            },
        }),
        Passkey({
            formFields: {
                email: {
                    label: "이메일",
                    required: true,
                    autocomplete: "email webauthn",
                },
            },
        }),
    ],

    callbacks: {
        // [2] JWT 토큰에 사용자 정보 저장
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.id = user.id;
                token.accessToken = user.accessToken; // JWT 토큰도 세션에 포함
                // token.rolerole; // 추가적인 필드 저장
            }
            return token;
        },
        // [3] 클라이언트 세션에 토큰 정보 전달
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.id = token.id;
                session.user.accessToken = token.accessToken; // JWT 토큰도 세션에 포함
            }
            return session;
        },
    },
    session: {
        strategy: "jwt", // JWT 기반 세션 사용
    },

    pages: {
        signIn: '/login',
    },

    experimental: { //Passkey는 아직 실험적 기능
        enableWebAuthn: true,
    },
}) //end of NextAuth
