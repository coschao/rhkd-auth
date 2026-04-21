import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Passkey from "next-auth/providers/passkey"
import redisDriver from "unstorage/drivers/redis";
import { createStorage } from "unstorage";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

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
                username: { label: '이메일아이디', type: 'text', placeholder: 'username@example.com' },
                password: { label: '비밀번호', type: 'password' },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log('[CP#authorize] credentials:', credentials);
                console.log('[CP#authorize] request:', req);
                // const user = { id: '1', name: 'J Smith', email: 'username@example.com' }
                // if (user) {
                //     debugger;
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                // }
                // else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null
                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({
                    //     username: credentials?.username,
                    //     password: credentials?.password,
                    // }),
                    body: JSON.stringify(credentials),
                })
                const user = await res.json()
                console.log('[CP#authorize] user:', user);

                if (user) {
                    return user
                }
                else {
                    return null
                }
            },
        }),
        Passkey({
            formFields: {
                email: {
                    label: "이메일",
                    required: true,
                    autocomplete: "username webauthn",
                },
            },
        }),
    ],

    callbacks: {
        // [2] JWT 토큰에 사용자 정보 저장
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.id = user.id;
                // token.rolerole; // 추가적인 필드 저장
            }
            return token;
        },
        // [3] 클라이언트 세션에 토큰 정보 전달
        async session({ session, token }) {
            if (token) {
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.id = token.id;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt", // JWT 기반 세션 사용
    },

    experimental: { //Passkey는 아직 실험적 기능
        enableWebAuthn: true,
    },
})
