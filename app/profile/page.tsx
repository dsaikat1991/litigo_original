import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profiles";
import { NavBar } from "@/components/layout/nav-bar";
import { ProfileForm } from "@/components/profile/profile-form";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
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
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-6 text-lg font-semibold text-gray-900">Your profile</h1>
        <ProfileForm profile={profile} email={user.email ?? ""} />
      </main>
    </div>
  );
}
