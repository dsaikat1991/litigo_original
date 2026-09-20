"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { createCase, listCases, type CaseListItem } from "@/lib/data/cases";
import { getProfile } from "@/lib/data/profiles";
import { getSubscription } from "@/lib/data/subscriptions";
import { FREE_CASE_LIMIT, isGrandfathered } from "@/lib/billing";
import { joinNames } from "@/lib/names";
import { CASE_TYPES, type CaseType } from "@/lib/constants";
import { NavBar } from "@/components/layout/nav-bar";
import { MultiNameInput } from "@/components/cases/multi-name-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NO_PARENT_CASE = "__none__";

export default function NewCasePage() {
  const router = useRouter();
  const supabase = createClient();

  const [caseTitle, setCaseTitle] = useState("");
  const [clientNames, setClientNames] = useState<string[]>([""]);
  const [opposingParties, setOpposingParties] = useState<string[]>([""]);
  const [court, setCourt] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [cnrNumber, setCnrNumber] = useState("");
  const [diaryNumber, setDiaryNumber] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [opposingCounsel, setOpposingCounsel] = useState("");
  const [actSection, setActSection] = useState("");
  const [caseType, setCaseType] = useState<CaseType>("other");
  const [filingDate, setFilingDate] = useState("");
  const [limitationDate, setLimitationDate] = useState("");
  const [tags, setTags] = useState("");
  const [parentCaseId, setParentCaseId] = useState("");
  const [otherCases, setOtherCases] = useState<CaseListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);

  useEffect(() => {
    listCases(supabase).then(({ data }) => setOtherCases(data ?? []));

    async function checkLimit() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: cases }, { data: profile }, { data: subscription }] = await Promise.all([
        listCases(supabase),
        getProfile(supabase, user.id),
        getSubscription(supabase, user.id),
      ]);

      const isPro = subscription?.plan === "pro" && subscription?.status === "active";
      const grandfathered = profile ? isGrandfathered(profile.created_at) : false;
      const nonDisposedCount = (cases ?? []).filter((c) => c.status !== "disposed").length;

      setLimitReached(!isPro && !grandfathered && nonDisposedCount >= FREE_CASE_LIMIT);
      setCheckingLimit(false);
    }
    checkLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const { data, error } = await createCase(supabase, {
      advocate_id: user.id,
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
      filing_date: filingDate || null,
      limitation_date: limitationDate || null,
      tags: tags
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      parent_case_id: parentCaseId || null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(`/cases/${data.id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-6 text-lg font-semibold text-gray-900">New case</h1>

        {limitReached && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">
              You&rsquo;ve reached the free plan&rsquo;s {FREE_CASE_LIMIT}-case limit.
            </p>
            <p className="mt-1 text-sm text-amber-800">
              Close out a disposed matter, or{" "}
              <Link href="/pricing" className="font-medium underline">
                upgrade to Litigo Pro
              </Link>{" "}
              for unlimited active cases.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`space-y-4 rounded-md border border-gray-200 bg-white p-6 ${
            limitReached ? "pointer-events-none opacity-50" : ""
          }`}
          aria-disabled={limitReached}
          inert={limitReached || checkingLimit ? true : undefined}
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cause Title *</label>
            <input
              required
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              placeholder="e.g. Sharma vs Verma"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Client email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Act &amp; section</label>
              <input
                value={actSection}
                onChange={(e) => setActSection(e.target.value)}
                placeholder="e.g. Section 138, Negotiable Instruments Act"
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
                placeholder="e.g. Alipore District Court"
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

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Diary number</label>
            <input
              value={diaryNumber}
              onChange={(e) => setDiaryNumber(e.target.value)}
              placeholder="Assigned on e-filing, before a case number is issued"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
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
              <label className="mb-1 block text-sm font-medium text-gray-700">Limitation date</label>
              <input
                type="date"
                value={limitationDate}
                onChange={(e) => setLimitationDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. bail, urgent"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
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
              disabled={loading}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save case"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
