# IAMimpact integrations

The website is fully wired to internal API routes. Production activation requires database and provider credentials.

## Edit points

- Admin notification recipient: `ADMIN_NOTIFICATION_EMAIL`
- Public and safeguarding addresses shown on the site: `content/site.ts`
- Email provider adapter: `lib/email.ts`
- Events: `content/events.ts`
- Insight categories and starter content: `content/insights.ts`
- Form fields: `app/get-involved/page.tsx` and `app/contact/page.tsx`

## API examples

### General submission

```http
POST /api/submissions
Content-Type: application/json

{
  "kind": "Volunteer",
  "fullName": "Amina Bello",
  "email": "amina@example.org",
  "phone": "+234...",
  "skills": "Facilitation and data analysis",
  "motivation": "I want to support young people.",
  "consent": "yes",
  "turnstileToken": "<browser-generated-token>",
  "website": ""
}
```

### Event registration

```http
POST /api/events/register
Content-Type: application/json

{
  "eventSlug": "future-ready-schools-abuja-2026",
  "fullName": "Amina Bello",
  "email": "amina@example.org",
  "organisation": "Example School",
  "consent": "yes",
  "turnstileToken": "<browser-generated-token>",
  "website": ""
}
```

Successful registration returns a unique code:

```json
{ "registrationCode": "IAM-12AB-34CD-56EF" }
```

## Anti-abuse controls

Every public form has:

1. a hidden honeypot field;
2. strict server-side field length and email validation;
3. IP-based rate limiting;
4. parameterised database queries;
5. optional Cloudflare Turnstile verification;
6. consent capture and data minimisation;
7. generic public errors that do not expose server details.

Turnstile appears automatically when both keys are configured.

## Email providers

`lib/email.ts` currently implements Resend through its HTTP API. The rest of the application calls one `sendMail()` interface, so Postmark, Mailgun, Amazon SES or another provider can be added without changing forms or routes.

Both flows send:

- a confirmation to the applicant or registrant;
- an administrator notification to `ADMIN_NOTIFICATION_EMAIL`;
- `reply-to` set to the submitter for convenient follow-up.

## Vercel + Neon/Postgres + Prisma option

For the GitHub/Vercel version, retain the UI and route contracts and replace the D1 calls with a repository backed by Prisma:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

Use a pooled Neon `DATABASE_URL` at runtime and a direct connection for migrations when required by your Neon plan. Keep `prisma` in development dependencies and `@prisma/client` in production dependencies, run `prisma generate` during installation/build, and instantiate one cached client in development to avoid connection exhaustion. The API request/response formats do not need to change.

