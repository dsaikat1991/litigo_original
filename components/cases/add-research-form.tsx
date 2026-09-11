"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createResearchItem } from "@/lib/data/research";
import { RESEARCH_SOURCE_TYPES, type ResearchSourceType } from "@/lib/constants";

export function AddResearchForm({ caseId }: { caseId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [sourceType, setSourceType] = useState<ResearchSourceType>("other");
  const [citation, setCitation] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
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

    const { error } = await createResearchItem(supabase, {
      advocate_id: user.id,
      case_id: caseId,
      source_type: sourceType,
      citation,
      link: link || null,
      notes: notes || null,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setCitation("");
    setLink("");
    setTags("");
    setNotes("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
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
            placeholder="e.g. Section 138, Negotiable Instruments Act"
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
            placeholder="https://..."
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
          placeholder="Why this is relevant..."
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add research"}
        </button>
      </div>
    </form>
  );
}
