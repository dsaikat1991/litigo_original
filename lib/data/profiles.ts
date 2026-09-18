import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function getProfile(supabase: TypedClient, id: string) {
  return supabase.from("profiles").select("*").eq("id", id).single();
}

/**
 * Every advocate's id/name/email-reminder-days. Used by the reminder-email cron,
 * which filters to non-empty `reminder_email_days` itself (simpler and safer than
 * trying to express "array is non-empty" as a PostgREST array-literal filter).
 */
export function listAllProfilesForReminders(supabase: TypedClient) {
  return supabase.from("profiles").select("id, full_name, reminder_email_days");
}

export type ProfileUpdateInput = Omit<Database["public"]["Tables"]["profiles"]["Update"], "id" | "created_at">;

export function updateProfile(supabase: TypedClient, id: string, input: ProfileUpdateInput) {
  return supabase.from("profiles").update(input).eq("id", id);
}

/** Deletes the signed-in user's account and everything they own (cases, hearings, notes, tasks, research). */
export function deleteOwnAccount(supabase: TypedClient) {
  return supabase.rpc("delete_own_account");
}
