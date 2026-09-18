import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profiles";
import { getSubscription } from "@/lib/data/subscriptions";
import { isGrandfathered } from "@/lib/billing";
import { NavBar } from "@/components/layout/nav-bar";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ProPlanCard } from "@/components/billing/pro-plan-card";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Litigo is free for up to 5 active cases. Upgrade to Pro (₹299/month or ₹2,999/year) for unlimited cases.",
};

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPro = false;
  let grandfathered = false;

  if (user) {
    const [{ data: subscription }, { data: profile }] = await Promise.all([
      getSubscription(supabase, user.id),
      getProfile(supabase, user.id),
    ]);
    isPro = subscription?.plan === "pro" && subscription?.status === "active";
    grandfathered = profile ? isGrandfathered(profile.created_at) : false;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {user ? (
        <NavBar />
      ) : (
        <header className="border-b border-gray-100">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Litigo" className="h-5 w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:py-24">
        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Pricing</p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl">
            Simple pricing, built for solo practice.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-gray-600">
            Start free. Upgrade only once your practice actually outgrows it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {/* Free */}
          <div className="rounded-lg border border-gray-200 p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Free</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">₹0</p>
            <p className="mt-1 text-sm text-gray-500">Forever</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                {grandfathered ? "Unlimited active cases (early user)" : "Up to 5 active cases"}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                Hearings, tasks, notes, research &amp; documents
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                Search, calendar &amp; case timeline
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                In-app &amp; email reminders
              </li>
            </ul>
            <div className="mt-8">
              {!user ? (
                <Link
                  href="/signup"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Get started free
                </Link>
              ) : !isPro ? (
                <p className="rounded-md bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                  Current plan
                </p>
              ) : null}
            </div>
          </div>

          <ProPlanCard isPro={isPro} isLoggedIn={!!user} />
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Questions about billing?{" "}
          <Link href="/contact" className="font-medium text-gray-900 underline">
            Get in touch
          </Link>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
