import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listCases, listCasesWithHearingWithin, listCasesWithLimitationWithin, listOverdueCases } from "@/lib/data/cases";
import { listUpcomingTasks, listOpenCriticalTasks } from "@/lib/data/tasks";
import { getProfile } from "@/lib/data/profiles";
import { buildReminders, filterRemindersByPreference } from "@/lib/reminders";
import { daysAway, daysAwayLabel, daysAwayStyle } from "@/lib/dates";
import { NavBar } from "@/components/layout/nav-bar";
import { ReminderRow } from "@/components/reminders/reminder-row";
import { CASE_STATUS_STYLES } from "@/lib/constants";

export const metadata: Metadata = { title: "Cases" };

const REMINDER_WINDOW_DAYS = 7;

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { data: cases },
    { data: reminderCases },
    { data: reminderTasks },
    { data: reminderLimitationCases },
    { data: overdueCases },
    { data: profile },
    { data: criticalTasks },
  ] = await Promise.all([
    listCases(supabase),
    listCasesWithHearingWithin(supabase, REMINDER_WINDOW_DAYS),
    listUpcomingTasks(supabase, REMINDER_WINDOW_DAYS),
    listCasesWithLimitationWithin(supabase, REMINDER_WINDOW_DAYS),
    listOverdueCases(supabase),
    user ? getProfile(supabase, user.id) : Promise.resolve({ data: null }),
    listOpenCriticalTasks(supabase),
  ]);

  const reminders = filterRemindersByPreference(
    buildReminders(reminderCases ?? [], reminderTasks ?? [], reminderLimitationCases ?? []),
    profile?.reminder_days ?? [7, 3, 1, 0],
  );

  const activeCount = (cases ?? []).filter((c) => c.status === "active").length;
  const criticalCount = criticalTasks?.length ?? 0;

  const stats = [
    { label: "Active cases", value: activeCount, critical: false },
    { label: "Hearings this week", value: (reminderCases ?? []).length, critical: false },
    { label: "Tasks due this week", value: (reminderTasks ?? []).length, critical: false },
    { label: "Critical deadlines open", value: criticalCount, critical: criticalCount > 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-md border p-4 ${s.critical ? "border-red-200 bg-red-50/40" : "border-gray-200 bg-white"}`}
            >
              <p className={`text-2xl font-semibold ${s.critical ? "text-red-700" : "text-gray-900"}`}>{s.value}</p>
              <p className="mt-1 text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {overdueCases && overdueCases.length > 0 && (
          <div className="mb-8">
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Overdue — not yet updated</h2>
              <p className="text-xs text-gray-500">
                These hearings have passed. Log what happened and set the next date to clear them from this list.
              </p>
            </div>
            <div className="space-y-2">
              {overdueCases.map((c) => {
                const days = Math.abs(daysAway(c.next_hearing_date!));
                return (
                  <Link
                    key={c.id}
                    href={`/cases/${c.id}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50/40 p-3 text-sm transition-colors hover:bg-red-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900">{c.case_title}</p>
                      <p className="truncate text-xs text-gray-500">
                        {c.client_name ?? "—"} · {c.court ?? "—"}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      {days} {days === 1 ? "day" : "days"} overdue
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

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
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{c.case_title}</span>
                      <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-500">
                        {c.case_type}
                      </span>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{c.client_name ?? "—"} · {c.court ?? "—"}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-sm text-gray-500">{c.next_hearing_date ?? "—"}</span>
                    {c.next_hearing_date && (
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(c.next_hearing_date)}`}>
                        {daysAwayLabel(c.next_hearing_date)}
                      </span>
                    )}
                  </div>
                  {c.limitation_date && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-xs text-red-700">Limitation:</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(c.limitation_date)}`}>
                        {daysAwayLabel(c.limitation_date)}
                      </span>
                    </div>
                  )}
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
                        <div className="flex items-center gap-2">
                          <Link href={`/cases/${c.id}`} className="font-medium text-gray-900 hover:underline">
                            {c.case_title}
                          </Link>
                          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-500">
                            {c.case_type}
                          </span>
                          {c.limitation_date && (
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(c.limitation_date)}`}>
                              Limitation: {daysAwayLabel(c.limitation_date)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.client_name ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{c.court ?? "—"}</td>
                      <td className="px-4 py-3">
                        {c.next_hearing_date ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">{c.next_hearing_date}</span>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(c.next_hearing_date)}`}>
                              {daysAwayLabel(c.next_hearing_date)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
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
