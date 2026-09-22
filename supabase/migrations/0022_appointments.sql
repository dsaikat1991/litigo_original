-- mylitigo: appointments (client conferences, meetings with co-counsel,
-- anything time-bound that isn't a court hearing) — distinct from tasks
-- (no time-of-day, not scheduled) and hearings (court-only). Case-optional,
-- same as notes, since a meeting can happen before a case even exists.
create table appointments (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references profiles(id) on delete cascade,
  case_id uuid references cases(id) on delete cascade,
  title text not null,
  appointment_date date not null,
  appointment_time time,
  location text,
  notes text,
  is_done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index appointments_advocate_id_idx on appointments(advocate_id);
create index appointments_case_id_idx on appointments(case_id);
create index appointments_appointment_date_idx on appointments(appointment_date);

alter table appointments enable row level security;

create policy "appointments: owner full access" on appointments
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());

-- keep completed_at in sync with is_done, same pattern as tasks
create function set_appointment_completed_at()
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

create trigger on_appointment_update
  before update on appointments
  for each row execute procedure set_appointment_completed_at();
