import "server-only";
import { getPrisma } from "@/lib/prisma";

export function adminDb() {
  const prisma = getPrisma();
  if (!prisma) throw new Error("Database configuration is unavailable.");
  return prisma;
}
