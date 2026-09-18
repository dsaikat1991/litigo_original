import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Service-role client for background jobs (the reminder-email cron) that need
 * to read across every advocate's data at once. Bypasses row-level security
 * entirely, so this must never be imported into anything reachable from a
 * user request — server-only, cron-route-only.
 */
export function createServiceClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
