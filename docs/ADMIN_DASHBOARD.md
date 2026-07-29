# IAMimpact secure administration

## What is included

- Neon Auth email/password sign-in with server-validated sessions
- Invite-only IAMimpact staff authorization
- Super administrator, administrator, check-in staff and viewer roles
- Dashboard totals and event breakdowns
- Registration search, event/attendance filters and pagination
- Restricted display of phone and accessibility information
- Concurrency-safe participant check-in and controlled reversal
- Formula-safe CSV export (maximum 10,000 filtered rows)
- Staff authorization/deactivation and immutable accountability logs

Neon Auth proves identity. The `StaffAccount` table grants IAMimpact access.
Possessing a valid Neon Auth account alone never grants dashboard access.

## Vercel environment variables

Add these under Project → Settings → Environment Variables for Production and
Preview:

- `DATABASE_URL`: existing pooled Neon connection
- `DIRECT_URL`: existing direct Neon connection
- `NEON_AUTH_BASE_URL`: the value supplied by Neon Auth
- `NEON_AUTH_COOKIE_SECRET`: a new random value of at least 32 characters
- `ADMIN_BOOTSTRAP_EMAIL`: the exact email of the first super administrator

Do not use a `NEXT_PUBLIC_` prefix for any of these values. If Vercel created a
prefixed variable such as `iamimpactfoundation_NEON_AUTH_BASE_URL`, copy its
value into the exact `NEON_AUTH_BASE_URL` name expected by the application.
Never paste secret values into source files.

Generate the cookie secret locally without displaying it publicly:

```powershell
$bytes = New-Object byte[] 48
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

## First administrator

1. Enable Neon Auth for the production branch in Neon.
2. Create the first user in Neon Auth with the same email configured in
   `ADMIN_BOOTSTRAP_EMAIL`.
3. Deploy the application.
4. Visit `/admin/login` and sign in.
5. The matching account is safely linked as `SUPER_ADMIN` on first sign-in.

There is no public staff sign-up route.
The bootstrap setting only creates the initial record. It cannot overwrite an
existing identity link, reactivate a deactivated account, or promote a managed
staff record. After another super administrator has been added and verified,
remove `ADMIN_BOOTSTRAP_EMAIL` from the deployment environment.

## Password reset

Administrators can use **Forgot password?** on `/admin/login`. Neon Auth sends
a time-limited link to `/admin/reset-password`; the application never receives
or stores the old password. Add both the production origin and any preview
origin used for testing to Neon Auth's trusted domains so reset redirects are
accepted.

## Adding another staff member

1. A super administrator creates the user in Neon Auth.
2. In `/admin/staff`, authorize the exact same email and select the least
   privileged role required.
3. The staff member signs in at `/admin/login`.
4. On first sign-in, their immutable Neon user ID is linked to the authorized
   staff record.

## Roles

| Role | Capabilities |
| --- | --- |
| Super administrator | All operations and staff access management |
| Administrator | Registrations, sensitive details, check-in/reversal, export and audit |
| Check-in staff | Registration lookup and check-in only |
| Viewer | Read-only registration list and dashboard; sensitive details are restricted |

## Deployment

The existing `vercel-build` command runs:

```text
prisma generate → prisma migrate deploy → next build
```

The migration extends `EventRegistration` and creates `StaffAccount` and
`AuditLog`. Existing registrations and passes are retained.

Before pushing, run:

```powershell
pnpm lint
pnpm typecheck
pnpm test
```

Let Vercel run the database-backed production build, since production secrets
remain in Vercel.

## Operational safeguards

- Keep at least two active super administrators after initial setup.
- Review `/admin/audit` regularly.
- Deactivate access immediately when a staff member leaves.
- Export participant data only when operationally necessary; store exports
  securely and delete them according to IAMimpact’s retention policy.
- Never edit authentication tables or migrations directly in Neon’s table
  editor.
