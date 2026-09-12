"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateHearing, deleteHearing } from "@/lib/data/hearings";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { HearingTasks } from "@/components/cases/hearing-tasks";
import type { Hearing, Task } from "@/types/database";

export function HearingItem({ hearing, tasks }: { hearing: Hearing; tasks: Task[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [editing, setEditing] = useState(false);
  const [hearingDate, setHearingDate] = useState(hearing.hearing_date);
  const [purpose, setPurpose] = useState(hearing.purpose ?? "");
  const [orderNotes, setOrderNotes] = useState(hearing.order_notes ?? "");
  const [argumentsMade, setArgumentsMade] = useState(hearing.arguments_made ?? "");
  const [courtDirection, setCourtDirection] = useState(hearing.court_direction ?? "");
  const [documentsFiled, setDocumentsFiled] = useState(hearing.documents_filed.join(", "));
  const [nextDate, setNextDate] = useState(hearing.next_date ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await updateHearing(supabase, hearing.id, {
      hearing_date: hearingDate,
      purpose: purpose || null,
      order_notes: orderNotes || null,
      arguments_made: argumentsMade || null,
      court_direction: courtDirection || null,
      documents_filed: documentsFiled
        ? documentsFiled.split(",").map((d) => d.trim()).filter(Boolean)
        : [],
      next_date: nextDate || null,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);

    const { error } = await deleteHearing(supabase, hearing.id);

    if (error) {
      setError(error.message);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="space-y-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Hearing date *</label>
            <input
              type="date"
              required
              value={hearingDate}
              onChange={(e) => setHearingDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Purpose</label>
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">What happened / order</label>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Arguments made</label>
            <textarea
              value={argumentsMade}
              onChange={(e) => setArgumentsMade(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Court direction</label>
            <textarea
              value={courtDirection}
              onChange={(e) => setCourtDirection(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Documents filed (comma separated)</label>
            <input
              value={documentsFiled}
              onChange={(e) => setDocumentsFiled(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Next date fixed</label>
            <input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white p-3 text-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{hearing.hearing_date}</span>
          {hearing.purpose && <span className="text-xs text-gray-500">{hearing.purpose}</span>}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs font-medium text-gray-500 hover:text-gray-900"
          >
            Edit
          </button>
          <ConfirmDeleteDialog
            trigger={
              <button
                type="button"
                disabled={deleting}
                className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            }
            title="Delete this hearing entry?"
            description="This cannot be undone."
            onConfirm={handleDelete}
          />
        </div>
      </div>
      {hearing.order_notes && <p className="mt-1 text-gray-600">{hearing.order_notes}</p>}

      {hearing.arguments_made && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Arguments made</p>
          <p className="mt-0.5 text-gray-600">{hearing.arguments_made}</p>
        </div>
      )}
      {hearing.court_direction && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Court direction</p>
          <p className="mt-0.5 text-gray-600">{hearing.court_direction}</p>
        </div>
      )}
      {hearing.documents_filed.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Documents filed</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {hearing.documents_filed.map((doc) => (
              <span key={doc} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {doc}
              </span>
            ))}
          </div>
        </div>
      )}

      {hearing.next_date && <p className="mt-2 text-xs text-gray-400">Next date: {hearing.next_date}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <HearingTasks caseId={hearing.case_id} hearingId={hearing.id} tasks={tasks} />
    </div>
  );
}
