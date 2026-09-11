"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateResearchItem, deleteResearchItem } from "@/lib/data/research";
import { RESEARCH_SOURCE_TYPES, RESEARCH_SOURCE_TYPE_STYLES, type ResearchSourceType } from "@/lib/constants";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import type { ResearchItem as ResearchItemType } from "@/types/database";

export function ResearchItem({ item }: { item: ResearchItemType }) {
  const router = useRouter();
  const supabase = createClient();

  const [editing, setEditing] = useState(false);
  const [sourceType, setSourceType] = useState<ResearchSourceType>(item.source_type);
  const [citation, setCitation] = useState(item.citation);
  const [link, setLink] = useState(item.link ?? "");
  const [tags, setTags] = useState(item.tags.join(", "));
  const [notes, setNotes] = useState(item.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await updateResearchItem(supabase, item.id, {
      source_type: sourceType,
      citation,
      link: link || null,
      notes: notes || null,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
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
    const { error } = await deleteResearchItem(supabase, item.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="space-y-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Source type</label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as ResearchSourceType)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm capitalize transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              {RESEARCH_SOURCE_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Citation</label>
            <input
              required
              value={citation}
              onChange={(e) => setCitation(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
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
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs capitalize ${RESEARCH_SOURCE_TYPE_STYLES[item.source_type]}`}>
          {item.source_type}
        </span>
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
              <button type="button" className="text-xs font-medium text-red-600 hover:text-red-800">
                Delete
              </button>
            }
            title="Delete this research item?"
            description="This cannot be undone."
            onConfirm={handleDelete}
          />
        </div>
      </div>
      <p className="mt-1 font-medium text-gray-900">{item.citation}</p>
      {item.notes && <p className="mt-1 text-gray-600">{item.notes}</p>}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block break-all text-xs text-blue-600 underline hover:text-blue-800"
        >
          {item.link}
        </a>
      )}
      {item.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
