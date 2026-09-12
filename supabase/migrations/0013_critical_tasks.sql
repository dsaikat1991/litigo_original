-- mylitigo: flag a task as a critical deadline (e.g. a limitation period)
-- so it gets a visually distinct treatment wherever tasks show up, instead
-- of blending in with routine to-dos. Missing a limitation date is a
-- malpractice risk, not just an inconvenience.

alter table tasks
  add column is_critical boolean not null default false;
