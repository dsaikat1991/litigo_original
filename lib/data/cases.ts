import type { SupabaseClient } from "@supabase/supabase-js";
import type { Case, Database } from "@/types/database";
import { isoDateDaysFromNow } from "@/lib/dates";

type TypedClient = SupabaseClient<Database>;

const CASE_LIST_COLUMNS =
  "id, case_title, client_name, court, case_type, status, next_hearing_date, limitation_date, current_stage" as const;

export type CaseListItem = Pick<
  Database["public"]["Tables"]["cases"]["Row"],
  | "id"
  | "case_title"
  | "client_name"
  | "court"
  | "case_type"
  | "status"
  | "next_hearing_date"
  | "limitation_date"
  | "current_stage"
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

/**
 * Same as `listCasesWithHearingWithin`, but scoped by an explicit `advocateId`
 * instead of relying on RLS — for the reminder-email cron, which runs on a
 * service-role client with RLS bypassed and must filter per advocate itself.
 */
export function listCasesWithHearingWithinForAdvocate(supabase: TypedClient, advocateId: string, days: number) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .eq("advocate_id", advocateId)
    .not("next_hearing_date", "is", null)
    .neq("status", "disposed")
    .lte("next_hearing_date", isoDateDaysFromNow(days))
    .order("next_hearing_date", { ascending: true });
}

/**
 * Cases (not disposed) whose next hearing date has already passed — almost
 * always meaning the hearing happened but the outcome/next date hasn't been
 * logged yet, distinct from a hearing genuinely coming up.
 */
export function listOverdueCases(supabase: TypedClient) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .not("next_hearing_date", "is", null)
    .neq("status", "disposed")
    .lt("next_hearing_date", isoDateDaysFromNow(0))
    .order("next_hearing_date", { ascending: true });
}

/** Cases (not disposed) with a limitation date within `days` from today — includes overdue. */
export function listCasesWithLimitationWithin(supabase: TypedClient, days: number) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .not("limitation_date", "is", null)
    .neq("status", "disposed")
    .lte("limitation_date", isoDateDaysFromNow(days))
    .order("limitation_date", { ascending: true });
}

/**
 * Same as `listCasesWithLimitationWithin`, but scoped by an explicit
 * `advocateId` for the reminder-email cron's service-role client.
 */
export function listCasesWithLimitationWithinForAdvocate(supabase: TypedClient, advocateId: string, days: number) {
  return supabase
    .from("cases")
    .select(CASE_LIST_COLUMNS)
    .eq("advocate_id", advocateId)
    .not("limitation_date", "is", null)
    .neq("status", "disposed")
    .lte("limitation_date", isoDateDaysFromNow(days))
    .order("limitation_date", { ascending: true });
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
 * Today's cause list — cases (not disposed) whose next hearing is exactly
 * today. Overdue hearings (a past next_hearing_date not yet logged) are
 * deliberately excluded — they get their own standing "Overdue — not yet
 * updated" section on the dashboard instead, so this page stays a clean
 * list of what's actually listed today.
 */
export function listTodaysCases(supabase: TypedClient) {
  return supabase
    .from("cases")
    .select(CAUSE_LIST_COLUMNS)
    .neq("status", "disposed")
    .eq("next_hearing_date", isoDateDaysFromNow(0))
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
  "id" | "created_at" | "updated_at" | "next_hearing_date" | "current_stage"
>;

export function createCase(supabase: TypedClient, input: NewCaseInput) {
  return supabase.from("cases").insert(input).select("id").single();
}

export type CaseUpdateInput = Omit<
  Database["public"]["Tables"]["cases"]["Update"],
  "id" | "advocate_id" | "created_at" | "updated_at" | "next_hearing_date" | "current_stage"
>;

export function updateCase(supabase: TypedClient, id: string, input: CaseUpdateInput) {
  return supabase.from("cases").update(input).eq("id", id);
}

export function deleteCase(supabase: TypedClient, id: string) {
  return supabase.from("cases").delete().eq("id", id);
}
