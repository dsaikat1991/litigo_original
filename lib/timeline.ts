import type { Hearing, Note, Task } from "@/types/database";

export type TimelineItem =
  | { id: string; date: string; kind: "hearing"; hearing: Hearing; hearingTasks: Task[] }
  | { id: string; date: string; kind: "task"; task: Task & { completed_at: string } }
  | { id: string; date: string; kind: "note"; note: Note };

/**
 * Merges a case's hearings, completed tasks, and notes into one
 * chronological (most recent first) feed — the "what happened, in order"
 * view. Deliberately excludes research items (reference material the
 * advocate is building up, not case history) and undone tasks (they haven't
 * happened yet, so they're not part of the timeline).
 *
 * Tasks tied to a specific hearing (`hearing_id`, e.g. "tasks before next
 * hearing") are nested under that hearing's entry instead of appearing as
 * their own standalone timeline item, done or not — they're part of that
 * hearing's record, not a separate event.
 */
export function buildTimeline(hearings: Hearing[], tasks: Task[], notes: Note[]): TimelineItem[] {
  const hearingItems: TimelineItem[] = hearings.map((h) => ({
    id: `hearing-${h.id}`,
    date: h.hearing_date,
    kind: "hearing",
    hearing: h,
    hearingTasks: tasks.filter((t) => t.hearing_id === h.id),
  }));

  const taskItems: TimelineItem[] = tasks
    .filter((t): t is Task & { completed_at: string } => t.hearing_id === null && t.is_done && t.completed_at !== null)
    .map((t) => ({ id: `task-${t.id}`, date: t.completed_at, kind: "task", task: t }));

  const noteItems: TimelineItem[] = notes.map((n) => ({
    id: `note-${n.id}`,
    date: n.created_at,
    kind: "note",
    note: n,
  }));

  return [...hearingItems, ...taskItems, ...noteItems].sort((a, b) => b.date.localeCompare(a.date));
}
