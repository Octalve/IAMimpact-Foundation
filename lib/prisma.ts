import "server-only";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma() {
  if (!env.DATABASE_URL) return null;
  const client = globalForPrisma.prisma ?? new PrismaClient();
  if (env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
