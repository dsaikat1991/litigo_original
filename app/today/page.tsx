import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listTodaysCases } from "@/lib/data/cases";
import { isoDateDaysFromNow, daysAwayLabel, daysAwayStyle } from "@/lib/dates";
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
  const { data: cases } = await listTodaysCases(supabase);
  const items = cases ?? [];

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
          {items.length > 0 && <PrintButton />}
        </div>

        {items.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            Nothing listed for today — you&rsquo;re free and clear.
          </p>
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
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${daysAwayStyle(c.next_hearing_date!)}`}
                    >
                      {daysAwayLabel(c.next_hearing_date!)}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
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
