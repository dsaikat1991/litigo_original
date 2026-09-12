import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listCasesWithHearingWithin } from "@/lib/data/cases";
import { listUpcomingTasks } from "@/lib/data/tasks";
import { getProfile } from "@/lib/data/profiles";
import { buildReminders, filterRemindersByPreference } from "@/lib/reminders";
import { NavBar } from "@/components/layout/nav-bar";
import { ReminderRow } from "@/components/reminders/reminder-row";

export const metadata: Metadata = { title: "Notifications" };

const REMINDER_WINDOW_DAYS = 7;

export default async function NotificationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: reminderCases }, { data: reminderTasks }, { data: profile }] = await Promise.all([
    listCasesWithHearingWithin(supabase, REMINDER_WINDOW_DAYS),
    listUpcomingTasks(supabase, REMINDER_WINDOW_DAYS),
    user ? getProfile(supabase, user.id) : Promise.resolve({ data: null }),
  ]);

  const reminders = filterRemindersByPreference(
    buildReminders(reminderCases ?? [], reminderTasks ?? []),
    profile?.reminder_days ?? [7, 3, 1, 0],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-1 text-lg font-semibold text-gray-900">Notifications</h1>
        <p className="mb-6 text-sm text-gray-500">
          Every hearing and task due in the next {REMINDER_WINDOW_DAYS} days, including anything overdue.
        </p>

        {reminders.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            Nothing due soon — you&rsquo;re all caught up.
          </p>
        ) : (
          <div className="space-y-2">
            {reminders.map((r) => (
              <ReminderRow key={r.id} item={r} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
