import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Note, Case } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function listNotesForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("notes")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false });
}

export type NoteWithCase = Note & { case: Pick<Case, "id" | "case_title"> | null };

/** Every note the advocate has written, standalone or case-linked, most recent first. */
export function listAllNotes(supabase: TypedClient) {
  return supabase
    .from("notes")
    .select("*, case:cases(id, case_title)")
    .order("created_at", { ascending: false })
    .limit(100);
}

export type NewNoteInput = Omit<
  Database["public"]["Tables"]["notes"]["Insert"],
  "id" | "created_at"
>;

export function createNote(supabase: TypedClient, input: NewNoteInput) {
  return supabase.from("notes").insert(input);
}

export type NoteUpdateInput = Omit<
  Database["public"]["Tables"]["notes"]["Update"],
  "id" | "case_id" | "advocate_id" | "created_at"
>;

export function updateNote(supabase: TypedClient, id: string, input: NoteUpdateInput) {
  return supabase.from("notes").update(input).eq("id", id);
}

export function deleteNote(supabase: TypedClient, id: string) {
  return supabase.from("notes").delete().eq("id", id);
}
