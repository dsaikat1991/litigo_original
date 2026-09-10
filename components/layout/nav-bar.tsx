"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/dashboard", label: "Cases" },
  { href: "/calendar", label: "Calendar" },
];

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-lg font-semibold text-gray-900">
          mylitigo
        </Link>
        <div className="flex gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname.startsWith(link.href)
                  ? "text-sm font-medium text-gray-900"
                  : "text-sm font-medium text-gray-500 hover:text-gray-900"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        Sign out
      </button>
    </nav>
  );
}
