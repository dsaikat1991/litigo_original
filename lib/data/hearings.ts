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
