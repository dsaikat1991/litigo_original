"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createNote } from "@/lib/data/notes";
import { NOTE_TYPES, type NoteType } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CaseListItem } from "@/lib/data/cases";

const NO_LINKED_CASE = "__none__";

export function AddNoteForm({ caseId, cases }: { caseId?: string; cases?: CaseListItem[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [type, setType] = useState<NoteType>("note");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [linkedCaseId, setLinkedCaseId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      setLoading(false);
      return;
    }

    const { error } = await createNote(supabase, {
      advocate_id: user.id,
      case_id: caseId ?? (linkedCaseId || null),
      type,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setContent("");
    setTags("");
    setLinkedCaseId("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Type</label>
          <Select value={type} onValueChange={(value) => setType(value as NoteType)}>
            <SelectTrigger className="w-auto py-1.5 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NOTE_TYPES.map((t) => (
                <SelectItem key={t} value={t} className="capitalize">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
      </div>

      {caseId === undefined && cases && cases.length > 0 && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Case (optional)</label>
          <Select
            value={linkedCaseId || NO_LINKED_CASE}
            onValueChange={(value) => setLinkedCaseId(value === NO_LINKED_CASE ? "" : value)}
          >
            <SelectTrigger className="py-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NO_LINKED_CASE}>— None —</SelectItem>
              {cases.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.case_title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Write your note..."
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add note"}
        </button>
      </div>
    </form>
  );
}
