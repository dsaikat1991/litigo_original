import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listAllNotes, type NoteWithCase } from "@/lib/data/notes";
import { NavBar } from "@/components/layout/nav-bar";
import { AddNoteForm } from "@/components/cases/add-note-form";
import { NoteItem } from "@/components/cases/note-item";

export const metadata: Metadata = { title: "Notes" };

export default async function NotesPage() {
  const supabase = await createClient();
  const { data } = await listAllNotes(supabase);
  const notes = (data ?? []) as NoteWithCase[];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-1 text-lg font-semibold text-gray-900">Notes</h1>
        <p className="mb-6 text-sm text-gray-500">
          Everything you&rsquo;ve jotted down — from a hearing, a government office visit, or
          anywhere else. Not every note needs to belong to a case.
        </p>

        <div className="mb-6">
          <AddNoteForm />
        </div>

        <div className="space-y-2">
          {notes.length === 0 ? (
            <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
              No notes yet. Jot something down above.
            </p>
          ) : (
            notes.map((n) => <NoteItem key={n.id} note={n} linkedCase={n.case} />)
          )}
        </div>
      </main>
    </div>
  );
}
