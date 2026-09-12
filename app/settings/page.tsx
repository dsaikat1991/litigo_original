import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profiles";
import { NavBar } from "@/components/layout/nav-bar";
import { ChangePasswordForm } from "@/components/settings/change-password-form";
import { NotificationPreferencesForm } from "@/components/settings/notification-preferences-form";
import { DeleteAccountSection } from "@/components/settings/delete-account-section";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await getProfile(supabase, user.id);

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl space-y-6 px-6 py-8">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <NotificationPreferencesForm profile={profile} />
        <ChangePasswordForm />
        <DeleteAccountSection />
      </main>
    </div>
  );
}
