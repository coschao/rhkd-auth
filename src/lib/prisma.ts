// //import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaClient } from "@/generated/prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient(); // || 야 ?? 이야

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
// import { createClient } from "@libsql/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma() {
//   const libsql = createClient({
//     url: process.env.DATABASE_URL!,
//   });
  console.log("DATABASE_URL: ", process.env.DATABASE_URL);
  //const adapter = new PrismaLibSql(libsql);
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}