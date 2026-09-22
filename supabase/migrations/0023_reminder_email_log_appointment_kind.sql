-- mylitigo: appointments now feed the same reminder pipeline as hearings,
-- tasks, and limitation dates, so the dedupe log needs to accept a fourth
-- item_kind.
alter table reminder_email_log drop constraint reminder_email_log_item_kind_check;
alter table reminder_email_log add constraint reminder_email_log_item_kind_check
  check (item_kind in ('hearing', 'task', 'limitation', 'appointment'));
