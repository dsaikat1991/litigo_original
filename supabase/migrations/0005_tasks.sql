-- mylitigo: per-case tasks (distinct from notes/hearings — actionable, has a
-- due date and a completion state)

create table tasks (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  advocate_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  due_date date,
  is_done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index tasks_case_id_idx on tasks(case_id);
create index tasks_advocate_id_idx on tasks(advocate_id);
create index tasks_due_date_idx on tasks(due_date);
create index tasks_title_trgm_idx on tasks using gin (title gin_trgm_ops);

alter table tasks enable row level security;

create policy "tasks: owner full access" on tasks
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());

-- keep completed_at in sync with is_done without requiring the app to set it
create function set_task_completed_at()
returns trigger
language plpgsql
as $$
begin
  if new.is_done and not old.is_done then
    new.completed_at = now();
  elsif not new.is_done then
    new.completed_at = null;
  end if;
  return new;
end;
$$;

create trigger on_task_update
  before update on tasks
  for each row execute procedure set_task_completed_at();
