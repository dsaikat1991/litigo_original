import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Task, Case } from "@/types/database";
import { isoDateDaysFromNow } from "@/lib/dates";

type TypedClient = SupabaseClient<Database>;

export function listTasksForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("tasks")
    .select("*")
    .eq("case_id", caseId)
    .order("is_done", { ascending: true })
    .order("due_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });
}

export type TaskWithCase = Task & { case: Pick<Case, "id" | "case_title"> | null };

/** Not-done tasks with a due date within `days` from today — includes overdue. */
export function listUpcomingTasks(supabase: TypedClient, days: number) {
  return supabase
    .from("tasks")
    .select("*, case:cases(id, case_title)")
    .eq("is_done", false)
    .lte("due_date", isoDateDaysFromNow(days))
    .order("due_date", { ascending: true, nullsFirst: false });
}

export type NewTaskInput = Omit<
  Database["public"]["Tables"]["tasks"]["Insert"],
  "id" | "created_at" | "is_done" | "completed_at"
>;

export function createTask(supabase: TypedClient, input: NewTaskInput) {
  return supabase.from("tasks").insert(input);
}

export type TaskUpdateInput = Omit<
  Database["public"]["Tables"]["tasks"]["Update"],
  "id" | "case_id" | "advocate_id" | "created_at" | "completed_at"
>;

export function updateTask(supabase: TypedClient, id: string, input: TaskUpdateInput) {
  return supabase.from("tasks").update(input).eq("id", id);
}

export function deleteTask(supabase: TypedClient, id: string) {
  return supabase.from("tasks").delete().eq("id", id);
}
