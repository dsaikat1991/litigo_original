-- mylitigo: a limitation/statutory-deadline date belongs on the case record
-- itself (like next_hearing_date), not buried in a generic task, since
-- missing it can be fatal to the matter — and the governing act & section
-- is a small but frequently-referenced piece of the case record.
alter table cases
  add column limitation_date date,
  add column act_section text;
