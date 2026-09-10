-- mylitigo: initial schema (digital case diary for solo advocates)

create type case_status as enum ('active', 'adjourned', 'disposed');
create type case_type as enum ('civil', 'criminal', 'writ', 'appeal', 'execution', 'other');
create type note_type as enum ('note', 'learning', 'update');

-- one row per advocate, extends auth.users
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  bar_enrollment_no text,
  practice_city text,
  courts text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table cases (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references profiles(id) on delete cascade,
  case_title text not null,
  client_name text,
  opposing_party text,
  court text,
  case_number text,
  cnr_number text,
  case_type case_type not null default 'other',
  status case_status not null default 'active',
  filing_date date,
  next_hearing_date date,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cases_advocate_id_idx on cases(advocate_id);
create index cases_next_hearing_date_idx on cases(next_hearing_date);

-- one row per hearing/date the case actually came up
create table hearings (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  advocate_id uuid not null references profiles(id) on delete cascade,
  hearing_date date not null,
  purpose text,
  order_notes text,
  next_date date,
  created_at timestamptz not null default now()
);

create index hearings_case_id_idx on hearings(case_id);

-- freeform quick notes / learnings, optionally tied to a case
create table notes (
  id uuid primary key default gen_random_uuid(),
  advocate_id uuid not null references profiles(id) on delete cascade,
  case_id uuid references cases(id) on delete cascade,
  type note_type not null default 'note',
  content text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index notes_advocate_id_idx on notes(advocate_id);
create index notes_case_id_idx on notes(case_id);

-- auto-create a profile row whenever someone signs up
create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- keep cases.next_hearing_date in sync whenever a hearing sets a next_date
create function sync_case_next_hearing_date()
returns trigger
language plpgsql
as $$
begin
  update cases
  set next_hearing_date = new.next_date,
      updated_at = now()
  where id = new.case_id;
  return new;
end;
$$;

create trigger on_hearing_upsert
  after insert or update on hearings
  for each row execute procedure sync_case_next_hearing_date();

-- row-level security: every advocate only ever sees their own data
alter table profiles enable row level security;
alter table cases enable row level security;
alter table hearings enable row level security;
alter table notes enable row level security;

create policy "profiles: owner full access" on profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

create policy "cases: owner full access" on cases
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());

create policy "hearings: owner full access" on hearings
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());

create policy "notes: owner full access" on notes
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());
