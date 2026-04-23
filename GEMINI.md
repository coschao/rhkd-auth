# Project: rhkd-auth

Next.js 15 기반의 인증 시스템 구현체로, NextAuth.js v5, Prisma, SQLite, 그리고 Redis를 통합한 프로젝트입니다.

## 🚀 Project Overview

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Authentication**: [NextAuth.js v5 (Beta)](https://authjs.dev/)
  - **Providers**: Credentials (Email/Password), Passkey (WebAuthn)
  - **Session Strategy**: JWT & UnstorageAdapter (Redis)
- **Database**: [Prisma](https://www.prisma.io/) with [LibSQL (SQLite)](https://turso.tech/libsql)
- **State/Cache**: [Redis](https://redis.io/) (via `ioredis` & `unstorage`)
- **Styling**: Tailwind CSS 4

## 🛠 Building and Running

### Prerequisites
- Node.js (Latest LTS recommended)
- Redis Server (Running on `localhost:6379` or configured via `.env`)

### Key Commands
- **Development**: `npm run dev` - Start the development server.
- **Build**: `npm run build` - Build the application for production.
- **Start**: `npm run start` - Run the built production server.
- **Lint**: `npm run lint` - Run ESLint for code quality checks.
- **Database Migration**: `npx prisma migrate dev` - Apply database migrations.
- **Prisma Studio**: `npx prisma studio` - Visual editor for the database.

## 📂 Key Directory Structure

- `src/app/`: Next.js App Router pages and API routes.
  - `auth.ts`: Centralized NextAuth configuration.
  - `api/auth/[...nextauth]/route.ts`: NextAuth API handlers.
  - `api/user/login/`: Custom login logic for Credentials provider.
- `src/lib/`: Utility functions and shared instances.
  - `prisma.ts`: Prisma Client singleton with LibSQL adapter.
  - `redis.ts`: IORedis singleton instance.
- `prisma/`: Database schema and migrations.
- `src/components/`: Reusable React components (Providers, SignInButton, etc.).

## 📜 Development Conventions

- **Type Safety**: TypeScript is used throughout the project. Always define types for API responses and component props.
- **Authentication**: Use the `auth()` function from `@/app/auth` for server-side session checks and `useSession()` for client-side.
- **Database Access**: Always use the singleton `prisma` instance from `@/lib/prisma`.
- **Environment Variables**:
  - `DATABASE_URL`: Path to the SQLite file (e.g., `file:./dev.db`).
  - `REDIS_URL`: Connection string for Redis.
  - `AUTH_SECRET`: Secret key for NextAuth.
  - `NEXTAUTH_URL`: Base URL of the application.

## 📝 TODO / Future Improvements
- [ ] Complete the logic in `src/app/auth.ts` `authorize` callback.
- [ ] Refine Passkey registration and login flow.
- [ ] Implement user registration (Sign up) page.
- [ ] Add unit and integration tests for auth flows.
