import "server-only";
import { createNeonAuth } from "@neondatabase/auth/next/server";

function required(name: "NEON_AUTH_BASE_URL" | "NEON_AUTH_COOKIE_SECRET") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Server configuration is invalid. Check: ${name}`);
  return value;
}

export const auth = createNeonAuth({
  baseUrl: required("NEON_AUTH_BASE_URL"),
  cookies: {
    secret: required("NEON_AUTH_COOKIE_SECRET"),
    sessionDataTtl: 300,
  },
  logLevel: process.env.NODE_ENV === "production" ? "error" : "warn",
});
