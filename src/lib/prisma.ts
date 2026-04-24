import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

console.log(`[prisma] NODE_ENV : "${process.env.NODE_ENV}"`);

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrisma() {
    console.log(`[prisma#createPrisma] DATABASE_URL : "${process.env.DATABASE_URL}"`);
    const adapter = new PrismaLibSql({
        url: process.env.DATABASE_URL!,
    });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
