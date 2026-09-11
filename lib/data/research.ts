import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function listResearchForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("research_items")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false });
}

export type NewResearchInput = Omit<
  Database["public"]["Tables"]["research_items"]["Insert"],
  "id" | "created_at"
>;

export function createResearchItem(supabase: TypedClient, input: NewResearchInput) {
  return supabase.from("research_items").insert(input);
}

export type ResearchUpdateInput = Omit<
  Database["public"]["Tables"]["research_items"]["Update"],
  "id" | "case_id" | "advocate_id" | "created_at"
>;

export function updateResearchItem(supabase: TypedClient, id: string, input: ResearchUpdateInput) {
  return supabase.from("research_items").update(input).eq("id", id);
}

export function deleteResearchItem(supabase: TypedClient, id: string) {
  return supabase.from("research_items").delete().eq("id", id);
}
