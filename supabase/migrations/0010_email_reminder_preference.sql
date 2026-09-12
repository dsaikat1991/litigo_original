-- mylitigo: separate reminder-day preference for the email channel, so
-- Settings can offer In-app / Email columns independently. Note: this only
-- stores the preference — no email delivery exists yet (still planned as a
-- later phase), so defaults to off rather than implying emails are sent.
alter table profiles
  add column reminder_email_days int[] not null default '{}';
