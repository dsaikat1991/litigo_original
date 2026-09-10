"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { listCasesWithHearingWithin } from "@/lib/data/cases";
import { listUpcomingTasks } from "@/lib/data/tasks";
import { buildReminders, type ReminderItem } from "@/lib/reminders";
import { ReminderRow } from "@/components/reminders/reminder-row";
import { useClickOutside } from "@/lib/hooks/use-click-outside";

const REMINDER_WINDOW_DAYS = 7;
const DROPDOWN_LIMIT = 5;

export function NotificationBell() {
  const [reminders, setReminders] = useState<ReminderItem[] | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    async function load() {
      const [{ data: cases }, { data: tasks }] = await Promise.all([
        listCasesWithHearingWithin(supabase, REMINDER_WINDOW_DAYS),
        listUpcomingTasks(supabase, REMINDER_WINDOW_DAYS),
      ]);
      if (!cancelled) {
        setReminders(buildReminders(cases ?? [], tasks ?? []));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useClickOutside(containerRef, open, () => setOpen(false));

  const count = reminders?.length ?? 0;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative cursor-pointer text-gray-500 transition-colors hover:text-gray-900"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" strokeWidth={1.75} />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium leading-none text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
          <p className="mb-2 text-xs font-semibold text-gray-900">Upcoming</p>

          {reminders === null ? (
            <p className="py-4 text-center text-sm text-gray-500">Loading...</p>
          ) : reminders.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">You&rsquo;re all caught up.</p>
          ) : (
            <div className="space-y-2">
              {reminders.slice(0, DROPDOWN_LIMIT).map((r) => (
                <ReminderRow key={r.id} item={r} />
              ))}
            </div>
          )}

          <div className="mt-3 flex justify-center border-t border-gray-100 pt-3">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="rounded-md border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
