"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateHearing, deleteHearing } from "@/lib/data/hearings";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { HearingTasks } from "@/components/cases/hearing-tasks";
import type { ChildCase } from "@/lib/data/cases";
import type { CaseDocument, Hearing, Task } from "@/types/database";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10";
const labelClass = "mb-1 block text-xs font-medium text-gray-700";

export function HearingItem({
  hearing,
  tasks,
  documents,
  childCases,
}: {
  hearing: Hearing;
  tasks: Task[];
  documents: CaseDocument[];
  childCases: ChildCase[];
}) {
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

  const [bench, setBench] = useState(hearing.bench ?? "");
  const [judge, setJudge] = useState(hearing.judge ?? "");
  const [courtroom, setCourtroom] = useState(hearing.courtroom ?? "");
  const [stage, setStage] = useState(hearing.stage ?? "");
  const [partiesPresent, setPartiesPresent] = useState(hearing.parties_present.join(", "));
  const [advocatesAppearing, setAdvocatesAppearing] = useState(hearing.advocates_appearing.join(", "));
  const [applicationCaseId, setApplicationCaseId] = useState(hearing.application_case_id ?? "");
  const [courtObservations, setCourtObservations] = useState(hearing.court_observations ?? "");
  const [nextPurpose, setNextPurpose] = useState(hearing.next_purpose ?? "");

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);

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

  async function handleViewDocument(doc: CaseDocument) {
    setOpening(doc.id);
    setError(null);

    const { data, error } = await supabase.storage.from("case-documents").createSignedUrl(doc.storage_path, 60);

    if (error || !data) {
      setError(error?.message ?? "Could not open this file.");
      setOpening(null);
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    setOpening(null);
  }

  const applicationCase = childCases.find((c) => c.id === hearing.application_case_id) ?? null;

  if (editing) {
    return (
      <form onSubmit={handleSave} className="space-y-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
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
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} className={inputClass} />
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

        <details className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2" open={Boolean(bench || judge || courtroom || stage || partiesPresent || advocatesAppearing || applicationCaseId || courtObservations || nextPurpose)}>
          <summary className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-900">
            More details (bench, judge, attendance, and more)
          </summary>
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Bench</label>
                <input value={bench} onChange={(e) => setBench(e.target.value)} className={inputClass} />
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
                <input value={stage} onChange={(e) => setStage(e.target.value)} className={inputClass} />
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
              <input value={nextPurpose} onChange={(e) => setNextPurpose(e.target.value)} className={inputClass} />
            </div>
          </div>
        </details>

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

      {(hearing.bench || hearing.judge || hearing.courtroom || hearing.stage) && (
        <p className="mt-1 text-xs text-gray-500">
          {[hearing.stage, hearing.bench, hearing.judge && `Judge: ${hearing.judge}`, hearing.courtroom && `Room ${hearing.courtroom}`]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

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
      {hearing.court_observations && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Court observations</p>
          <p className="mt-0.5 text-gray-600">{hearing.court_observations}</p>
        </div>
      )}
      {applicationCase && (
        <p className="mt-2 text-xs text-gray-500">
          Application heard: <span className="font-medium text-gray-700">{applicationCase.case_title}</span>
        </p>
      )}
      {(hearing.parties_present.length > 0 || hearing.advocates_appearing.length > 0) && (
        <div className="mt-2 flex flex-wrap gap-1">
          {hearing.parties_present.map((p) => (
            <span key={`party-${p}`} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {p}
            </span>
          ))}
          {hearing.advocates_appearing.map((a) => (
            <span key={`adv-${a}`} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
              {a}
            </span>
          ))}
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
      {documents.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Attached documents</p>
          <ul className="mt-1 space-y-1">
            {documents.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => handleViewDocument(d)}
                  disabled={opening === d.id}
                  className="text-sm text-gray-700 hover:underline disabled:opacity-50"
                >
                  {d.file_name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(hearing.next_date || hearing.next_purpose) && (
        <p className="mt-2 text-xs text-gray-400">
          Next date: {hearing.next_date ?? "—"}
          {hearing.next_purpose ? ` — ${hearing.next_purpose}` : ""}
        </p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <HearingTasks caseId={hearing.case_id} hearingId={hearing.id} tasks={tasks} />
    </div>
  );
}
