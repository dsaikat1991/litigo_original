"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { listCasesWithHearingWithin } from "@/lib/data/cases";
import { listUpcomingTasks } from "@/lib/data/tasks";

const REMINDER_WINDOW_DAYS = 7;

export function NotificationBell() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    async function loadCount() {
      const [{ data: cases }, { data: tasks }] = await Promise.all([
        listCasesWithHearingWithin(supabase, REMINDER_WINDOW_DAYS),
        listUpcomingTasks(supabase, REMINDER_WINDOW_DAYS),
      ]);

      if (!cancelled) {
        setCount((cases?.length ?? 0) + (tasks?.length ?? 0));
      }
    }

    loadCount();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Link href="/dashboard" className="relative text-gray-500 transition-colors hover:text-gray-900" aria-label="Upcoming reminders">
      <Bell className="h-5 w-5" strokeWidth={1.75} />
      {count !== null && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
