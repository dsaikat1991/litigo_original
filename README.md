# Litigo

A digital case diary for solo advocates practicing in Indian courts — case records, hearing history, next dates, and quick notes/learnings, replacing the physical diary + WhatsApp + Excel workflow most solo practitioners currently rely on.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Supabase](https://supabase.com) (Postgres, Auth, Row-Level Security)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)

## Project status

Early MVP. Scope is deliberately limited to the "digital diary": cases, hearings, next dates, notes/learnings. No billing, client portal, or multi-user/firm features yet — see [docs/ENGINEERING_HANDOFF.md](docs/ENGINEERING_HANDOFF.md) for the reasoning and roadmap.

## Getting started

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run every file in [`supabase/migrations/`](supabase/migrations) in order.
3. Under **Settings → API**, copy the **Project URL** and **anon public key**.
4. Under **Authentication → URL Configuration**, set the **Site URL** and add a redirect URL for `<your-url>/auth/callback` (both your local `http://localhost:3000` and your deployed domain).

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from step 1.

### 3. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                  Routes only (Next.js App Router) — pages, layouts, route handlers
components/
  layout/             Chrome shared across authenticated pages (nav bar, etc.)
  cases/              Feature components for the case-detail screen
lib/
  supabase/           Supabase client constructors (browser, server, proxy/session refresh)
  data/               Data-access layer — every Supabase table query lives here, not in components
  constants.ts         Single source of truth for enum-like values (case types, statuses, note types)
types/
  database.ts         Hand-written type mirroring the Postgres schema (see note in the file re: supabase gen types)
supabase/
  migrations/         SQL migrations, applied manually via the Supabase SQL Editor for now
docs/
  ENGINEERING_HANDOFF.md   Architecture decisions, rationale, and open questions for whoever picks this up next
CHANGELOG.md          Notable changes, in Keep a Changelog format
```

**Convention:** pages and client components never call `supabase.from(...)` directly — they call a function from `lib/data/`. This keeps every query in one place, makes them independently testable, and means a schema change only touches one file per table.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint the codebase |
