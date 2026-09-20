-- mylitigo: limitation dates now feed the same reminder pipeline as hearings
-- and tasks (dashboard "Upcoming", notification bell, and the email cron),
-- so the dedupe log needs to accept a third item_kind.
alter table reminder_email_log drop constraint reminder_email_log_item_kind_check;
alter table reminder_email_log add constraint reminder_email_log_item_kind_check
  check (item_kind in ('hearing', 'task', 'limitation'));
