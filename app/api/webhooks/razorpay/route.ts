import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createServiceClient } from "@/lib/supabase/service";
import { upsertSubscription } from "@/lib/data/subscriptions";

/**
 * Keeps `subscriptions` in sync with Razorpay's own view of the world — this
 * is the actual source of truth for "is this advocate on Pro", not the
 * client-side checkout success callback, which only means the checkout
 * modal closed, not that the payment/subscription was actually confirmed.
 *
 * Configure in Razorpay dashboard: Settings -> Webhooks -> Add New Webhook,
 * URL `https://mylitigo.com/api/webhooks/razorpay`, and subscribe to at
 * least: subscription.activated, subscription.charged,
 * subscription.cancelled, subscription.completed, subscription.halted.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  const isValid = Razorpay.validateWebhookSignature(rawBody, signature, process.env.RAZORPAY_WEBHOOK_SECRET);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event as string;
  const subscriptionEntity = payload.payload?.subscription?.entity;

  if (!subscriptionEntity) {
    // Not a subscription-related event (e.g. a plain payment webhook) — nothing for us to do.
    return NextResponse.json({ received: true });
  }

  const advocateId = subscriptionEntity.notes?.advocate_id as string | undefined;
  if (!advocateId) {
    return NextResponse.json({ received: true });
  }

  const service = createServiceClient();

  if (event === "subscription.activated" || event === "subscription.charged") {
    await upsertSubscription(service, {
      advocate_id: advocateId,
      razorpay_subscription_id: subscriptionEntity.id,
      razorpay_customer_id: subscriptionEntity.customer_id ?? null,
      plan: "pro",
      status: "active",
      current_period_end: subscriptionEntity.current_end
        ? new Date(subscriptionEntity.current_end * 1000).toISOString()
        : null,
    });
  } else if (
    event === "subscription.cancelled" ||
    event === "subscription.completed" ||
    event === "subscription.halted"
  ) {
    await upsertSubscription(service, {
      advocate_id: advocateId,
      razorpay_subscription_id: subscriptionEntity.id,
      status: "cancelled",
    });
  }

  return NextResponse.json({ received: true });
}
