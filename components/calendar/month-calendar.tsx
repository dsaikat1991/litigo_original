"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Case } from "@/types/database";

type UpcomingCase = Pick<Case, "id" | "case_title" | "status" | "next_hearing_date">;

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function MonthCalendar({ cases }: { cases: UpcomingCase[] }) {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const casesByDate = useMemo(() => {
    const map = new Map<string, UpcomingCase[]>();
    for (const c of cases) {
      if (!c.next_hearing_date) continue;
      const list = map.get(c.next_hearing_date) ?? [];
      list.push(c);
      map.set(c.next_hearing_date, list);
    }
    return map;
  }, [cases]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayNumber = i - firstWeekday + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return dayNumber;
  });

  return (
    <div className="rounded-md border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="rounded-md px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100"
        >
          ← Prev
        </button>
        <h2 className="text-sm font-semibold text-gray-900">
          {viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </h2>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="rounded-md px-2 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200 text-center text-xs font-medium text-gray-500">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((dayNumber, i) => {
          if (dayNumber === null) {
            return <div key={i} className="min-h-24 border-b border-r border-gray-100 bg-gray-50/50" />;
          }

          const key = dateKey(year, month, dayNumber);
          const dayCases = casesByDate.get(key) ?? [];
          const isToday =
            year === today.getFullYear() && month === today.getMonth() && dayNumber === today.getDate();

          return (
            <div key={i} className="min-h-24 border-b border-r border-gray-100 p-1.5">
              <span
                className={
                  isToday
                    ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white"
                    : "text-xs text-gray-500"
                }
              >
                {dayNumber}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayCases.slice(0, 2).map((c) => (
                  <Link
                    key={c.id}
                    href={`/cases/${c.id}`}
                    title={c.case_title}
                    className="block truncate rounded bg-gray-100 px-1 py-0.5 text-[11px] text-gray-700 hover:bg-gray-200"
                  >
                    {c.case_title}
                  </Link>
                ))}
                {dayCases.length > 2 && (
                  <span className="block px-1 text-[11px] text-gray-400">+{dayCases.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
