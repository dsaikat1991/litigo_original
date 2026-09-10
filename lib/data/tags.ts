import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type TypedClient = SupabaseClient<Database>;

export async function listAllTags(supabase: TypedClient): Promise<string[]> {
  const [{ data: cases }, { data: notes }] = await Promise.all([
    supabase.from("cases").select("tags"),
    supabase.from("notes").select("tags"),
  ]);

  const allTags = [...(cases ?? []), ...(notes ?? [])].flatMap((row) => row.tags);
  return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b));
}
