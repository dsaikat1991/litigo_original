import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function listNotesForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("notes")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false });
}

export type NewNoteInput = Omit<
  Database["public"]["Tables"]["notes"]["Insert"],
  "id" | "created_at"
>;

export function createNote(supabase: TypedClient, input: NewNoteInput) {
  return supabase.from("notes").insert(input);
}
