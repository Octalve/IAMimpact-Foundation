# IAMimpact Foundation Website

A component-based public website starter for IAMimpact Foundation, built with Next.js, TypeScript, Tailwind CSS, and Lucide icons.

## Start locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Production check

```bash
pnpm lint
pnpm build
```

## Main routes

- `/`
- `/who-we-are`
- `/what-we-do`
- `/programmes`
- `/our-impact`
- `/stories`
- `/insights`
- `/events`
- `/get-involved`
- `/contact`
- `/search`

## Editing the website

Each page is assembled from small, page-specific section components. The header and footer are shared globally. Text and calls to action remain inside their relevant section components so one section can be updated without affecting unrelated sections.

The website currently uses intentional image placeholders. See `public/images/README.md` for the recommended image subjects, sources to research, file naming guidance, and safeguarding notes. Add approved IAMimpact photographs to `public/images`, then replace the placeholder in the relevant section.

The contact, partnership, volunteer, donation, and booking-style actions are preview interfaces only. Connect them to a validated server-side service before accepting submissions or payments.

## Brand assets

IAMimpact Foundation logo files are stored in `public/brand`. Brand colours are defined as CSS variables in `app/globals.css`.
