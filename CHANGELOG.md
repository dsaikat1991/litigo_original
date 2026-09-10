# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- Restructured the codebase: introduced a typed `lib/data/` data-access layer so Supabase queries no longer live inline in pages/components, added a hand-written `types/database.ts` matching the Postgres schema, moved `lib/constants.ts` to be the single source of truth for enum-like values, and reorganized `components/` into `layout/` and `cases/`.
- Migrated `middleware.ts` to Next.js 16's `proxy.ts` convention.

### Added
- `README.md` with real setup instructions, project structure, and conventions.
- `docs/ENGINEERING_HANDOFF.md` covering architecture decisions and rationale.

## [0.1.0] — 2026-09-09

Initial MVP: the digital case diary.

### Added
- Supabase schema: `profiles`, `cases`, `hearings`, `notes` tables with row-level security scoping every row to the signed-in advocate.
- Auth: signup, login, and email-confirmation callback via Supabase Auth.
- Case dashboard listing all cases, sorted by next hearing date.
- Case detail page: case info, hearing history with the ability to log a new hearing (and fix its next date), and notes/learnings.
- Deployed to Vercel, connected to a Supabase project.
