import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function listDocumentsForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("case_documents")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false });
}

export type NewCaseDocumentInput = Omit<Database["public"]["Tables"]["case_documents"]["Insert"], "id" | "created_at">;

export function createCaseDocument(supabase: TypedClient, input: NewCaseDocumentInput) {
  return supabase.from("case_documents").insert(input);
}

export function deleteCaseDocument(supabase: TypedClient, id: string) {
  return supabase.from("case_documents").delete().eq("id", id);
}
