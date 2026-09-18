"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import type { Database } from "@/types/database";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function BillingSection({ subscription }: { subscription: Subscription | null }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelScheduled, setCancelScheduled] = useState(false);

  const isPro = subscription?.plan === "pro" && subscription?.status === "active";

  async function handleCancel() {
    setCancelling(true);
    setError(null);

    const res = await fetch("/api/billing/cancel-subscription", { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      setCancelling(false);
      return;
    }

    setCancelScheduled(true);
    setCancelling(false);
    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-md border border-gray-200 bg-white p-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Billing</h2>
        <p className="mt-1 text-sm text-gray-500">
          {isPro
            ? "You're on Litigo Pro — unlimited active cases."
            : "You're on the free plan — up to 5 active cases."}
        </p>
      </div>

      {isPro && subscription?.current_period_end && (
        <p className="text-sm text-gray-600">
          {cancelScheduled
            ? `Cancellation scheduled — Pro access continues until ${formatDate(subscription.current_period_end)}, then your account reverts to the free plan.`
            : `Renews ${formatDate(subscription.current_period_end)} (${subscription.billing_cycle === "annual" ? "yearly" : "monthly"}).`}
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {isPro && !cancelScheduled ? (
        <ConfirmDeleteDialog
          trigger={
            <button
              type="button"
              disabled={cancelling}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              {cancelling ? "Cancelling..." : "Cancel subscription"}
            </button>
          }
          title="Cancel Litigo Pro?"
          description="You'll keep unlimited active cases until the end of your current billing period. After that, your account reverts to the free plan's 5-case limit."
          confirmLabel="Cancel subscription"
          onConfirm={handleCancel}
        />
      ) : !isPro ? (
        <Link
          href="/pricing"
          className="inline-block rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Upgrade to Pro
        </Link>
      ) : null}
    </div>
  );
}
