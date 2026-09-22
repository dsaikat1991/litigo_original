import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Appointment, Case } from "@/types/database";
import { isoDateDaysFromNow } from "@/lib/dates";

type TypedClient = SupabaseClient<Database>;

export type AppointmentWithCase = Appointment & { case: Pick<Case, "id" | "case_title"> | null };

export function listAppointmentsForCase(supabase: TypedClient, caseId: string) {
  return supabase
    .from("appointments")
    .select("*")
    .eq("case_id", caseId)
    .order("is_done", { ascending: true })
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true, nullsFirst: false });
}

/** Every appointment the advocate has, standalone or case-linked, soonest first. */
export function listAllAppointments(supabase: TypedClient) {
  return supabase
    .from("appointments")
    .select("*, case:cases(id, case_title)")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true, nullsFirst: false })
    .limit(100);
}

/** Not-done appointments on exactly today's date, for the Today page. */
export function listTodaysAppointments(supabase: TypedClient) {
  return supabase
    .from("appointments")
    .select("*, case:cases(id, case_title)")
    .eq("appointment_date", isoDateDaysFromNow(0))
    .order("appointment_time", { ascending: true, nullsFirst: false });
}

/** Not-done appointments with a date within `days` from today — includes overdue. */
export function listUpcomingAppointments(supabase: TypedClient, days: number) {
  return supabase
    .from("appointments")
    .select("*, case:cases(id, case_title)")
    .eq("is_done", false)
    .lte("appointment_date", isoDateDaysFromNow(days))
    .order("appointment_date", { ascending: true });
}

/**
 * Same as `listUpcomingAppointments`, but scoped by an explicit `advocateId`
 * instead of relying on RLS — for the reminder-email cron, which runs on a
 * service-role client with RLS bypassed and must filter per advocate itself.
 */
export function listUpcomingAppointmentsForAdvocate(supabase: TypedClient, advocateId: string, days: number) {
  return supabase
    .from("appointments")
    .select("*, case:cases(id, case_title)")
    .eq("advocate_id", advocateId)
    .eq("is_done", false)
    .lte("appointment_date", isoDateDaysFromNow(days))
    .order("appointment_date", { ascending: true });
}

/**
 * Every appointment with a date set, for the month calendar — mirrors
 * `listUpcomingCases`'s shape (no date bound, since the calendar's
 * prev/next navigation is client-side and needs any month's data on hand).
 */
export function listAppointmentsForCalendar(supabase: TypedClient) {
  return supabase
    .from("appointments")
    .select("id, title, appointment_date, appointment_time, case_id")
    .order("appointment_date", { ascending: true });
}

export type NewAppointmentInput = Omit<
  Database["public"]["Tables"]["appointments"]["Insert"],
  "id" | "created_at" | "is_done" | "completed_at"
>;

export function createAppointment(supabase: TypedClient, input: NewAppointmentInput) {
  return supabase.from("appointments").insert(input);
}

export type AppointmentUpdateInput = Omit<
  Database["public"]["Tables"]["appointments"]["Update"],
  "id" | "advocate_id" | "created_at" | "completed_at"
>;

export function updateAppointment(supabase: TypedClient, id: string, input: AppointmentUpdateInput) {
  return supabase.from("appointments").update(input).eq("id", id);
}

export function deleteAppointment(supabase: TypedClient, id: string) {
  return supabase.from("appointments").delete().eq("id", id);
}
