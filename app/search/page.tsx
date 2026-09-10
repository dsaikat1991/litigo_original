import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { searchAll } from "@/lib/data/search";
import { NavBar } from "@/components/layout/nav-bar";
import { CASE_STATUS_STYLES, NOTE_TYPE_STYLES } from "@/lib/constants";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const supabase = await createClient();
  const results = query ? await searchAll(supabase, query) : null;
  const totalResults = results ? results.cases.length + results.notes.length + results.hearings.length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-6 text-lg font-semibold text-gray-900">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>

        {!query ? (
          <p className="text-sm text-gray-500">
            Use the search box above to find a case, note, learning, or hearing.
          </p>
        ) : totalResults === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            No results for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="space-y-8">
            {results!.cases.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Cases</h2>
                <div className="space-y-2">
                  {results!.cases.map((c) => (
                    <Link
                      key={c.id}
                      href={`/cases/${c.id}`}
                      className="block rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-gray-900">{c.case_title}</span>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[c.status]}`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-gray-500">{c.client_name ?? "—"} · {c.court ?? "—"}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results!.hearings.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Hearings</h2>
                <div className="space-y-2">
                  {results!.hearings.map((h) => (
                    <Link
                      key={h.id}
                      href={`/cases/${h.case_id}`}
                      className="block rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-gray-900">{h.hearing_date}</span>
                        {h.purpose && <span className="text-xs text-gray-500">{h.purpose}</span>}
                      </div>
                      {h.order_notes && <p className="mt-1 text-gray-600">{h.order_notes}</p>}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results!.notes.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Notes &amp; learnings</h2>
                <div className="space-y-2">
                  {results!.notes.map((n) => (
                    <Link
                      key={n.id}
                      href={n.case_id ? `/cases/${n.case_id}` : "#"}
                      className="block rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
                    >
                      <span className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs capitalize ${NOTE_TYPE_STYLES[n.type]}`}>
                        {n.type}
                      </span>
                      <p className="text-gray-700">{n.content}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
