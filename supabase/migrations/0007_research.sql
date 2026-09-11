-- mylitigo: per-case legal research tracker (statutes, judgements,
-- articles, etc. found while preparing a case)

create type research_source_type as enum ('statute', 'judgement', 'article', 'other');

create table research_items (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  advocate_id uuid not null references profiles(id) on delete cascade,
  source_type research_source_type not null default 'other',
  citation text not null,
  notes text,
  link text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index research_items_case_id_idx on research_items(case_id);
create index research_items_advocate_id_idx on research_items(advocate_id);
create index research_items_citation_trgm_idx on research_items using gin (citation gin_trgm_ops);
create index research_items_notes_trgm_idx on research_items using gin (notes gin_trgm_ops);
create index research_items_tags_gin_idx on research_items using gin (tags);

alter table research_items enable row level security;

create policy "research_items: owner full access" on research_items
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());
