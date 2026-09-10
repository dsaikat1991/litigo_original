import Link from "next/link";
import { daysAwayLabel, daysAwayStyle } from "@/lib/dates";
import type { ReminderItem } from "@/lib/reminders";

export function ReminderRow({ item }: { item: ReminderItem }) {
  return (
    <Link
      href={`/cases/${item.caseId}`}
      className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-gray-900">
          {item.kind === "hearing" ? "Hearing — " : "Task — "}
          {item.title}
        </p>
        {item.kind === "task" && <p className="truncate text-xs text-gray-500">{item.caseTitle}</p>}
      </div>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(item.date)}`}>
        {daysAwayLabel(item.date)}
      </span>
    </Link>
  );
}
