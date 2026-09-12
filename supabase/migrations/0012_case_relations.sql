-- mylitigo: let a case (an IA, interim application, appeal, execution,
-- revision, etc.) link back to the case it arose from. Deliberately no
-- rigid "relation type" enum here — the case_title and case_type already
-- let the advocate describe what it is; this just adds the "related to"
-- edge between two of their own cases.

alter table cases
  add column parent_case_id uuid references cases(id) on delete set null;

create index cases_parent_case_id_idx on cases(parent_case_id);
