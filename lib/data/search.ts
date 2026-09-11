import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

const CASE_RESULT_COLUMNS = "id, case_title, client_name, court, status, next_hearing_date" as const;

/**
 * PostgREST's `.or()` filter syntax treats "," and "()" as delimiters, so a
 * search term containing them (e.g. "Sharma, Verma") would otherwise break
 * the filter. Wrapping the value in double quotes (doubling any embedded
 * quotes) is PostgREST's documented escape for values with special characters.
 */
function toOrLikePattern(term: string) {
  const escaped = term.replace(/"/g, '""');
  return `"%${escaped}%"`;
}

/** Exclusive upper bound for a `date` string, for comparing against a timestamptz column. */
function dayAfter(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export type SearchFilters = {
  query?: string;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
};

export async function searchAll(supabase: TypedClient, filters: SearchFilters) {
  const { query, dateFrom, dateTo, tags } = filters;
  const pattern = query ? toOrLikePattern(query) : null;

  let casesQuery = supabase.from("cases").select(CASE_RESULT_COLUMNS);
  let hearingsQuery = supabase
    .from("hearings")
    .select("id, case_id, hearing_date, purpose, order_notes, next_date");
  let notesQuery = supabase.from("notes").select("id, case_id, type, content, tags, created_at");
  let tasksQuery = supabase.from("tasks").select("id, case_id, title, due_date, is_done");
  let researchQuery = supabase
    .from("research_items")
    .select("id, case_id, source_type, citation, notes, link, tags, created_at");

  if (pattern) {
    casesQuery = casesQuery.or(
      [
        `case_title.ilike.${pattern}`,
        `client_name.ilike.${pattern}`,
        `opposing_party.ilike.${pattern}`,
        `case_number.ilike.${pattern}`,
        `cnr_number.ilike.${pattern}`,
        `court.ilike.${pattern}`,
      ].join(",")
    );
    hearingsQuery = hearingsQuery.or([`purpose.ilike.${pattern}`, `order_notes.ilike.${pattern}`].join(","));
    notesQuery = notesQuery.ilike("content", `%${query}%`);
    tasksQuery = tasksQuery.ilike("title", `%${query}%`);
    researchQuery = researchQuery.or([`citation.ilike.${pattern}`, `notes.ilike.${pattern}`].join(","));
  }

  if (dateFrom) {
    casesQuery = casesQuery.gte("next_hearing_date", dateFrom);
    hearingsQuery = hearingsQuery.gte("hearing_date", dateFrom);
    notesQuery = notesQuery.gte("created_at", dateFrom);
    tasksQuery = tasksQuery.gte("due_date", dateFrom);
    researchQuery = researchQuery.gte("created_at", dateFrom);
  }
  if (dateTo) {
    casesQuery = casesQuery.lte("next_hearing_date", dateTo);
    hearingsQuery = hearingsQuery.lte("hearing_date", dateTo);
    notesQuery = notesQuery.lt("created_at", dayAfter(dateTo));
    tasksQuery = tasksQuery.lte("due_date", dateTo);
    researchQuery = researchQuery.lt("created_at", dayAfter(dateTo));
  }

  // hearings and tasks have no tags column, so the tag filter only narrows cases, notes, and research
  if (tags && tags.length > 0) {
    casesQuery = casesQuery.overlaps("tags", tags);
    notesQuery = notesQuery.overlaps("tags", tags);
    researchQuery = researchQuery.overlaps("tags", tags);
  }

  // if tags is the only active filter, hearings/tasks have nothing to filter by —
  // return none rather than everything unfiltered
  const noTagOnlyFilters = Boolean(pattern) || Boolean(dateFrom) || Boolean(dateTo);

  const [casesRes, notesRes, hearingsRes, tasksRes, researchRes] = await Promise.all([
    casesQuery.order("next_hearing_date", { ascending: true, nullsFirst: false }).limit(20),
    notesQuery.order("created_at", { ascending: false }).limit(20),
    noTagOnlyFilters
      ? hearingsQuery.order("hearing_date", { ascending: false }).limit(20)
      : Promise.resolve({ data: [] as never[] }),
    noTagOnlyFilters
      ? tasksQuery.order("due_date", { ascending: true, nullsFirst: false }).limit(20)
      : Promise.resolve({ data: [] as never[] }),
    researchQuery.order("created_at", { ascending: false }).limit(20),
  ]);

  return {
    cases: casesRes.data ?? [],
    notes: notesRes.data ?? [],
    hearings: hearingsRes.data ?? [],
    tasks: tasksRes.data ?? [],
    research: researchRes.data ?? [],
  };
}
