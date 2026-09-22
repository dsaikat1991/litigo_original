import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function listArgumentsForHearing(supabase: TypedClient, hearingId: string) {
  return supabase
    .from("hearing_arguments")
    .select("*")
    .eq("hearing_id", hearingId)
    .order("created_at", { ascending: true });
}

/** All arguments across a case's hearings, keyed by hearing_id in the caller. */
export function listArgumentsForHearings(supabase: TypedClient, hearingIds: string[]) {
  return supabase.from("hearing_arguments").select("*").in("hearing_id", hearingIds).order("created_at", { ascending: true });
}

export type NewHearingArgumentInput = Omit<
  Database["public"]["Tables"]["hearing_arguments"]["Insert"],
  "id" | "created_at"
>;

export function createHearingArgument(supabase: TypedClient, input: NewHearingArgumentInput) {
  return supabase.from("hearing_arguments").insert(input);
}

export type HearingArgumentUpdateInput = Omit<
  Database["public"]["Tables"]["hearing_arguments"]["Update"],
  "id" | "hearing_id" | "advocate_id" | "created_at"
>;

export function updateHearingArgument(supabase: TypedClient, id: string, input: HearingArgumentUpdateInput) {
  return supabase.from("hearing_arguments").update(input).eq("id", id);
}

export function deleteHearingArgument(supabase: TypedClient, id: string) {
  return supabase.from("hearing_arguments").delete().eq("id", id);
}
