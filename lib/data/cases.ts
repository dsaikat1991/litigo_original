import type { SupabaseClient } from "@supabase/supabase-js";
import type { Case, Database } from "@/types/database";
import { isoDateDaysFromNow } from "@/lib/dates";

type TypedClient = SupabaseClient<Database>;

const CASE_LIST_COLUMNS = "id, case_title, client_name, court, status, next_hearing_date" as const;

export type CaseListItem = Pick<
  Database["public"]["Tables"]["cases"]["Row"],
  "id" | "case_title" | "client_name" | "court" | "status" | "next_hearing_date"
>;

export function listCases(supabase: TypedClient) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .order("next_hearing_date", { ascending: true, nullsFirst: false });
}

export function listUpcomingCases(supabase: TypedClient) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .not("next_hearing_date", "is", null)
    .neq("status", "disposed")
    .order("next_hearing_date", { ascending: true });
}

/** Cases (not disposed) with a next hearing date within `days` from today — includes overdue. */
export function listCasesWithHearingWithin(supabase: TypedClient, days: number) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .not("next_hearing_date", "is", null)
    .neq("status", "disposed")
    .lte("next_hearing_date", isoDateDaysFromNow(days))
    .order("next_hearing_date", { ascending: true });
}

const CAUSE_LIST_COLUMNS =
  "id, case_title, client_name, opposing_party, court, case_number, cnr_number, case_type, status, next_hearing_date" as const;

export type CauseListItem = Pick<
  Database["public"]["Tables"]["cases"]["Row"],
  | "id"
  | "case_title"
  | "client_name"
  | "opposing_party"
  | "court"
  | "case_number"
  | "cnr_number"
  | "case_type"
  | "status"
  | "next_hearing_date"
>;

/**
 * Today's cause list — cases (not disposed) whose next hearing is today or
 * earlier. "Earlier" is included deliberately: a next_hearing_date in the
 * past almost always means the hearing already happened but hasn't been
 * logged yet, which the advocate needs to know about just as urgently as
 * today's actual listings.
 */
export function listTodaysCases(supabase: TypedClient) {
  return supabase
    .from("cases")
    .select(CAUSE_LIST_COLUMNS)
    .not("next_hearing_date", "is", null)
    .neq("status", "disposed")
    .lte("next_hearing_date", isoDateDaysFromNow(0))
    .order("next_hearing_date", { ascending: true });
}

export type CaseWithParent = Case & { parent_case: Pick<Case, "id" | "case_title"> | null };

export function getCase(supabase: TypedClient, id: string) {
  // A self-referencing embed only types (and behaves, per PostgREST) as a single
  // object when selected via the column name directly with no hint — any hint
  // or the bare table name makes both PostgREST and its types return an array.
  return supabase
    .from("cases")
    .select("*, parent_case:parent_case_id(id, case_title)")
    .eq("id", id)
    .single();
}

export type ChildCase = Pick<
  Database["public"]["Tables"]["cases"]["Row"],
  "id" | "case_title" | "case_type" | "status" | "next_hearing_date"
>;

/** Other cases linked to this one as their parent (an IA, appeal, execution, etc. arising from it). */
export function listChildCases(supabase: TypedClient, parentCaseId: string) {
  return supabase
    .from("cases")
    .select("id, case_title, case_type, status, next_hearing_date")
    .eq("parent_case_id", parentCaseId)
    .order("created_at", { ascending: false });
}

export type NewCaseInput = Omit<
  Database["public"]["Tables"]["cases"]["Insert"],
  "id" | "created_at" | "updated_at" | "next_hearing_date"
>;

export function createCase(supabase: TypedClient, input: NewCaseInput) {
  return supabase.from("cases").insert(input).select("id").single();
}

export type CaseUpdateInput = Omit<
  Database["public"]["Tables"]["cases"]["Update"],
  "id" | "advocate_id" | "created_at" | "updated_at" | "next_hearing_date"
>;

export function updateCase(supabase: TypedClient, id: string, input: CaseUpdateInput) {
  return supabase.from("cases").update(input).eq("id", id);
}

export function deleteCase(supabase: TypedClient, id: string) {
  return supabase.from("cases").delete().eq("id", id);
}
