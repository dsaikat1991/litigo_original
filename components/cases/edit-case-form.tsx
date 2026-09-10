"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateCase, deleteCase } from "@/lib/data/cases";
import { CASE_TYPES, CASE_STATUSES, type CaseType, type CaseStatus } from "@/lib/constants";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import type { Case } from "@/types/database";

export function EditCaseForm({ caseRow }: { caseRow: Case }) {
  const router = useRouter();
  const supabase = createClient();

  const [caseTitle, setCaseTitle] = useState(caseRow.case_title);
  const [clientName, setClientName] = useState(caseRow.client_name ?? "");
  const [opposingParty, setOpposingParty] = useState(caseRow.opposing_party ?? "");
  const [court, setCourt] = useState(caseRow.court ?? "");
  const [caseNumber, setCaseNumber] = useState(caseRow.case_number ?? "");
  const [cnrNumber, setCnrNumber] = useState(caseRow.cnr_number ?? "");
  const [caseType, setCaseType] = useState<CaseType>(caseRow.case_type);
  const [status, setStatus] = useState<CaseStatus>(caseRow.status);
  const [filingDate, setFilingDate] = useState(caseRow.filing_date ?? "");
  const [tags, setTags] = useState(caseRow.tags.join(", "));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await updateCase(supabase, caseRow.id, {
      case_title: caseTitle,
      client_name: clientName || null,
      opposing_party: opposingParty || null,
      court: court || null,
      case_number: caseNumber || null,
      cnr_number: cnrNumber || null,
      case_type: caseType,
      status,
      filing_date: filingDate || null,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push(`/cases/${caseRow.id}`);
    router.refresh();
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);

    const { error } = await deleteCase(supabase, caseRow.id);

    if (error) {
      setError(error.message);
      setDeleting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-md border border-gray-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Case title *</label>
          <input
            required
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Client name</label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Opposing party</label>
            <input
              value={opposingParty}
              onChange={(e) => setOpposingParty(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Court</label>
            <input
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Case type</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value as CaseType)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              {CASE_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Case number</label>
            <input
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">CNR number</label>
            <input
              value={cnrNumber}
              onChange={(e) => setCnrNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Filing date</label>
            <input
              type="date"
              value={filingDate}
              onChange={(e) => setFilingDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CaseStatus)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm capitalize transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              {CASE_STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>

      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <h2 className="mb-1 text-sm font-semibold text-red-900">Danger zone</h2>
        <p className="mb-3 text-sm text-red-700">
          Deleting a case also permanently deletes all of its hearings and notes.
        </p>
        <ConfirmDeleteDialog
          trigger={
            <button
              type="button"
              disabled={deleting}
              className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete case"}
            </button>
          }
          title={`Delete "${caseRow.case_title}"?`}
          description="This also deletes all of its hearings, notes, and tasks. This cannot be undone."
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
