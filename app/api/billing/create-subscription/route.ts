import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getRazorpayClient, RAZORPAY_PLAN_IDS, RAZORPAY_TOTAL_COUNT, type BillingCycle } from "@/lib/razorpay";
import { upsertSubscription } from "@/lib/data/subscriptions";

function isBillingCycle(value: unknown): value is BillingCycle {
  return value === "monthly" || value === "annual";
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const cycle = body?.cycle;
  if (!isBillingCycle(cycle)) {
    return NextResponse.json({ error: "Invalid billing cycle" }, { status: 400 });
  }

  try {
    const razorpay = getRazorpayClient();
    const subscription = await razorpay.subscriptions.create({
      plan_id: RAZORPAY_PLAN_IDS[cycle],
      customer_notify: 1,
      total_count: RAZORPAY_TOTAL_COUNT[cycle],
      notes: { advocate_id: user.id },
    });

    // The advocate's own client only has read access to `subscriptions` (see
    // migration 0017) — this write needs the service-role client. Safe here
    // because `user.id` came from their own verified session above, not from
    // request input.
    const service = createServiceClient();
    const { error } = await upsertSubscription(service, {
      advocate_id: user.id,
      razorpay_subscription_id: subscription.id,
      plan: "pro",
      billing_cycle: cycle,
      status: "created",
    });

    if (error) {
      console.error("Failed to record subscription", error);
      return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ subscriptionId: subscription.id });
  } catch (err) {
    console.error("Failed to create Razorpay subscription", err);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
