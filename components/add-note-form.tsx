"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NOTE_TYPES = ["note", "learning", "update"] as const;

export function AddNoteForm({ caseId }: { caseId?: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [type, setType] = useState<(typeof NOTE_TYPES)[number]>("note");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
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

    const { error } = await supabase.from("notes").insert({
      advocate_id: user.id,
      case_id: caseId ?? null,
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
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as (typeof NOTE_TYPES)[number])}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm capitalize focus:border-gray-500 focus:outline-none"
          >
            {NOTE_TYPES.map((t) => (
              <option key={t} value={t} className="capitalize">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Write your note..."
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
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
