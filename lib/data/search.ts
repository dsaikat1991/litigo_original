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

export async function searchAll(supabase: TypedClient, query: string) {
  const pattern = toOrLikePattern(query);

  const [casesRes, notesRes, hearingsRes] = await Promise.all([
    supabase
      .from("cases")
      .select(CASE_RESULT_COLUMNS)
      .or(
        [
          `case_title.ilike.${pattern}`,
          `client_name.ilike.${pattern}`,
          `opposing_party.ilike.${pattern}`,
          `case_number.ilike.${pattern}`,
          `cnr_number.ilike.${pattern}`,
          `court.ilike.${pattern}`,
        ].join(",")
      )
      .order("next_hearing_date", { ascending: true, nullsFirst: false })
      .limit(20),
    supabase
      .from("notes")
      .select("id, case_id, type, content, tags, created_at")
      .ilike("content", `%${query}%`)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("hearings")
      .select("id, case_id, hearing_date, purpose, order_notes, next_date")
      .or([`purpose.ilike.${pattern}`, `order_notes.ilike.${pattern}`].join(","))
      .order("hearing_date", { ascending: false })
      .limit(20),
  ]);

  return {
    cases: casesRes.data ?? [],
    notes: notesRes.data ?? [],
    hearings: hearingsRes.data ?? [],
  };
}
