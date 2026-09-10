import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listCases, listCasesWithHearingWithin } from "@/lib/data/cases";
import { listUpcomingTasks } from "@/lib/data/tasks";
import { buildReminders } from "@/lib/reminders";
import { NavBar } from "@/components/layout/nav-bar";
import { ReminderRow } from "@/components/reminders/reminder-row";
import { CASE_STATUS_STYLES } from "@/lib/constants";

export const metadata: Metadata = { title: "Cases" };

const REMINDER_WINDOW_DAYS = 7;

export default async function DashboardPage() {
  const supabase = await createClient();
  const [{ data: cases }, { data: reminderCases }, { data: reminderTasks }] = await Promise.all([
    listCases(supabase),
    listCasesWithHearingWithin(supabase, REMINDER_WINDOW_DAYS),
    listUpcomingTasks(supabase, REMINDER_WINDOW_DAYS),
  ]);

  const reminders = buildReminders(reminderCases ?? [], reminderTasks ?? []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="mx-auto max-w-4xl px-6 py-8">
        {reminders.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                Upcoming in the next {REMINDER_WINDOW_DAYS} days
              </h2>
              <Link href="/notifications" className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900">
                View all
              </Link>
            </div>
            <div className="space-y-2">
              {reminders.map((r) => (
                <ReminderRow key={r.id} item={r} />
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Your cases</h1>
          <Link
            href="/cases/new"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            + New case
          </Link>
        </div>

        {!cases || cases.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            No cases yet. Add your first one to start your diary.
          </p>
        ) : (
          <>
            {/* Card list — small screens */}
            <div className="space-y-2 md:hidden">
              {cases.map((c) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.id}`}
                  className="block rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <span className="font-medium text-gray-900">{c.case_title}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{c.client_name ?? "—"} · {c.court ?? "—"}</p>
                  <p className="mt-1 text-sm text-gray-500">Next date: {c.next_hearing_date ?? "—"}</p>
                </Link>
              ))}
            </div>

            {/* Table — medium screens and up */}
            <div className="hidden overflow-hidden rounded-md border border-gray-200 bg-white md:block">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
                  <tr>
                    <th className="px-4 py-2 font-medium">Case</th>
                    <th className="px-4 py-2 font-medium">Client</th>
                    <th className="px-4 py-2 font-medium">Court</th>
                    <th className="px-4 py-2 font-medium">Next date</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c) => (
                    <tr key={c.id} className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link href={`/cases/${c.id}`} className="font-medium text-gray-900 hover:underline">
                          {c.case_title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.client_name ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{c.court ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {c.next_hearing_date ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
