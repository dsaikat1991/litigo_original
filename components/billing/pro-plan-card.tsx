"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import type { BillingCycle } from "@/lib/razorpay";

const upgradeButtonClass =
  "flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50";

export function ProPlanCard({ isPro, isLoggedIn }: { isPro: boolean; isLoggedIn: boolean }) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="rounded-lg border-2 border-gray-900 p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Pro</h2>
        <div className="inline-flex rounded-md border border-gray-200 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={`rounded px-2.5 py-1 transition-colors ${
              cycle === "monthly" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("annual")}
            className={`rounded px-2.5 py-1 transition-colors ${
              cycle === "annual" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900">{cycle === "monthly" ? "₹299" : "₹2,999"}</p>
      <p className="mt-1 text-sm text-gray-500">
        {cycle === "monthly" ? "per month" : "per year — 2 months free vs. monthly"}
      </p>

      <ul className="mt-6 space-y-3 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
          Everything in Free
        </li>
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
          <span className="font-medium text-gray-900">Unlimited active cases</span>
        </li>
      </ul>

      <div className="mt-8">
        {isPro ? (
          <p className="rounded-md bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">Current plan</p>
        ) : isLoggedIn ? (
          <UpgradeButton cycle={cycle} className={upgradeButtonClass}>
            Upgrade — {cycle === "monthly" ? "Monthly" : "Annual"}
          </UpgradeButton>
        ) : (
          <Link
            href="/signup"
            className="flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Sign up to upgrade
          </Link>
        )}
      </div>
    </div>
  );
}
