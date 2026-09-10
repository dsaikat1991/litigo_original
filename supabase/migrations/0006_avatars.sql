-- mylitigo: profile avatars via Supabase Storage

alter table profiles add column avatar_url text;

-- Storage bucket for profile pictures. Public read (so the stored URL can be
-- used directly as an <img src>), but writes are restricted below to each
-- advocate's own folder. 2MB limit, images only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Files are stored as "<user_id>/avatar.<ext>" — these policies check that
-- the first path segment matches the uploader's own auth uid.
create policy "avatars: public read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars: owner can upload" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars: owner can update" on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars: owner can delete" on storage.objects
  for delete using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
