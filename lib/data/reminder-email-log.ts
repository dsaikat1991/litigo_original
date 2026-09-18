import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export type ReminderEmailLogEntry = {
  advocate_id: string;
  item_kind: "hearing" | "task";
  item_id: string;
  threshold_days: number;
};

/** All log rows for the given advocate, so the cron job can skip thresholds already sent today. */
export function listReminderEmailLog(supabase: TypedClient, advocateId: string) {
  return supabase
    .from("reminder_email_log")
    .select("item_kind, item_id, threshold_days")
    .eq("advocate_id", advocateId);
}

/** Records a batch of thresholds as sent. Safe to call with an empty array. */
export function recordReminderEmailsSent(supabase: TypedClient, entries: ReminderEmailLogEntry[]) {
  if (entries.length === 0) return Promise.resolve({ data: null, error: null });
  return supabase.from("reminder_email_log").upsert(entries, {
    onConflict: "advocate_id,item_kind,item_id,threshold_days",
    ignoreDuplicates: true,
  });
}
