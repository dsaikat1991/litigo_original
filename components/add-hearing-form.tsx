"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AddHearingForm({ caseId }: { caseId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [hearingDate, setHearingDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [nextDate, setNextDate] = useState("");
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

    const { error } = await supabase.from("hearings").insert({
      advocate_id: user.id,
      case_id: caseId,
      hearing_date: hearingDate,
      purpose: purpose || null,
      order_notes: orderNotes || null,
      next_date: nextDate || null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setHearingDate("");
    setPurpose("");
    setOrderNotes("");
    setNextDate("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-2 gap-3">
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
            placeholder="e.g. arguments, evidence, mention"
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

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add hearing"}
        </button>
      </div>
    </form>
  );
}
