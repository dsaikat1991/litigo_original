"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createHearing } from "@/lib/data/hearings";
import type { ChildCase } from "@/lib/data/cases";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10";
const labelClass = "mb-1 block text-xs font-medium text-gray-700";

export function AddHearingForm({ caseId, childCases }: { caseId: string; childCases: ChildCase[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [hearingDate, setHearingDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [argumentsMade, setArgumentsMade] = useState("");
  const [courtDirection, setCourtDirection] = useState("");
  const [documentsFiled, setDocumentsFiled] = useState("");
  const [nextDate, setNextDate] = useState("");

  const [bench, setBench] = useState("");
  const [judge, setJudge] = useState("");
  const [courtroom, setCourtroom] = useState("");
  const [stage, setStage] = useState("");
  const [partiesPresent, setPartiesPresent] = useState("");
  const [advocatesAppearing, setAdvocatesAppearing] = useState("");
  const [applicationCaseId, setApplicationCaseId] = useState("");
  const [courtObservations, setCourtObservations] = useState("");
  const [nextPurpose, setNextPurpose] = useState("");

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

    const { error } = await createHearing(supabase, {
      advocate_id: user.id,
      case_id: caseId,
      hearing_date: hearingDate,
      purpose: purpose || null,
      order_notes: orderNotes || null,
      arguments_made: argumentsMade || null,
      court_direction: courtDirection || null,
      documents_filed: documentsFiled ? documentsFiled.split(",").map((d) => d.trim()).filter(Boolean) : [],
      next_date: nextDate || null,
      bench: bench || null,
      judge: judge || null,
      courtroom: courtroom || null,
      stage: stage || null,
      parties_present: partiesPresent ? partiesPresent.split(",").map((p) => p.trim()).filter(Boolean) : [],
      advocates_appearing: advocatesAppearing
        ? advocatesAppearing.split(",").map((a) => a.trim()).filter(Boolean)
        : [],
      application_case_id: applicationCaseId || null,
      court_observations: courtObservations || null,
      next_purpose: nextPurpose || null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setHearingDate("");
    setPurpose("");
    setOrderNotes("");
    setArgumentsMade("");
    setCourtDirection("");
    setDocumentsFiled("");
    setNextDate("");
    setBench("");
    setJudge("");
    setCourtroom("");
    setStage("");
    setPartiesPresent("");
    setAdvocatesAppearing("");
    setApplicationCaseId("");
    setCourtObservations("");
    setNextPurpose("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Hearing date *</label>
          <input
            type="date"
            required
            value={hearingDate}
            onChange={(e) => setHearingDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Purpose</label>
          <input
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. arguments, evidence, mention"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>What happened / order</label>
        <textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} rows={2} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Arguments made</label>
          <textarea
            value={argumentsMade}
            onChange={(e) => setArgumentsMade(e.target.value)}
            rows={2}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Court direction</label>
          <textarea
            value={courtDirection}
            onChange={(e) => setCourtDirection(e.target.value)}
            rows={2}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Documents filed (comma separated)</label>
          <input value={documentsFiled} onChange={(e) => setDocumentsFiled(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Next date fixed</label>
          <input type="date" value={nextDate} onChange={(e) => setNextDate(e.target.value)} className={inputClass} />
        </div>
      </div>

      <details className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
        <summary className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-900">
          More details (bench, judge, attendance, and more)
        </summary>
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Bench</label>
              <input
                value={bench}
                onChange={(e) => setBench(e.target.value)}
                placeholder="e.g. Division Bench"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Judge</label>
              <input value={judge} onChange={(e) => setJudge(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Courtroom</label>
              <input value={courtroom} onChange={(e) => setCourtroom(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Stage</label>
              <input
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                placeholder="e.g. Evidence, Final arguments"
                className={inputClass}
              />
            </div>
            {childCases.length > 0 && (
              <div>
                <label className={labelClass}>Application heard</label>
                <select
                  value={applicationCaseId}
                  onChange={(e) => setApplicationCaseId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">— None —</option>
                  {childCases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.case_title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Parties present (comma separated)</label>
              <input
                value={partiesPresent}
                onChange={(e) => setPartiesPresent(e.target.value)}
                placeholder="e.g. Plaintiff, Defendant"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Advocates appearing (comma separated)</label>
              <input
                value={advocatesAppearing}
                onChange={(e) => setAdvocatesAppearing(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Court observations</label>
            <textarea
              value={courtObservations}
              onChange={(e) => setCourtObservations(e.target.value)}
              rows={2}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Next purpose</label>
            <input
              value={nextPurpose}
              onChange={(e) => setNextPurpose(e.target.value)}
              placeholder="What the next hearing is for"
              className={inputClass}
            />
          </div>
        </div>
      </details>

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
