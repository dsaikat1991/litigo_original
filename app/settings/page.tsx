import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profiles";
import { getSubscription } from "@/lib/data/subscriptions";
import { NavBar } from "@/components/layout/nav-bar";
import { ChangePasswordForm } from "@/components/settings/change-password-form";
import { NotificationPreferencesForm } from "@/components/settings/notification-preferences-form";
import { BillingSection } from "@/components/settings/billing-section";
import { DeleteAccountSection } from "@/components/settings/delete-account-section";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const { upgraded } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    getProfile(supabase, user.id),
    getSubscription(supabase, user.id),
  ]);

  if (!profile) {
    redirect("/dashboard");
  }

  const stillActivating = upgraded === "1" && subscription?.status !== "active";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl space-y-6 px-6 py-8">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        {stillActivating && (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Payment received — activating your Pro plan now. This page will update automatically once it's
            confirmed (usually within a few seconds). Refresh if it doesn&rsquo;t update shortly.
          </div>
        )}
        <BillingSection subscription={subscription} />
        <NotificationPreferencesForm profile={profile} />
        <ChangePasswordForm />
        <DeleteAccountSection />
      </main>
    </div>
  );
}
