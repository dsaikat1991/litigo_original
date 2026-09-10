"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function NavBar() {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <Link href="/dashboard" className="text-lg font-semibold text-gray-900">
        mylitigo
      </Link>
      <button
        onClick={handleSignOut}
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        Sign out
      </button>
    </nav>
  );
}
