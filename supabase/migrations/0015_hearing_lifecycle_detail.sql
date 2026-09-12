-- mylitigo: fuller hearing lifecycle detail — bench, judge, courtroom,
-- procedural stage, attendance, court observations, and what the next
-- hearing is actually for. Kept optional (all nullable / empty-array
-- defaults) since most hearings won't need most of these.

alter table hearings
  add column bench text,
  add column judge text,
  add column courtroom text,
  add column stage text,
  add column parties_present text[] not null default '{}',
  add column advocates_appearing text[] not null default '{}',
  -- "Application heard" — an IA/appeal taken up at this hearing. Reuses the
  -- case-linking feature (a child case via parent_case_id) rather than free
  -- text, since that application is itself tracked as its own case. One
  -- application per hearing for now.
  add column application_case_id uuid references cases(id) on delete set null,
  add column court_observations text,
  add column next_purpose text;

create index hearings_application_case_id_idx on hearings(application_case_id);

-- "Order passed" is modeled as an actual attached document (the order copy)
-- rather than a text field duplicating order_notes — a document can now
-- optionally be tied to the hearing it came from, same on-delete-set-null
-- pattern as tasks.hearing_id.
alter table case_documents
  add column hearing_id uuid references hearings(id) on delete set null;

create index case_documents_hearing_id_idx on case_documents(hearing_id);
