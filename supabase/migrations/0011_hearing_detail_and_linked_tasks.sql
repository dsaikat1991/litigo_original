-- mylitigo: phase 2 of the case timeline — richer hearing records, and tasks
-- that can be tied to the specific hearing that produced them ("tasks
-- before next hearing").

alter table hearings
  add column arguments_made text,
  add column court_direction text,
  add column documents_filed text[] not null default '{}';

-- Nullable: most tasks are still general case to-dos, not tied to a hearing.
-- on delete set null (not cascade) — deleting a hearing shouldn't delete a
-- real, possibly-still-open task; it just becomes a plain case task again.
alter table tasks
  add column hearing_id uuid references hearings(id) on delete set null;

create index tasks_hearing_id_idx on tasks(hearing_id);
