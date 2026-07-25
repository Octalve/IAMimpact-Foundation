import { z } from "zod";

export const registrationQuerySchema = z.object({
  q: z.string().trim().max(120).catch(""),
  event: z.string().trim().max(120).catch(""),
  attendance: z.enum(["all", "checked-in", "pending"]).catch("all"),
  page: z.coerce.number().int().min(1).max(100_000).catch(1),
});

export const registrationCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .min(4)
  .max(80)
  .regex(/^[A-Z0-9-]+$/);

export const staffInputSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  name: z.string().trim().max(120).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "CHECK_IN_STAFF", "VIEWER"]),
});
