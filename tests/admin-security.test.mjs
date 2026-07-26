import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("admin routes use Neon Auth and IAMimpact authorization", async () => {
  const [proxy, auth, authorization] = await Promise.all([
    read("proxy.ts"),
    read("lib/auth/server.ts"),
    read("lib/auth/authorization.ts"),
  ]);
  assert.match(proxy, /auth\.middleware/);
  assert.match(auth, /createNeonAuth/);
  assert.match(authorization, /StaffAccount|staffAccount/);
  assert.match(authorization, /requireStaff/);
  assert.match(authorization, /ROLE_PERMISSIONS/);
});

test("admin package contains no public sign-up flow", async () => {
  const [login, client] = await Promise.all([
    read("features/admin/LoginForm.tsx"),
    read("lib/auth/client.ts"),
  ]);
  assert.doesNotMatch(login, /signUp/);
  assert.doesNotMatch(client, /allowAnonymous/);
});

test("admin login exposes a secure Neon Auth password-reset flow", async () => {
  const [login, forgot, reset, resetPage] = await Promise.all([
    read("features/admin/LoginForm.tsx"),
    read("features/admin/ForgotPasswordForm.tsx"),
    read("features/admin/ResetPasswordForm.tsx"),
    read("app/admin/reset-password/page.tsx"),
  ]);

  assert.match(login, /\/admin\/forgot-password/);
  assert.match(forgot, /authClient\.requestPasswordReset/);
  assert.match(forgot, /\/admin\/reset-password/);
  assert.match(forgot, /If that email belongs to an account/);
  assert.match(reset, /authClient\.resetPassword/);
  assert.match(resetPage, /searchParams/);
});

test("check-in is concurrency-safe and audited", async () => {
  const actions = await read("app/admin/(protected)/actions.ts");
  assert.match(actions, /updateMany/);
  assert.match(actions, /checkedInAt: null/);
  assert.match(actions, /REGISTRATION_CHECKED_IN/);
  assert.match(actions, /REGISTRATION_CHECK_IN_REVERSED/);
});

test("CSV output mitigates spreadsheet formula injection", async () => {
  const csv = await read("lib/admin/csv.ts");
  assert.match(csv, /FORMULA_PREFIX/);
  assert.match(csv, /\[=\+\\-@/);
});
