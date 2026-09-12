import type { CaseListItem } from "@/lib/data/cases";
import type { TaskWithCase } from "@/lib/data/tasks";
import { daysAway } from "@/lib/dates";

export type ReminderItem = {
  id: string;
  date: string;
  kind: "hearing" | "task";
  title: string;
  caseId: string;
  caseTitle: string;
};

/** Merges upcoming hearings and task due dates into one date-sorted list for the dashboard. */
export function buildReminders(cases: CaseListItem[], tasks: TaskWithCase[]): ReminderItem[] {
  const hearingItems: ReminderItem[] = cases
    .filter((c): c is CaseListItem & { next_hearing_date: string } => c.next_hearing_date !== null)
    .map((c) => ({
      id: `hearing-${c.id}`,
      date: c.next_hearing_date,
      kind: "hearing",
      title: c.case_title,
      caseId: c.id,
      caseTitle: c.case_title,
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
    }));

  return [...hearingItems, ...taskItems].sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Keeps only reminders the advocate actually wants to see, per their
 * `profiles.reminder_days` preference (the 7/3/1/0-day toggles in Settings).
 * Overdue items are shown whenever the 0-day (same-day) threshold is on,
 * since something overdue is at least as urgent as something due today.
 */
export function filterRemindersByPreference(reminders: ReminderItem[], enabledDays: number[]): ReminderItem[] {
  if (enabledDays.length === 0) return [];
  const thresholds = new Set(enabledDays);

  return reminders.filter((r) => {
    const diff = daysAway(r.date);
    if (diff < 0) return thresholds.has(0);
    return thresholds.has(diff);
  });
}
