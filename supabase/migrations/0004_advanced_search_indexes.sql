-- mylitigo: indexes to support advanced search's date-range and tag filters

create index hearings_hearing_date_idx on hearings(hearing_date);
create index notes_created_at_idx on notes(created_at);

create index cases_tags_gin_idx on cases using gin (tags);
create index notes_tags_gin_idx on notes using gin (tags);
