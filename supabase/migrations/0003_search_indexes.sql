-- mylitigo: trigram indexes to keep ILIKE search fast as data grows,
-- and to tolerate partial/typo'd case numbers, CNR numbers, and names

create extension if not exists pg_trgm;

create index cases_case_title_trgm_idx on cases using gin (case_title gin_trgm_ops);
create index cases_client_name_trgm_idx on cases using gin (client_name gin_trgm_ops);
create index cases_opposing_party_trgm_idx on cases using gin (opposing_party gin_trgm_ops);
create index cases_case_number_trgm_idx on cases using gin (case_number gin_trgm_ops);
create index cases_cnr_number_trgm_idx on cases using gin (cnr_number gin_trgm_ops);
create index cases_court_trgm_idx on cases using gin (court gin_trgm_ops);

create index notes_content_trgm_idx on notes using gin (content gin_trgm_ops);

create index hearings_purpose_trgm_idx on hearings using gin (purpose gin_trgm_ops);
create index hearings_order_notes_trgm_idx on hearings using gin (order_notes gin_trgm_ops);
