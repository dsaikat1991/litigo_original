import Razorpay from "razorpay";

let client: Razorpay | null = null;

/** Server-only Razorpay client — never import this into a client component. */
export function getRazorpayClient() {
  if (!client) {
    client = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return client;
}

export const RAZORPAY_PLAN_IDS = {
  monthly: process.env.RAZORPAY_PLAN_ID_MONTHLY!,
  annual: process.env.RAZORPAY_PLAN_ID_ANNUAL!,
} as const;

export type BillingCycle = keyof typeof RAZORPAY_PLAN_IDS;

/**
 * Razorpay subscriptions require a fixed number of billing cycles up front —
 * there's no true "until cancelled" option. 120 monthly charges (10 years) or
 * 20 annual charges is long enough to be effectively indefinite in practice;
 * cancellation still works normally at any point before then.
 */
export const RAZORPAY_TOTAL_COUNT: Record<BillingCycle, number> = {
  monthly: 120,
  annual: 20,
};
