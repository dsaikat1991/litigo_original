/**
 * Mirrors the enforcement in migration 0017 (`enforce_case_limit()`), which is
 * the actual hard boundary — case creation goes straight from the browser to
 * Supabase, so this file exists purely for UX (showing an upgrade prompt
 * before a submission would fail), not as the security boundary itself.
 */
export const FREE_CASE_LIMIT = 5;

/** Accounts created before this are grandfathered with no case limit — keep in sync with the migration. */
export const CASE_LIMIT_GRANDFATHER_CUTOFF = "2026-09-18T00:00:00Z";

export function isGrandfathered(advocateCreatedAt: string): boolean {
  return new Date(advocateCreatedAt) < new Date(CASE_LIMIT_GRANDFATHER_CUTOFF);
}

export const PLAN_PRICING = {
  monthly: { amountLabel: "₹299/month" },
  annual: { amountLabel: "₹2,999/year" },
} as const;
