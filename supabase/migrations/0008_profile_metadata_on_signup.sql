-- mylitigo: populate full_name/avatar_url on signup from whatever the auth
-- provider gave us, instead of always leaving a bare profile row.
--
-- Email signup passes options.data.full_name (key "full_name"). Google OAuth
-- supplies "name" and "picture" instead. Coalesce across both so either path
-- works. This only affects new signups — existing profiles are untouched.

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$;
