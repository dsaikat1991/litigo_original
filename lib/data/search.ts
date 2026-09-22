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
export function toOrLikePattern(term: string) {
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

export type QuickSearchResult = {
  id: string;
  type: "case" | "hearing" | "task" | "note" | "research" | "document" | "appointment";
  title: string;
  subtitle?: string;
  href: string;
};

/**
 * Lightweight keyword-only lookup for the navbar's live search dropdown —
 * fetches a few rows per table in parallel and trims to `limit` combined
 * results, prioritizing cases first. Date/tag filtering lives in `searchAll`
 * for the full `/search` page instead.
 */
export async function quickSearch(
  supabase: TypedClient,
  query: string,
  limit = 5,
): Promise<QuickSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const pattern = toOrLikePattern(trimmed);

  const [casesRes, hearingsRes, tasksRes, notesRes, researchRes, documentsRes, appointmentsRes] = await Promise.all([
    supabase
      .from("cases")
      .select("id, case_title, client_name")
      .or(
        [
          `case_title.ilike.${pattern}`,
          `client_name.ilike.${pattern}`,
          `opposing_party.ilike.${pattern}`,
          `case_number.ilike.${pattern}`,
          `cnr_number.ilike.${pattern}`,
          `diary_number.ilike.${pattern}`,
          `opposing_counsel.ilike.${pattern}`,
          `act_section.ilike.${pattern}`,
          `court.ilike.${pattern}`,
        ].join(","),
      )
      .limit(limit),
    supabase
      .from("hearings")
      .select("id, case_id, purpose, hearing_date")
      .or([`purpose.ilike.${pattern}`, `order_notes.ilike.${pattern}`, `judge.ilike.${pattern}`].join(","))
      .limit(limit),
    supabase.from("tasks").select("id, case_id, title").ilike("title", `%${trimmed}%`).limit(limit),
    supabase
      .from("notes")
      .select("id, case_id, content")
      .ilike("content", `%${trimmed}%`)
      .limit(limit),
    supabase
      .from("research_items")
      .select("id, case_id, citation")
      .or([`citation.ilike.${pattern}`, `notes.ilike.${pattern}`].join(","))
      .limit(limit),
    supabase.from("case_documents").select("id, case_id, file_name").ilike("file_name", `%${trimmed}%`).limit(limit),
    supabase
      .from("appointments")
      .select("id, case_id, title, appointment_date")
      .or([`title.ilike.${pattern}`, `location.ilike.${pattern}`].join(","))
      .limit(limit),
  ]);

  const results: QuickSearchResult[] = [
    ...(casesRes.data ?? []).map((c) => ({
      id: c.id,
      type: "case" as const,
      title: c.case_title,
      subtitle: c.client_name ?? undefined,
      href: `/cases/${c.id}`,
    })),
    ...(hearingsRes.data ?? []).map((h) => ({
      id: h.id,
      type: "hearing" as const,
      title: h.purpose || "Hearing",
      subtitle: h.hearing_date,
      href: `/cases/${h.case_id}`,
    })),
    ...(tasksRes.data ?? []).map((t) => ({
      id: t.id,
      type: "task" as const,
      title: t.title,
      href: `/cases/${t.case_id}`,
    })),
    ...(notesRes.data ?? []).map((n) => ({
      id: n.id,
      type: "note" as const,
      title: n.content.length > 80 ? `${n.content.slice(0, 80)}…` : n.content,
      href: n.case_id ? `/cases/${n.case_id}` : "/notes",
    })),
    ...(researchRes.data ?? []).map((r) => ({
      id: r.id,
      type: "research" as const,
      title: r.citation,
      href: `/cases/${r.case_id}`,
    })),
    ...(documentsRes.data ?? []).map((d) => ({
      id: d.id,
      type: "document" as const,
      title: d.file_name,
      href: `/cases/${d.case_id}`,
    })),
    ...(appointmentsRes.data ?? []).map((a) => ({
      id: a.id,
      type: "appointment" as const,
      title: a.title,
      subtitle: a.appointment_date,
      href: a.case_id ? `/cases/${a.case_id}` : "/appointments",
    })),
  ];

  return results.slice(0, limit);
}

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
  let documentsQuery = supabase
    .from("case_documents")
    .select("id, case_id, file_name, mime_type, created_at");
  let appointmentsQuery = supabase
    .from("appointments")
    .select("id, case_id, title, appointment_date, appointment_time, location, is_done");

  if (pattern) {
    casesQuery = casesQuery.or(
      [
        `case_title.ilike.${pattern}`,
        `client_name.ilike.${pattern}`,
        `opposing_party.ilike.${pattern}`,
        `case_number.ilike.${pattern}`,
        `cnr_number.ilike.${pattern}`,
        `diary_number.ilike.${pattern}`,
        `opposing_counsel.ilike.${pattern}`,
        `act_section.ilike.${pattern}`,
        `court.ilike.${pattern}`,
      ].join(",")
    );
    hearingsQuery = hearingsQuery.or(
      [
        `purpose.ilike.${pattern}`,
        `order_notes.ilike.${pattern}`,
        `bench.ilike.${pattern}`,
        `judge.ilike.${pattern}`,
        `courtroom.ilike.${pattern}`,
        `stage.ilike.${pattern}`,
        `court_observations.ilike.${pattern}`,
        `next_purpose.ilike.${pattern}`,
      ].join(","),
    );
    notesQuery = notesQuery.ilike("content", `%${query}%`);
    tasksQuery = tasksQuery.ilike("title", `%${query}%`);
    researchQuery = researchQuery.or([`citation.ilike.${pattern}`, `notes.ilike.${pattern}`].join(","));
    documentsQuery = documentsQuery.ilike("file_name", `%${query}%`);
    appointmentsQuery = appointmentsQuery.or([`title.ilike.${pattern}`, `location.ilike.${pattern}`].join(","));
  }

  if (dateFrom) {
    casesQuery = casesQuery.gte("next_hearing_date", dateFrom);
    hearingsQuery = hearingsQuery.gte("hearing_date", dateFrom);
    notesQuery = notesQuery.gte("created_at", dateFrom);
    tasksQuery = tasksQuery.gte("due_date", dateFrom);
    researchQuery = researchQuery.gte("created_at", dateFrom);
    documentsQuery = documentsQuery.gte("created_at", dateFrom);
    appointmentsQuery = appointmentsQuery.gte("appointment_date", dateFrom);
  }
  if (dateTo) {
    casesQuery = casesQuery.lte("next_hearing_date", dateTo);
    hearingsQuery = hearingsQuery.lte("hearing_date", dateTo);
    notesQuery = notesQuery.lt("created_at", dayAfter(dateTo));
    tasksQuery = tasksQuery.lte("due_date", dateTo);
    researchQuery = researchQuery.lt("created_at", dayAfter(dateTo));
    documentsQuery = documentsQuery.lt("created_at", dayAfter(dateTo));
    appointmentsQuery = appointmentsQuery.lte("appointment_date", dateTo);
  }

  // hearings, tasks, and documents have no tags column, so the tag filter only narrows cases, notes, and research
  if (tags && tags.length > 0) {
    casesQuery = casesQuery.overlaps("tags", tags);
    notesQuery = notesQuery.overlaps("tags", tags);
    researchQuery = researchQuery.overlaps("tags", tags);
  }

  // if tags is the only active filter, hearings/tasks/documents/appointments have nothing to filter by —
  // return none rather than everything unfiltered
  const noTagOnlyFilters = Boolean(pattern) || Boolean(dateFrom) || Boolean(dateTo);

  const [casesRes, notesRes, hearingsRes, tasksRes, researchRes, documentsRes, appointmentsRes] = await Promise.all([
    casesQuery.order("next_hearing_date", { ascending: true, nullsFirst: false }).limit(20),
    notesQuery.order("created_at", { ascending: false }).limit(20),
    noTagOnlyFilters
      ? hearingsQuery.order("hearing_date", { ascending: false }).limit(20)
      : Promise.resolve({ data: [] as never[] }),
    noTagOnlyFilters
      ? tasksQuery.order("due_date", { ascending: true, nullsFirst: false }).limit(20)
      : Promise.resolve({ data: [] as never[] }),
    researchQuery.order("created_at", { ascending: false }).limit(20),
    noTagOnlyFilters
      ? documentsQuery.order("created_at", { ascending: false }).limit(20)
      : Promise.resolve({ data: [] as never[] }),
    noTagOnlyFilters
      ? appointmentsQuery.order("appointment_date", { ascending: false }).limit(20)
      : Promise.resolve({ data: [] as never[] }),
  ]);

  return {
    cases: casesRes.data ?? [],
    notes: notesRes.data ?? [],
    hearings: hearingsRes.data ?? [],
    tasks: tasksRes.data ?? [],
    research: researchRes.data ?? [],
    documents: documentsRes.data ?? [],
    appointments: appointmentsRes.data ?? [],
  };
}
