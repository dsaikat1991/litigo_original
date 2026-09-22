-- mylitigo: the dashboard's case list now shows the current procedural
-- stage, pulled from the hearing most recently logged for that case — same
-- denormalization already used for cases.next_hearing_date, so the list can
-- show it without an extra join per case.
alter table cases add column current_stage text;

drop trigger on_hearing_upsert on hearings;
drop function sync_case_next_hearing_date();

create function sync_case_hearing_fields()
returns trigger
language plpgsql
as $$
begin
  update cases
  set next_hearing_date = new.next_date,
      current_stage = new.stage,
      updated_at = now()
  where id = new.case_id;
  return new;
end;
$$;

create trigger on_hearing_upsert
  after insert or update on hearings
  for each row execute procedure sync_case_hearing_fields();
