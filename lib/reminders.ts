import type { CaseListItem } from "@/lib/data/cases";
import type { TaskWithCase } from "@/lib/data/tasks";
import type { AppointmentWithCase } from "@/lib/data/appointments";
import { daysAway } from "@/lib/dates";

export type ReminderItem = {
  id: string;
  date: string;
  kind: "hearing" | "task" | "limitation" | "appointment";
  title: string;
  /** Absent for a standalone appointment not linked to any case. */
  caseId?: string;
  caseTitle: string;
  isCritical: boolean;
};

/** Merges upcoming hearings, task due dates, case limitation dates, and appointments into one date-sorted list for the dashboard. */
export function buildReminders(
  cases: CaseListItem[],
  tasks: TaskWithCase[],
  limitationCases: CaseListItem[] = [],
  appointments: AppointmentWithCase[] = [],
): ReminderItem[] {
  const hearingItems: ReminderItem[] = cases
    .filter((c): c is CaseListItem & { next_hearing_date: string } => c.next_hearing_date !== null)
    .map((c) => ({
      id: `hearing-${c.id}`,
      date: c.next_hearing_date,
      kind: "hearing",
      title: c.case_title,
      caseId: c.id,
      caseTitle: c.case_title,
      isCritical: false,
    }));

  const taskItems: ReminderItem[] = tasks
    .filter((t): t is TaskWithCase & { due_date: string } => t.due_date !== null)
    .map((t) => ({
      id: `task-${t.id}`,
      date: t.due_date,
      kind: "task",
      title: t.title,
      caseId: t.case_id,
      caseTitle: t.case?.case_title ?? "—",
      isCritical: t.is_critical,
    }));

  // Limitation dates are inherently critical — missing one can be fatal to the matter.
  const limitationItems: ReminderItem[] = limitationCases
    .filter((c): c is CaseListItem & { limitation_date: string } => c.limitation_date !== null)
    .map((c) => ({
      id: `limitation-${c.id}`,
      date: c.limitation_date,
      kind: "limitation",
      title: c.case_title,
      caseId: c.id,
      caseTitle: c.case_title,
      isCritical: true,
    }));

  const appointmentItems: ReminderItem[] = appointments.map((a) => ({
    id: `appointment-${a.id}`,
    date: a.appointment_date,
    kind: "appointment",
    title: a.title,
    caseId: a.case_id ?? undefined,
    caseTitle: a.case?.case_title ?? "—",
    isCritical: false,
  }));

  return [...hearingItems, ...taskItems, ...limitationItems, ...appointmentItems].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

/**
 * Keeps only reminders the advocate actually wants to see, per their
 * `profiles.reminder_days` preference (the 7/3/1/0-day toggles in Settings).
 * Overdue items are shown whenever the 0-day (same-day) threshold is on,
 * since something overdue is at least as urgent as something due today —
 * except overdue hearings, which are excluded here entirely: they already
 * have a standing, always-visible home in the dashboard's "Overdue — not
 * yet updated" section, so surfacing them here too would just be the same
 * thing twice.
 */
export function filterRemindersByPreference(reminders: ReminderItem[], enabledDays: number[]): ReminderItem[] {
  if (enabledDays.length === 0) return [];
  const thresholds = new Set(enabledDays);

  return reminders.filter((r) => {
    const diff = daysAway(r.date);
    if (diff < 0) return r.kind !== "hearing" && thresholds.has(0);
    return thresholds.has(diff);
  });
}
