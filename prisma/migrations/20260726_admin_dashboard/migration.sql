-- Add attendance state without changing existing registration records.
CREATE TYPE "RegistrationStatus" AS ENUM ('CONFIRMED', 'CANCELLED');
CREATE TYPE "StaffRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'CHECK_IN_STAFF', 'VIEWER');

ALTER TABLE "EventRegistration"
ADD COLUMN "status" "RegistrationStatus" NOT NULL DEFAULT 'CONFIRMED',
ADD COLUMN "checkedInAt" TIMESTAMP(3),
ADD COLUMN "checkedInBy" TEXT;

CREATE INDEX "EventRegistration_status_idx" ON "EventRegistration"("status");
CREATE INDEX "EventRegistration_checkedInAt_idx" ON "EventRegistration"("checkedInAt");

CREATE TABLE "StaffAccount" (
  "id" TEXT NOT NULL,
  "authUserId" TEXT,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "role" "StaffRole" NOT NULL DEFAULT 'VIEWER',
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StaffAccount_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StaffAccount_authUserId_key" ON "StaffAccount"("authUserId");
CREATE UNIQUE INDEX "StaffAccount_email_key" ON "StaffAccount"("email");
CREATE INDEX "StaffAccount_role_idx" ON "StaffAccount"("role");
CREATE INDEX "StaffAccount_active_idx" ON "StaffAccount"("active");

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "actorUserId" TEXT NOT NULL,
  "actorEmail" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "targetId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AuditLog_actorUserId_idx" ON "AuditLog"("actorUserId");
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
