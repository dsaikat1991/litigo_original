import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

const CASE_LIST_COLUMNS = "id, case_title, client_name, court, status, next_hearing_date" as const;

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

export function getCase(supabase: TypedClient, id: string) {
  return supabase.from("cases").select("*").eq("id", id).single();
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
