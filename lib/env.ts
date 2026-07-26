import "server-only";
import { z } from "zod";

const databaseUrlSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) =>
      value.startsWith("postgresql://") ||
      value.startsWith("postgres://"),
    "Must be a PostgreSQL connection URL.",
  );

const serverEnvSchema = z.object({
  DATABASE_URL: databaseUrlSchema.optional(),
  RESEND_API_KEY: z.string().trim().min(1).optional(),
  MAIL_FROM: z.string().trim().min(1).optional(),
  ADMIN_NOTIFICATION_EMAIL: z.string().trim().email().optional(),
  TURNSTILE_SECRET_KEY: z.string().trim().min(1).optional(),
  NEON_AUTH_BASE_URL: z.string().trim().url().optional(),
  NEON_AUTH_COOKIE_SECRET: z.string().trim().min(32).optional(),
  ADMIN_BOOTSTRAP_EMAIL: z.string().trim().email().optional(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
  const invalidFields = result.error.issues
    .map((issue) => issue.path.join(".") || "environment")
    .filter((field, index, fields) => fields.indexOf(field) === index)
    .join(", ");

  throw new Error(
    `Server configuration is invalid. Check: ${invalidFields}`,
  );
}

export const env = result.data;
