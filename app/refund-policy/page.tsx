import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Refund & Cancellation Policy" };

export default function RefundPolicyPage() {
  return (
    <InfoPage
      title="Refund & Cancellation Policy"
      disclaimer="Draft placeholder — not yet reviewed by a lawyer. Do not rely on this as a complete or binding policy."
    >
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">No paid plans yet</h2>
        <p>
          Litigo is currently free to use — there are no paid plans, subscriptions, or charges, so there is
          nothing to refund or cancel.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">If that changes</h2>
        <p>This policy will be updated with real refund and cancellation terms before any paid plan launches.</p>
      </section>
    </InfoPage>
  );
}
