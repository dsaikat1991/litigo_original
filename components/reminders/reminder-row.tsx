import Link from "next/link";
import { daysAwayLabel, daysAwayStyle } from "@/lib/dates";
import type { ReminderItem } from "@/lib/reminders";

const KIND_LABELS: Record<ReminderItem["kind"], string> = {
  hearing: "Hearing — ",
  limitation: "Limitation — ",
  appointment: "Appointment — ",
  task: "Task — ",
};

export function ReminderRow({ item }: { item: ReminderItem }) {
  return (
    <Link
      href={item.caseId ? `/cases/${item.caseId}` : "/appointments"}
      className="flex items-center justify-between gap-3 border-b border-gray-100 px-3 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-gray-50"
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-gray-900">
          {item.isCritical && (
            <span className="mr-1.5 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Critical
            </span>
          )}
          {KIND_LABELS[item.kind]}
          {item.title}
        </p>
        {(item.kind === "task" || item.kind === "appointment") && item.caseId && (
          <p className="truncate text-xs text-gray-500">{item.caseTitle}</p>
        )}
      </div>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(item.date)}`}>
        {daysAwayLabel(item.date)}
      </span>
    </Link>
  );
}
