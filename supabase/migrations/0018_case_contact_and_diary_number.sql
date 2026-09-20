-- mylitigo: a few real gaps in the case record surfaced by the advocate's
-- own practice — a diary number (assigned on e-filing, before the registry
-- clears the matter and issues a proper case number), a way to reach the
-- client directly, and who's representing the opposing side.
alter table cases
  add column diary_number text,
  add column client_phone text,
  add column client_email text,
  add column opposing_counsel text;
