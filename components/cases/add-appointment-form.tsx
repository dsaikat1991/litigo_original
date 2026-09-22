"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createAppointment } from "@/lib/data/appointments";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateField } from "@/components/shared/date-field";
import type { CaseListItem } from "@/lib/data/cases";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10";
const labelClass = "mb-1 block text-xs font-medium text-gray-700";
const NO_LINKED_CASE = "__none__";

export function AddAppointmentForm({ caseId, cases }: { caseId?: string; cases?: CaseListItem[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [linkedCaseId, setLinkedCaseId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("Date is required.");
      return;
    }
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

    const { error } = await createAppointment(supabase, {
      advocate_id: user.id,
      case_id: caseId ?? (linkedCaseId || null),
      title,
      appointment_date: date,
      appointment_time: time || null,
      location: location || null,
      notes: notes || null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setNotes("");
    setLinkedCaseId("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Conference with client"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Chamber, client's office, video call"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DateField label="Date" labelClassName={labelClass} value={date} onChange={setDate} clearable={false} />
        <div>
          <label className={labelClass}>Time (optional)</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
        </div>
      </div>

      {caseId === undefined && cases && cases.length > 0 && (
        <div>
          <label className={labelClass}>Case (optional)</label>
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
        <label className={labelClass}>Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Anything to remember before this one..."
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add appointment"}
        </button>
      </div>
    </form>
  );
}
