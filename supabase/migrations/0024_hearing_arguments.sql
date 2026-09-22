-- mylitigo: individual arguments the advocate made at a hearing, each
-- taggable with an outcome once known — separate from the existing
-- freeform "arguments_made" summary, so specific arguments can be
-- reviewed later ("what actually works for me on limitation pleas").
-- Outcome is nullable (not yet known) and three-state, since court
-- outcomes are rarely a clean yes/no.
create type argument_outcome as enum ('worked', 'partial', 'did_not_work');

create table hearing_arguments (
  id uuid primary key default gen_random_uuid(),
  hearing_id uuid not null references hearings(id) on delete cascade,
  advocate_id uuid not null references profiles(id) on delete cascade,
  argument_text text not null,
  outcome argument_outcome,
  created_at timestamptz not null default now()
);

create index hearing_arguments_hearing_id_idx on hearing_arguments(hearing_id);
create index hearing_arguments_advocate_id_idx on hearing_arguments(advocate_id);

alter table hearing_arguments enable row level security;

create policy "hearing_arguments: owner full access" on hearing_arguments
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());

-- the opposing side's arguments, recorded as a plain summary (not broken
-- into individual entries — deliberately kept simple, since these are
-- typically a one- or two-line paraphrase of what was heard, not something
-- the advocate is drafting point-by-point the way they do their own)
alter table hearings add column opposing_arguments text;
