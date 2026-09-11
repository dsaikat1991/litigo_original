# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Case detail page: Tasks/Hearings/Notes are now a horizontal tab bar (shadcn `Tabs`) below the case info card instead of three stacked sections — each tab label shows a count. Case info stays pinned at the top.
- Adopted shadcn/ui (Radix UI primitives + Tailwind): the notification bell and user menu dropdowns are now built on shadcn's `DropdownMenu` (real keyboard navigation, focus management, Escape-to-close, all handled by Radix instead of hand-rolled click-outside logic), and every delete confirmation (case, hearing, note, task) now uses a shared `ConfirmDeleteDialog` (shadcn `AlertDialog`) instead of the native `window.confirm()` — which also means these are now actually testable via browser automation, unlike a native dialog.
- Profile picture upload via Supabase Storage (new `avatars` bucket, public read / owner-only write, `0006_avatars.sql`) and a nav bar user menu replacing the old plain "Profile"/"Sign out" text links: an avatar (uploaded photo, or an initial-letter fallback) with a "Hi, {first name}" greeting (hidden on mobile — avatar + chevron only there) that opens a dropdown with Profile, Settings, and Logout.
- `/settings` page with a change-password form (the other natural destination now that account menu has a Profile/Settings split — Profile holds practice details, Settings holds account-level things).
- Notification bell dropdown: clicking the bell opens the 5 most urgent upcoming reminders with a "View all" button to the new `/notifications` page (the full list). Extracted the reminder row markup into a shared `ReminderRow` component, now used by the bell dropdown, the dashboard panel, and `/notifications`.
- Notification bell in the nav bar (next to Profile), showing a live count of upcoming reminders (same 7-day window as the dashboard panel) from anywhere in the app, not just the dashboard.
- In-app "Upcoming" reminders on the dashboard: hearings and task due dates within the next 7 days (including anything overdue), merged and sorted by date, each tagged Overdue/Today/Tomorrow/In N days. Email/push reminders are planned as a later phase.
- Per-case tasks: a "Tasks" section on the case detail page for actionable to-dos (title, optional due date, done/not-done) — distinct from notes and hearings since a task has a completion state. Overdue tasks are flagged. New `tasks` table (`0005_tasks.sql`), included in search.
- Notes library (`/notes`), reachable from anywhere in the nav: a running feed of every note the advocate has written, standalone or case-linked, with a quick-add box at the top. Addresses notes/learnings from things like a hearing or a government-office visit that don't belong to any specific case and were previously impossible to add or browse (the `notes.case_id` column has been nullable since v0.1.0, but no UI ever created or listed a standalone note until now).
- Public landing page at `/` — hero, a stylized product preview, feature grid, "how it works" steps, and a closing CTA, with sign-in/sign-up in the header. Authenticated visitors are redirected straight to the dashboard; `/` is now public (updated `lib/supabase/middleware.ts`'s route allowlist, matched by exact path rather than prefix so it doesn't accidentally allow everything).
- Password reset flow: "Forgot password?" on login sends a reset email; `/reset-password` (guarded, requires the session established by the reset link) lets the advocate set a new password. `/auth/callback` now accepts a `next` param so it can redirect to a destination other than the dashboard.
- Profile page (`/profile`): view/edit full name, phone, bar enrollment number, practice city, and courts — the `profiles` table existed since v0.1.0 but had no UI until now.
- Placeholder Privacy Policy (`/privacy`) and Terms of Service (`/terms`) pages, linked from signup. Explicitly marked as drafts pending legal review — not yet suitable as a binding policy for real users' client data.
- Advanced search filters on `/search`: date range (matches a case's next hearing date, a hearing's date, or a note's creation date) and tag filtering (cases and notes), combinable with the keyword search. Backed by new indexes (`0004_advanced_search_indexes.sql`).
- Global search (`/search`, nav bar search box) across cases (title, client, opposing party, case/CNR number, court), hearings (purpose, order notes), and notes/learnings (content). Uses Postgres trigram indexes (`0003_search_indexes.sql`) so it stays fast and tolerates partial/typo'd terms as the number of cases grows.
- Calendar view (`/calendar`) — a month grid showing every case's next hearing date, with month navigation and a nav bar link.
- Edit and delete for cases (`/cases/[id]/edit`), including a status change (active/adjourned/disposed) and a confirmed, cascading delete of the case's hearings and notes.
- Inline edit and delete for individual hearing entries and notes on the case detail page.
- Mobile-responsive case list (card layout below `md`, table at `md` and up) and stacked form fields on narrow screens.
- `README.md` with real setup instructions, project structure, and conventions.
- `docs/ENGINEERING_HANDOFF.md` covering architecture decisions and rationale.

### Fixed
- shadcn's init step renamed the expected font CSS variable from `--font-geist-sans` to `--font-sans` in `globals.css`, but didn't update `layout.tsx`'s `next/font` config to match — would have silently broken the font again (same class of bug as the earlier Arial fallback issue) had it not been caught before committing.
- The nav bar's user menu (avatar/name) didn't update after editing the profile or uploading a photo without a full page reload — it's a client component that fetches its own data once on mount, so `router.refresh()` (which only re-renders server components) didn't reach it. Added a small `profile-events` pub/sub so `ProfileForm` and `AvatarUploader` can tell the user menu to refetch immediately after a successful save.
- Reverted the earlier "nudge the bell icon up 2px" fix — that was based on a hand-traced estimate of the SVG path that missed how far the dome's arc actually bulges. Measuring the real path with `getBBox()` shows the glyph is symmetric (2.0 units of margin on both top and bottom of its 24-unit box), and the previous nudge was actively making it worse. Confirmed via the rendered page too: the icon's on-screen bounding box now centers exactly on the same line as the avatar circle next to it (0px difference).
- Date-vs-"today" comparisons (task overdue check, the new dashboard reminders) used `Date.toISOString()`, which converts to UTC — for any timezone ahead of UTC (e.g. IST) during its early morning hours, this silently rolled "today" back a day, throwing off overdue/day-count calculations. Replaced with a local-calendar-date helper (`lib/dates.ts`).
- `cases.next_hearing_date` was left stale when the hearing that set it was deleted (the sync trigger only ran on insert/update). Migration `0002_hearing_delete_sync.sql` adds an `AFTER DELETE` trigger that recomputes it from the remaining hearings.
- The Geist font loaded via `next/font` was never actually applied — `globals.css` hardcoded `font-family: Arial` on `body`, overriding it. Also removed an incomplete `prefers-color-scheme: dark` block that didn't match the rest of the UI (all components use explicit light colors), which would have rendered a broken half-dark page.

### Changed
- Restructured the codebase: introduced a typed `lib/data/` data-access layer so Supabase queries no longer live inline in pages/components, added a hand-written `types/database.ts` matching the Postgres schema, moved `lib/constants.ts` to be the single source of truth for enum-like values, and reorganized `components/` into `layout/` and `cases/`.
- Migrated `middleware.ts` to Next.js 16's `proxy.ts` convention.
- UI polish: color-coded case status (active/adjourned/disposed) and note type (note/learning/update) badges for at-a-glance scanning, transition/focus-ring polish on inputs and primary buttons, a custom favicon (`app/icon.svg`), and per-page browser tab titles (e.g. a case's own title, "Calendar", "Edit case").

## [0.1.0] — 2026-09-09

Initial MVP: the digital case diary.

### Added
- Supabase schema: `profiles`, `cases`, `hearings`, `notes` tables with row-level security scoping every row to the signed-in advocate.
- Auth: signup, login, and email-confirmation callback via Supabase Auth.
- Case dashboard listing all cases, sorted by next hearing date.
- Case detail page: case info, hearing history with the ability to log a new hearing (and fix its next date), and notes/learnings.
- Deployed to Vercel, connected to a Supabase project.
