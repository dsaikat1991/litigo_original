# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Calendar view (`/calendar`) — a month grid showing every case's next hearing date, with month navigation and a nav bar link.
- Edit and delete for cases (`/cases/[id]/edit`), including a status change (active/adjourned/disposed) and a confirmed, cascading delete of the case's hearings and notes.
- Inline edit and delete for individual hearing entries and notes on the case detail page.
- Mobile-responsive case list (card layout below `md`, table at `md` and up) and stacked form fields on narrow screens.
- `README.md` with real setup instructions, project structure, and conventions.
- `docs/ENGINEERING_HANDOFF.md` covering architecture decisions and rationale.

### Fixed
- `cases.next_hearing_date` was left stale when the hearing that set it was deleted (the sync trigger only ran on insert/update). Migration `0002_hearing_delete_sync.sql` adds an `AFTER DELETE` trigger that recomputes it from the remaining hearings.

### Changed
- Restructured the codebase: introduced a typed `lib/data/` data-access layer so Supabase queries no longer live inline in pages/components, added a hand-written `types/database.ts` matching the Postgres schema, moved `lib/constants.ts` to be the single source of truth for enum-like values, and reorganized `components/` into `layout/` and `cases/`.
- Migrated `middleware.ts` to Next.js 16's `proxy.ts` convention.

## [0.1.0] — 2026-09-09

Initial MVP: the digital case diary.

### Added
- Supabase schema: `profiles`, `cases`, `hearings`, `notes` tables with row-level security scoping every row to the signed-in advocate.
- Auth: signup, login, and email-confirmation callback via Supabase Auth.
- Case dashboard listing all cases, sorted by next hearing date.
- Case detail page: case info, hearing history with the ability to log a new hearing (and fix its next date), and notes/learnings.
- Deployed to Vercel, connected to a Supabase project.
