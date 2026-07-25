import "server-only";
import { env } from "@/lib/env";
import { getPrisma } from "@/lib/prisma";

export async function verifyHuman(token: string | null, ip: string) {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return env.NODE_ENV === "production"
      ? { ok: false, reason: "Human verification is temporarily unavailable." }
      : { ok: true };
  }
  if (!token) return { ok: false, reason: "Please complete the human verification." };

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, reason: "Human verification failed." };
    const result = (await response.json()) as { success?: boolean };
    return result.success
      ? { ok: true }
      : { ok: false, reason: "Human verification failed." };
  } catch {
    return { ok: false, reason: "Human verification is temporarily unavailable." };
  }
}

export async function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60_000) {
  const prisma = getPrisma();
  if (!prisma) return env.NODE_ENV !== "production";

  const now = new Date();
  const resetBefore = new Date(now.getTime() - windowMs);
  const rows = (await prisma.$queryRaw`
    INSERT INTO "RateLimit" ("key", "count", "windowStartedAt")
    VALUES (${key}, 1, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimit"."windowStartedAt" < ${resetBefore} THEN 1
        ELSE "RateLimit"."count" + 1
      END,
      "windowStartedAt" = CASE
        WHEN "RateLimit"."windowStartedAt" < ${resetBefore} THEN ${now}
        ELSE "RateLimit"."windowStartedAt"
      END
    RETURNING "count"
  `) as Array<{ count: number }>;
  return (rows[0]?.count ?? limit + 1) <= limit;
}
