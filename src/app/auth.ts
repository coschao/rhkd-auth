import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Passkey from "next-auth/providers/passkey"
import redisDriver from "unstorage/drivers/redis";
import { createStorage } from "unstorage";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import { getUserByEmail } from '@/lib/dal/user';
import * as bcrypt from 'bcrypt';

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
                console.log('[CP#authorize] credentials:', credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.log('[CP#authorize] Missing email or password');
                    return null;
                }

                try {
                    const user = await getUserByEmail(credentials.email as string);

                    console.log('[CP#authorize] user found in DB:', user ? 'Yes' : 'No');

                    if (!user || !user.password) {
                        console.log('[CP#authorize] User not found or no password');
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    console.log('[CP#authorize] password valid:', isPasswordValid);

                    if (isPasswordValid) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { password, ...userWithoutPass } = user;
                        // Prisma id is Int, so convert to string for NextAuth compatibility
                        return {
                            ...userWithoutPass,
                            id: userWithoutPass.id.toString(),
                        };
                    }

                    return null;
                }
                catch (error) {
                    console.error('[CP#authorize] error during authorize:', error);
                    return null;
                }
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
