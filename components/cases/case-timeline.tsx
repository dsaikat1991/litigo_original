import type { Hearing, Note, Task } from "@/types/database";
import type { TimelineItem } from "@/lib/timeline";
import { NOTE_TYPE_STYLES } from "@/lib/constants";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Formats the calendar-date portion of a date or timestamptz string, with no timezone conversion. */
function formatDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

function dateParts(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-");
  return { day: Number(day), monthYear: `${MONTHS[Number(month) - 1]} ${year}` };
}

export function CaseTimeline({ items }: { items: TimelineItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Nothing recorded yet — hearings, completed tasks, and notes will show up here in order as you add them.
      </p>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute bottom-2 top-2 w-px bg-gray-200 left-[78px]" />
      <ol className="space-y-6">
        {items.map((item) => {
          const { day, monthYear } = dateParts(item.date);
          return (
            <li key={item.id} className="relative flex gap-4">
              <div className="w-14 shrink-0 pt-0.5 text-right">
                <div className="text-base font-bold leading-none text-gray-900">{day}</div>
                <div className="mt-1 text-[11px] leading-none text-gray-400">{monthYear}</div>
              </div>
              <div className="flex w-3 shrink-0 justify-center pt-1.5">
                <span className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-gray-300 bg-white" />
              </div>
              <div className="min-w-0 flex-1 pb-1">
                {item.kind === "hearing" && <HearingEntry hearing={item.hearing} hearingTasks={item.hearingTasks} />}
                {item.kind === "task" && <TaskEntry task={item.task} />}
                {item.kind === "note" && <NoteEntry note={item.note} />}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function HearingEntry({ hearing, hearingTasks }: { hearing: Hearing; hearingTasks: Task[] }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <span className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
        Hearing
      </span>
      {hearing.purpose && <p className="text-sm font-medium text-gray-900">{hearing.purpose}</p>}
      {hearing.order_notes && <p className="mt-1 whitespace-pre-wrap text-sm text-gray-600">{hearing.order_notes}</p>}

      {hearing.arguments_made && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Arguments made</p>
          <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-600">{hearing.arguments_made}</p>
        </div>
      )}
      {hearing.court_direction && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Court direction</p>
          <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-600">{hearing.court_direction}</p>
        </div>
      )}
      {hearing.documents_filed.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Documents filed</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {hearing.documents_filed.map((doc) => (
              <span key={doc} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {doc}
              </span>
            ))}
          </div>
        </div>
      )}
      {hearingTasks.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Tasks before next hearing</p>
          <ul className="mt-1 space-y-1">
            {hearingTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={t.is_done}
                  disabled
                  className="h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-gray-900"
                />
                <span className={t.is_done ? "text-gray-400 line-through" : "text-gray-700"}>{t.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hearing.next_date && (
        <p className="mt-2 text-xs text-gray-500">
          Next hearing: <span className="font-medium text-gray-700">{formatDate(hearing.next_date)}</span>
        </p>
      )}
    </div>
  );
}

function TaskEntry({ task }: { task: Task }) {
  return (
    <div className="rounded-md border border-green-100 bg-green-50/50 p-4">
      <span className="mb-1 inline-block rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
        Task completed
      </span>
      <p className="text-sm text-gray-700 line-through decoration-gray-400">{task.title}</p>
    </div>
  );
}

function NoteEntry({ note }: { note: Note }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <span
        className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${NOTE_TYPE_STYLES[note.type]}`}
      >
        {note.type}
      </span>
      <p className="whitespace-pre-wrap text-sm text-gray-600">{note.content}</p>
    </div>
  );
}
