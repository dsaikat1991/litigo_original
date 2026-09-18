import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How cancellation and refunds work for Litigo Pro — cancel anytime, plus a 7-day money-back guarantee for first-time subscribers.",
};

export default function RefundPolicyPage() {
  return (
    <InfoPage
      title="Refund & Cancellation Policy"
      disclaimer="Draft — reflects the actual billing terms, but hasn't had a separate legal review pass yet."
    >
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">The free plan</h2>
        <p>
          Litigo&rsquo;s free plan has no charges of any kind, so there is nothing to refund or cancel on it.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Cancelling Litigo Pro</h2>
        <p>
          You can cancel your Litigo Pro subscription at any time from Settings. Cancelling stops future
          billing — you keep Pro access (unlimited active cases) until the end of the billing period you&rsquo;ve
          already paid for, and your account then reverts to the free plan&rsquo;s limits.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">7-day money-back guarantee</h2>
        <p>
          If you&rsquo;re unhappy with Litigo Pro for any reason, contact us within 7 days of your{" "}
          <em>first</em> payment for a full refund of that payment. This applies once per account, to the
          first payment only — it isn&rsquo;t available on renewal charges (monthly or annual).
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Refunds outside the 7-day window</h2>
        <p>
          Beyond the 7-day window, payments are non-refundable, including for partially used billing periods —
          switching plans or cancelling mid-cycle doesn&rsquo;t entitle you to a pro-rated refund for unused time.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Failed or declined payments</h2>
        <p>
          If a renewal payment fails, our payment processor (Razorpay) retries it automatically over the
          following few days. If it continues to fail, your subscription is paused and your account reverts to
          the free plan&rsquo;s limits until payment succeeds or you re-subscribe.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">How to request a refund</h2>
        <p>
          Email{" "}
          <a href="mailto:hello@mylitigo.com" className="font-medium text-gray-900 underline">
            hello@mylitigo.com
          </a>{" "}
          with your account email and the reason for the request. Eligible refunds are processed back to your
          original payment method within 5&ndash;7 business days.
        </p>
      </section>
    </InfoPage>
  );
}
