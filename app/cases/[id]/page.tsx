import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCase } from "@/lib/data/cases";
import { listHearingsForCase } from "@/lib/data/hearings";
import { listNotesForCase } from "@/lib/data/notes";
import { listTasksForCase } from "@/lib/data/tasks";
import { NavBar } from "@/components/layout/nav-bar";
import { AddHearingForm } from "@/components/cases/add-hearing-form";
import { AddNoteForm } from "@/components/cases/add-note-form";
import { AddTaskForm } from "@/components/cases/add-task-form";
import { HearingItem } from "@/components/cases/hearing-item";
import { NoteItem } from "@/components/cases/note-item";
import { TaskItem } from "@/components/cases/task-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CASE_STATUS_STYLES } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("cases").select("case_title").eq("id", id).single();
  return { title: data?.case_title ?? "Case" };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: caseRow } = await getCase(supabase, id);

  if (!caseRow) {
    notFound();
  }

  const [{ data: hearings }, { data: notes }, { data: tasks }] = await Promise.all([
    listHearingsForCase(supabase, id),
    listNotesForCase(supabase, id),
    listTasksForCase(supabase, id),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 rounded-md border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-start justify-between">
            <h1 className="text-lg font-semibold text-gray-900">{caseRow.case_title}</h1>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${CASE_STATUS_STYLES[caseRow.status]}`}>
                {caseRow.status}
              </span>
              <Link
                href={`/cases/${id}/edit`}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Edit
              </Link>
            </div>
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
          {caseRow.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {caseRow.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <Tabs defaultValue="tasks">
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tasks{tasks && tasks.length > 0 ? ` · ${tasks.length}` : ""}</TabsTrigger>
            <TabsTrigger value="hearings">Hearings{hearings && hearings.length > 0 ? ` · ${hearings.length}` : ""}</TabsTrigger>
            <TabsTrigger value="notes">Notes &amp; learnings{notes && notes.length > 0 ? ` · ${notes.length}` : ""}</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <div className="mb-4">
              <AddTaskForm caseId={id} />
            </div>
            <div className="space-y-2">
              {!tasks || tasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks yet.</p>
              ) : (
                tasks.map((t) => <TaskItem key={t.id} task={t} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="hearings">
            <div className="mb-4">
              <AddHearingForm caseId={id} />
            </div>
            <div className="space-y-2">
              {!hearings || hearings.length === 0 ? (
                <p className="text-sm text-gray-500">No hearings logged yet.</p>
              ) : (
                hearings.map((h) => <HearingItem key={h.id} hearing={h} />)
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="mb-4">
              <AddNoteForm caseId={id} />
            </div>
            <div className="space-y-2">
              {!notes || notes.length === 0 ? (
                <p className="text-sm text-gray-500">No notes yet.</p>
              ) : (
                notes.map((n) => <NoteItem key={n.id} note={n} />)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
