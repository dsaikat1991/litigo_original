import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function listHearingsForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("hearings")
    .select("*")
    .eq("case_id", caseId)
    .order("hearing_date", { ascending: false });
}

export type NewHearingInput = Omit<
  Database["public"]["Tables"]["hearings"]["Insert"],
  "id" | "created_at"
>;

export function createHearing(supabase: TypedClient, input: NewHearingInput) {
  return supabase.from("hearings").insert(input);
}

export type HearingUpdateInput = Omit<
  Database["public"]["Tables"]["hearings"]["Update"],
  "id" | "case_id" | "advocate_id" | "created_at"
>;

export function updateHearing(supabase: TypedClient, id: string, input: HearingUpdateInput) {
  return supabase.from("hearings").update(input).eq("id", id);
}

export function deleteHearing(supabase: TypedClient, id: string) {
  return supabase.from("hearings").delete().eq("id", id);
}
