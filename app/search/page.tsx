import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { searchAll } from "@/lib/data/search";
import { listAllTags } from "@/lib/data/tags";
import { NavBar } from "@/components/layout/nav-bar";
import { CASE_STATUS_STYLES, NOTE_TYPE_STYLES, RESEARCH_SOURCE_TYPE_STYLES } from "@/lib/constants";

export const metadata: Metadata = { title: "Search" };

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; from?: string; to?: string; tags?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const dateFrom = params.from?.trim() || undefined;
  const dateTo = params.to?.trim() || undefined;
  const selectedTags = toArray(params.tags);

  const hasFilters = Boolean(query || dateFrom || dateTo || selectedTags.length > 0);

  const supabase = await createClient();
  const [results, availableTags] = await Promise.all([
    hasFilters
      ? searchAll(supabase, { query, dateFrom, dateTo, tags: selectedTags })
      : Promise.resolve(null),
    listAllTags(supabase),
  ]);

  const totalResults = results
    ? results.cases.length +
      results.notes.length +
      results.hearings.length +
      results.tasks.length +
      results.research.length +
      results.documents.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-6 text-lg font-semibold text-gray-900">Search</h1>

        <form
          action="/search"
          className="mb-6 space-y-3 rounded-md border border-gray-200 bg-white p-4"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Keyword</label>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search cases, notes, hearings..."
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">From date</label>
              <input
                type="date"
                name="from"
                defaultValue={dateFrom}
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">To date</label>
              <input
                type="date"
                name="to"
                defaultValue={dateTo}
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>

          {availableTags.length > 0 && (
            <div>
              <span className="mb-1 block text-xs font-medium text-gray-700">Tags</span>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="tags"
                      value={tag}
                      defaultChecked={selectedTags.includes(tag)}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
            <Link href="/search" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Clear filters
            </Link>
            <button
              type="submit"
              className="rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </form>

        {!hasFilters ? (
          <p className="text-sm text-gray-500">
            Use the keyword box, a date range, or tags above to find a case, note, learning, or hearing.
          </p>
        ) : totalResults === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            No results match these filters.
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

            {results!.tasks.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Tasks</h2>
                <div className="space-y-2">
                  {results!.tasks.map((t) => (
                    <Link
                      key={t.id}
                      href={`/cases/${t.case_id}`}
                      className="block rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={t.is_done ? "text-gray-400 line-through" : "text-gray-900"}>{t.title}</span>
                        {t.due_date && <span className="shrink-0 text-xs text-gray-500">Due {t.due_date}</span>}
                      </div>
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
                      {n.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {n.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results!.research.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Research</h2>
                <div className="space-y-2">
                  {results!.research.map((r) => (
                    <Link
                      key={r.id}
                      href={`/cases/${r.case_id}`}
                      className="block rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
                    >
                      <span className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs capitalize ${RESEARCH_SOURCE_TYPE_STYLES[r.source_type]}`}>
                        {r.source_type}
                      </span>
                      <p className="font-medium text-gray-900">{r.citation}</p>
                      {r.notes && <p className="mt-0.5 text-gray-600">{r.notes}</p>}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results!.documents.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Documents</h2>
                <div className="space-y-2">
                  {results!.documents.map((d) => (
                    <Link
                      key={d.id}
                      href={`/cases/${d.case_id}`}
                      className="block rounded-md border border-gray-200 bg-white p-3 text-sm transition-colors hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{d.file_name}</span>
                      <p className="mt-0.5 text-gray-500">{d.created_at.slice(0, 10)}</p>
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
