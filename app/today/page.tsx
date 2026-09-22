import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listTodaysCases } from "@/lib/data/cases";
import { listTodaysAppointments, type AppointmentWithCase } from "@/lib/data/appointments";
import { isoDateDaysFromNow, formatTime12h } from "@/lib/dates";
import { NavBar } from "@/components/layout/nav-bar";
import { PrintButton } from "@/components/shared/print-button";
import { CASE_STATUS_STYLES } from "@/lib/constants";

export const metadata: Metadata = { title: "Today's cause list" };

function formatLongDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function TodayPage() {
  const supabase = await createClient();
  const [{ data: cases }, { data: appointmentsData }] = await Promise.all([
    listTodaysCases(supabase),
    listTodaysAppointments(supabase),
  ]);
  const items = cases ?? [];
  const appointments = (appointmentsData ?? []) as AppointmentWithCase[];

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="print:hidden">
        <NavBar />
      </div>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Today&rsquo;s cause list</h1>
            <p className="text-sm text-gray-500">{formatLongDate(isoDateDaysFromNow(0))}</p>
          </div>
          {(items.length > 0 || appointments.length > 0) && <PrintButton />}
        </div>

        {appointments.length > 0 && (
          <div className="mb-6 space-y-2">
            <h2 className="text-xs font-medium uppercase tracking-wide text-gray-400">Today&rsquo;s appointments</h2>
            {appointments.map((a) => (
              <Link
                key={a.id}
                href={a.case_id ? `/cases/${a.case_id}` : "/appointments"}
                className="block rounded-md border border-blue-100 bg-blue-50/50 p-3 text-sm transition-colors hover:bg-blue-50 print:break-inside-avoid print:hover:bg-blue-50/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={a.is_done ? "text-gray-400 line-through" : "font-medium text-gray-900"}>
                    {a.title}
                  </span>
                  {a.appointment_time && (
                    <span className="shrink-0 text-xs text-gray-500">{formatTime12h(a.appointment_time)}</span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  {a.case?.case_title ?? "—"}
                  {a.location ? ` · ${a.location}` : ""}
                </p>
              </Link>
            ))}
          </div>
        )}

        {items.length === 0 ? (
          appointments.length === 0 && (
            <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
              Nothing listed for today — you&rsquo;re free and clear.
            </p>
          )
        ) : (
          <div className="space-y-3">
            {items.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="block rounded-md border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 print:break-inside-avoid print:hover:bg-white"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="font-medium text-gray-900">{c.case_title}</h2>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm text-gray-600 sm:grid-cols-2">
                  <div>
                    <dt className="inline text-gray-400">Client: </dt>
                    <dd className="inline">{c.client_name ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline text-gray-400">Opposing party: </dt>
                    <dd className="inline">{c.opposing_party ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline text-gray-400">Court: </dt>
                    <dd className="inline">{c.court ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline text-gray-400">Case type: </dt>
                    <dd className="inline capitalize">{c.case_type}</dd>
                  </div>
                  <div>
                    <dt className="inline text-gray-400">Case number: </dt>
                    <dd className="inline">{c.case_number ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline text-gray-400">CNR number: </dt>
                    <dd className="inline">{c.cnr_number ?? "—"}</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
