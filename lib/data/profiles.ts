import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function getProfile(supabase: TypedClient, id: string) {
  return supabase.from("profiles").select("*").eq("id", id).single();
}

export type ProfileUpdateInput = Omit<Database["public"]["Tables"]["profiles"]["Update"], "id" | "created_at">;

export function updateProfile(supabase: TypedClient, id: string, input: ProfileUpdateInput) {
  return supabase.from("profiles").update(input).eq("id", id);
}
