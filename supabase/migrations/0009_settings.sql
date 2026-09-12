-- mylitigo: settings page additions — per-threshold reminder preferences and
-- self-service account deletion.

-- Which of the 7/3/1/0-day thresholds should surface a reminder. Empty array
-- means reminders are off entirely.
alter table profiles
  add column reminder_days int[] not null default '{7,3,1,0}';

-- Lets a signed-in user delete their own account (and, via the existing
-- on-delete-cascade chain from auth.users -> profiles -> cases/tasks/
-- hearings/notes/research_items, everything they own) without the app ever
-- needing the service-role key. `security definer` runs with the function
-- owner's privileges (which can write to auth.users), but auth.uid() is read
-- from the caller's own JWT server-side, so a user can only ever delete
-- themselves.
create function delete_own_account()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

grant execute on function delete_own_account() to authenticated;
