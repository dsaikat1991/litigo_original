-- mylitigo: document attachments per case (petitions, orders, evidence,
-- scanned filings) — actual files, not just text notes.

create table case_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  advocate_id uuid not null references profiles(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  file_size bigint,
  mime_type text,
  created_at timestamptz not null default now()
);

create index case_documents_case_id_idx on case_documents(case_id);
create index case_documents_advocate_id_idx on case_documents(advocate_id);

alter table case_documents enable row level security;

create policy "case_documents: owner full access" on case_documents
  for all using (advocate_id = auth.uid()) with check (advocate_id = auth.uid());

-- Storage bucket for the actual files. Private (unlike the public `avatars`
-- bucket) — case documents are potentially sensitive, so access always goes
-- through a signed URL rather than a public one. 10MB cap; common filing
-- formats only (PDF, images for scans, Word docs).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'case-documents',
  'case-documents',
  false,
  10485760,
  array[
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/webp',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

-- Files are stored as "<advocate_id>/<case_id>/<document_id>-<filename>" —
-- these policies check that the first path segment matches the uploader's
-- own auth uid, same pattern as the avatars bucket.
create policy "case_documents storage: owner select" on storage.objects
  for select using (
    bucket_id = 'case-documents' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "case_documents storage: owner insert" on storage.objects
  for insert with check (
    bucket_id = 'case-documents' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "case_documents storage: owner delete" on storage.objects
  for delete using (
    bucket_id = 'case-documents' and (storage.foldername(name))[1] = auth.uid()::text
  );
