# Engineering handoff

Context for anyone (including future-you) picking this codebase up cold.

## Product context

**What this is:** a digital case diary for solo advocates in India. The workflow it replaces is a physical diary (or Excel/WhatsApp) tracking: which cases you have, what happened at the last hearing, when the next date is, and notes/learnings you want to remember later.

**Who it's for, in order:** solo litigators first, then small chambers, then firms. Each stage unlocks different features (see Roadmap below) — do not build for a later stage before the current one is validated.

**What v1 deliberately excludes:** billing, client portals, multi-user/team accounts, document storage, SMS/WhatsApp reminders, cause-list integration. These are plausible future features, not oversights — see Roadmap.

## Architecture decisions

### Why Next.js + Supabase

Supabase gives Postgres, auth, and row-level security without standing up a backend — appropriate for a solo-founder-speed MVP. Next.js App Router pairs with it well via `@supabase/ssr` for cookie-based session handling across Server Components, Client Components, and middleware.

### Why a data-access layer (`lib/data/`)

Every Supabase table query lives in `lib/data/{cases,hearings,notes}.ts` as a plain function taking a typed Supabase client. Pages and components never call `.from(...)` directly. Reasons:

- A schema or query change touches one file, not every screen that happens to read that table.
- The functions are trivially unit-testable in isolation (not yet done — no test suite exists yet, see Known gaps).
- It makes the client/server split explicit: Server Components pass the server client (`lib/supabase/server.ts`), Client Components pass the browser client (`lib/supabase/client.ts`), but both call the same `lib/data/` function.

### Why row-level security instead of app-level authorization

Every table (`profiles`, `cases`, `hearings`, `notes`) has RLS policies scoping rows to `advocate_id = auth.uid()` (see `supabase/migrations/0001_init.sql`). This means even if application code has a bug and forgets to filter by user, Postgres itself refuses to return or write another advocate's data. For a legal product handling client-sensitive case data, this is a deliberate defense-in-depth choice, not a default we happened to keep.

### Why `types/database.ts` is hand-written

Supabase's CLI can generate this file automatically (`supabase gen types typescript`), but that requires linking the CLI to the hosted project, which hasn't been done yet in this session. The current file is hand-written to match that exact generated shape (see the comment at the top of the file — the `Relationships`/`Views`/`Functions`/`__InternalSupabase` fields are not decorative; the installed `@supabase/postgrest-js` version infers query result types from this exact structure, and silently degrades to `never` if it's missing). **When the CLI is linked, regenerate this file and delete the hand-written version** — don't let them drift out of sync in the meantime; any schema migration must update both.

### Why `next_hearing_date` is denormalized onto `cases`

`cases.next_hearing_date` is a copy of the most recent `hearings.next_date`, kept in sync by a Postgres trigger (`sync_case_next_hearing_date` in the migration). This lets the dashboard sort/filter the case list by next date without a join or subquery per row. The tradeoff: the source of truth is really the latest `hearings` row, and the trigger is the only thing keeping `cases.next_hearing_date` correct — if you ever bulk-edit `hearings` outside the app (direct SQL), re-verify this field.

## Data model

Four tables, all RLS-scoped to the signed-in advocate:

- **`profiles`** — one row per advocate, extends `auth.users` (auto-created via the `handle_new_user` trigger on signup).
- **`cases`** — the case file. `cnr_number` is optional (not every matter has one — see rationale in project memory / prior discussion: old cases, non-court matters, or same-day filings before CNR generation).
- **`hearings`** — one row per date the case actually came up. `next_date` here is what drives `cases.next_hearing_date` via trigger.
- **`notes`** — freeform, `type` enum (`note` / `learning` / `update`) covers what were originally going to be separate concepts. `case_id` is nullable so a note can stand alone, not tied to any case.

## Deployment

- **Hosting:** Vercel, connected to the `dsaikat1991/litigo_original` GitHub repo, `main` branch.
- **Database/Auth:** Supabase project `mylitigo`.
- **Required env vars** (both Vercel and local `.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Auth redirect gotcha:** Supabase's email confirmation link is built from the **Site URL** set in Authentication → URL Configuration. If that's still `localhost:3000` after deploying, confirmation emails sent from production will send users to a dead `localhost` link. Keep this updated whenever the deployed domain changes, and add every domain (local + preview + production) to the redirect allow-list.
- **Migrations are applied manually** — there is no CI/CD step that runs `supabase/migrations/*.sql` automatically. Whoever changes the schema must run the new migration file in the Supabase SQL Editor themselves, and add the file with an incrementing number (`0002_...`, etc.).

## Known gaps / deliberately deferred

- No automated tests (unit or e2e). Given the current size (a handful of screens), manual testing has been the process; revisit once the surface area grows.
- No CI pipeline — builds/lint run locally before pushing.
- No Supabase CLI link — schema changes are authored as SQL files and applied by hand; types are hand-maintained (see above).
- No error boundaries / global error UI beyond inline form errors.
- No pagination on the case list or hearings/notes lists — fine at current expected scale (a solo advocate's caseload), revisit if that assumption breaks.

## Roadmap (not yet built, in rough order)

1. Calendar view of upcoming hearing dates across all cases.
2. Search/filter on the case list (by tag, status, court).
3. Client-facing read-only view (chambers/firm stage).
4. Multi-user support — chambers sharing a case (firm stage; requires rethinking RLS from single-owner to team-membership).
5. Reminders (SMS/WhatsApp/email) ahead of next hearing dates.
6. Indian cause-list integration (auto-pull hearing dates from e-courts where available).

Do not start on 3–6 without an explicit product decision to move past the solo-litigator stage — see product context above.
