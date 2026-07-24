import { getRuntimeEnv } from "./runtime-env";

export async function verifyHuman(token: string | null, ip: string) {
  const env = await getRuntimeEnv();
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, mode: "development" as const };
  if (!token) return { ok: false, reason: "Please complete the human verification." };

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success ? { ok: true, mode: "turnstile" as const } : { ok: false, reason: "Human verification failed." };
}

export async function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60_000) {
  const env = await getRuntimeEnv();
  if (!env.DB) return true;
  const now = Date.now();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, window_started_at INTEGER NOT NULL)"
  ).run();
  const current = await env.DB.prepare("SELECT count, window_started_at FROM rate_limits WHERE key = ?")
    .bind(key)
    .first<{ count: number; window_started_at: number }>();
  if (!current || now - current.window_started_at > windowMs) {
    await env.DB.prepare("INSERT OR REPLACE INTO rate_limits (key, count, window_started_at) VALUES (?, 1, ?)")
      .bind(key, now)
      .run();
    return true;
  }
  if (current.count >= limit) return false;
  await env.DB.prepare("UPDATE rate_limits SET count = count + 1 WHERE key = ?").bind(key).run();
  return true;
}
