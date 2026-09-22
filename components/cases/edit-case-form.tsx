"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateCase, deleteCase, type CaseListItem } from "@/lib/data/cases";
import { CASE_TYPES, CASE_STATUSES, type CaseType, type CaseStatus } from "@/lib/constants";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { MultiNameInput } from "@/components/cases/multi-name-input";
import { joinNames, splitNames } from "@/lib/names";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateField } from "@/components/shared/date-field";
import type { Case } from "@/types/database";

const NO_PARENT_CASE = "__none__";

export function EditCaseForm({ caseRow, otherCases }: { caseRow: Case; otherCases: CaseListItem[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [caseTitle, setCaseTitle] = useState(caseRow.case_title);
  const [clientNames, setClientNames] = useState<string[]>(splitNames(caseRow.client_name));
  const [opposingParties, setOpposingParties] = useState<string[]>(splitNames(caseRow.opposing_party));
  const [court, setCourt] = useState(caseRow.court ?? "");
  const [caseNumber, setCaseNumber] = useState(caseRow.case_number ?? "");
  const [cnrNumber, setCnrNumber] = useState(caseRow.cnr_number ?? "");
  const [diaryNumber, setDiaryNumber] = useState(caseRow.diary_number ?? "");
  const [clientPhone, setClientPhone] = useState(caseRow.client_phone ?? "");
  const [clientEmail, setClientEmail] = useState(caseRow.client_email ?? "");
  const [opposingCounsel, setOpposingCounsel] = useState(caseRow.opposing_counsel ?? "");
  const [actSection, setActSection] = useState(caseRow.act_section ?? "");
  const [caseType, setCaseType] = useState<CaseType>(caseRow.case_type);
  const [status, setStatus] = useState<CaseStatus>(caseRow.status);
  const [filingDate, setFilingDate] = useState(caseRow.filing_date ?? "");
  const [limitationDate, setLimitationDate] = useState(caseRow.limitation_date ?? "");
  const [tags, setTags] = useState(caseRow.tags.join(", "));
  const [parentCaseId, setParentCaseId] = useState(caseRow.parent_case_id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await updateCase(supabase, caseRow.id, {
      case_title: caseTitle,
      client_name: joinNames(clientNames),
      opposing_party: joinNames(opposingParties),
      court: court || null,
      case_number: caseNumber || null,
      cnr_number: cnrNumber || null,
      diary_number: diaryNumber || null,
      client_phone: clientPhone || null,
      client_email: clientEmail || null,
      opposing_counsel: opposingCounsel || null,
      act_section: actSection || null,
      case_type: caseType,
      status,
      filing_date: filingDate || null,
      limitation_date: limitationDate || null,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      parent_case_id: parentCaseId || null,
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
          <label className="mb-1 block text-sm font-medium text-gray-700">Cause Title *</label>
          <input
            required
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MultiNameInput label="Client name" values={clientNames} onChange={setClientNames} />
          <MultiNameInput label="Opposing party" values={opposingParties} onChange={setOpposingParties} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Client phone</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Client email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Opposing counsel</label>
            <input
              value={opposingCounsel}
              onChange={(e) => setOpposingCounsel(e.target.value)}
              placeholder="Advocate representing the other side"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Act &amp; section</label>
            <input
              value={actSection}
              onChange={(e) => setActSection(e.target.value)}
              placeholder="e.g. Section 138, Negotiable Instruments Act"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Court</label>
            <input
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Case type</label>
            <Select value={caseType} onValueChange={(value) => setCaseType(value as CaseType)}>
              <SelectTrigger className="capitalize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CASE_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="capitalize">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Case number</label>
            <input
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">CNR number</label>
            <input
              value={cnrNumber}
              onChange={(e) => setCnrNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Diary number</label>
          <input
            value={diaryNumber}
            onChange={(e) => setDiaryNumber(e.target.value)}
            placeholder="Assigned on e-filing, before a case number is issued"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateField
            label="Filing date"
            labelClassName="mb-1 block text-sm font-medium text-gray-700"
            value={filingDate}
            onChange={setFilingDate}
            className="py-2"
          />
          <DateField
            label="Limitation date"
            labelClassName="mb-1 block text-sm font-medium text-gray-700"
            value={limitationDate}
            onChange={setLimitationDate}
            className="py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
          <Select value={status} onValueChange={(value) => setStatus(value as CaseStatus)}>
            <SelectTrigger className="capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CASE_STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Related to an existing case (optional)
          </label>
          <Select
            value={parentCaseId || NO_PARENT_CASE}
            onValueChange={(value) => setParentCaseId(value === NO_PARENT_CASE ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NO_PARENT_CASE}>— None —</SelectItem>
              {otherCases.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.case_title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-1 text-xs text-gray-400">
            Use this for an IA, interim application, appeal, or execution arising from another case.
          </p>
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
