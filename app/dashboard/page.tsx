import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listCases } from "@/lib/data/cases";
import { NavBar } from "@/components/layout/nav-bar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: cases } = await listCases(supabase);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Your cases</h1>
          <Link
            href="/cases/new"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + New case
          </Link>
        </div>

        {!cases || cases.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            No cases yet. Add your first one to start your diary.
          </p>
        ) : (
          <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
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
                  <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
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
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
