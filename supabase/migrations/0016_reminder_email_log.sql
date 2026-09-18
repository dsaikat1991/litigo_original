-- mylitigo: tracks which reminder emails have already gone out, so the cron
-- job (which may run more than once, or be retried) never double-sends the
-- same threshold for the same hearing/task to the same advocate.
create table reminder_email_log (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references profiles(id) on delete cascade,
  item_kind text not null check (item_kind in ('hearing', 'task')),
  item_id uuid not null,
  threshold_days int not null,
  sent_at timestamptz not null default now(),
  unique (advocate_id, item_kind, item_id, threshold_days)
);

-- Written only by the cron job via the service-role key, never by a logged-in
-- user's own client — RLS stays enabled with no policies, so PostgREST denies
-- all access under the anon/authenticated roles by default.
alter table reminder_email_log enable row level security;
