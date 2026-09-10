import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavBar } from "@/components/nav-bar";
import { AddHearingForm } from "@/components/add-hearing-form";
import { AddNoteForm } from "@/components/add-note-form";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*")
    .eq("id", id)
    .single();

  if (!caseRow) {
    notFound();
  }

  const { data: hearings } = await supabase
    .from("hearings")
    .select("*")
    .eq("case_id", id)
    .order("hearing_date", { ascending: false });

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .eq("case_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 rounded-md border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-start justify-between">
            <h1 className="text-lg font-semibold text-gray-900">{caseRow.case_title}</h1>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700">
              {caseRow.status}
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
            <div><dt className="inline text-gray-400">Client: </dt><dd className="inline">{caseRow.client_name ?? "—"}</dd></div>
            <div><dt className="inline text-gray-400">Opposing party: </dt><dd className="inline">{caseRow.opposing_party ?? "—"}</dd></div>
            <div><dt className="inline text-gray-400">Court: </dt><dd className="inline">{caseRow.court ?? "—"}</dd></div>
            <div><dt className="inline text-gray-400">Case type: </dt><dd className="inline capitalize">{caseRow.case_type}</dd></div>
            <div><dt className="inline text-gray-400">Case number: </dt><dd className="inline">{caseRow.case_number ?? "—"}</dd></div>
            <div><dt className="inline text-gray-400">CNR number: </dt><dd className="inline">{caseRow.cnr_number ?? "—"}</dd></div>
            <div><dt className="inline text-gray-400">Filing date: </dt><dd className="inline">{caseRow.filing_date ?? "—"}</dd></div>
            <div><dt className="inline text-gray-400">Next hearing: </dt><dd className="inline font-medium text-gray-900">{caseRow.next_hearing_date ?? "—"}</dd></div>
          </dl>
          {caseRow.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {caseRow.tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Hearings</h2>
          <div className="mb-4">
            <AddHearingForm caseId={id} />
          </div>
          <div className="space-y-2">
            {!hearings || hearings.length === 0 ? (
              <p className="text-sm text-gray-500">No hearings logged yet.</p>
            ) : (
              hearings.map((h) => (
                <div key={h.id} className="rounded-md border border-gray-200 bg-white p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{h.hearing_date}</span>
                    {h.purpose && <span className="text-xs text-gray-500">{h.purpose}</span>}
                  </div>
                  {h.order_notes && <p className="mt-1 text-gray-600">{h.order_notes}</p>}
                  {h.next_date && (
                    <p className="mt-1 text-xs text-gray-400">Next date: {h.next_date}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Notes & learnings</h2>
          <div className="mb-4">
            <AddNoteForm caseId={id} />
          </div>
          <div className="space-y-2">
            {!notes || notes.length === 0 ? (
              <p className="text-sm text-gray-500">No notes yet.</p>
            ) : (
              notes.map((n) => (
                <div key={n.id} className="rounded-md border border-gray-200 bg-white p-3 text-sm">
                  <span className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700">
                    {n.type}
                  </span>
                  <p className="text-gray-700">{n.content}</p>
                  {n.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {n.tags.map((tag: string) => (
                        <span key={tag} className="rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
