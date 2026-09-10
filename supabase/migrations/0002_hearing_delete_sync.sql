-- mylitigo: keep cases.next_hearing_date correct when a hearing is deleted
-- (0001_init.sql only synced it on insert/update, leaving a stale value
-- behind if the hearing that set it gets deleted)

create function sync_case_next_hearing_date_on_delete()
returns trigger
language plpgsql
as $$
begin
  update cases
  set next_hearing_date = (
    select next_date
    from hearings
    where case_id = old.case_id
    order by hearing_date desc, created_at desc
    limit 1
  ),
  updated_at = now()
  where id = old.case_id;
  return old;
end;
$$;

create trigger on_hearing_delete
  after delete on hearings
  for each row execute procedure sync_case_next_hearing_date_on_delete();
