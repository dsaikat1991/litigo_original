import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRazorpayClient } from "@/lib/razorpay";
import { getSubscription } from "@/lib/data/subscriptions";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: subscription } = await getSubscription(supabase, user.id);
  if (!subscription?.razorpay_subscription_id || subscription.status !== "active") {
    return NextResponse.json({ error: "No active subscription to cancel" }, { status: 404 });
  }

  try {
    const razorpay = getRazorpayClient();
    // `true` = cancel at the end of the current billing cycle, matching the
    // Refund Policy's promise that Pro access continues until the period
    // already paid for ends. We deliberately don't touch our own `status`
    // here — Razorpay fires subscription.completed/.cancelled when the cycle
    // actually ends, and the webhook flips it then, at the right time.
    await razorpay.subscriptions.cancel(subscription.razorpay_subscription_id, true);
    return NextResponse.json({ ok: true, currentPeriodEnd: subscription.current_period_end });
  } catch (err) {
    console.error("Failed to cancel Razorpay subscription", err);
    return NextResponse.json({ error: "Could not cancel. Please try again or contact support." }, { status: 500 });
  }
}
