import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export function getSubscription(supabase: TypedClient, advocateId: string) {
  return supabase.from("subscriptions").select("*").eq("advocate_id", advocateId).maybeSingle();
}

export type SubscriptionUpsertInput = Database["public"]["Tables"]["subscriptions"]["Insert"];

/**
 * Used by the create-subscription route (right after verifying the caller's
 * own session server-side) and the Razorpay webhook (via the service-role
 * client) — never called with the advocate's own browser client, since RLS
 * only grants that client read access.
 */
export function upsertSubscription(supabase: TypedClient, input: SubscriptionUpsertInput) {
  return supabase.from("subscriptions").upsert(input, { onConflict: "advocate_id" });
}
