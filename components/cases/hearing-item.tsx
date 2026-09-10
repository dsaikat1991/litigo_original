"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateHearing, deleteHearing } from "@/lib/data/hearings";
import type { Hearing } from "@/types/database";

export function HearingItem({ hearing }: { hearing: Hearing }) {
  const router = useRouter();
  const supabase = createClient();

  const [editing, setEditing] = useState(false);
  const [hearingDate, setHearingDate] = useState(hearing.hearing_date);
  const [purpose, setPurpose] = useState(hearing.purpose ?? "");
  const [orderNotes, setOrderNotes] = useState(hearing.order_notes ?? "");
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
    const confirmed = window.confirm("Delete this hearing entry? This cannot be undone.");
    if (!confirmed) return;

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
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Purpose</label>
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">What happened / order</label>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Next date fixed</label>
          <input
            type="date"
            value={nextDate}
            onChange={(e) => setNextDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
          />
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
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      {hearing.order_notes && <p className="mt-1 text-gray-600">{hearing.order_notes}</p>}
      {hearing.next_date && (
        <p className="mt-1 text-xs text-gray-400">Next date: {hearing.next_date}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
