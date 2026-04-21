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
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: '이메일아이디', type: 'text', placeholder: 'jsmith' },
                password: { label: '비밀번호', type: 'password' },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log('[CP#authorize] credentials:', credentials);
                console.log('[CP#authorize] request:', req);
                const user = { id: '1', name: 'J Smith', email: 'username@example.com' }

                if (user) {
                    debugger;
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                }
                else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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

    experimental: { //Passkey는 아직 실험적 기능
        enableWebAuthn: true,
    },
})
