"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NavSearchBox } from "./nav-search-box";

const NAV_LINKS = [
  { href: "/dashboard", label: "Cases" },
  { href: "/calendar", label: "Calendar" },
];

const SEARCH_BOX_FALLBACK = (
  <div className="flex-1">
    <input
      disabled
      placeholder="Search cases, notes, hearings..."
      className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-400"
    />
  </div>
);

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navLinks = NAV_LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={
        pathname.startsWith(link.href)
          ? "text-sm font-medium text-gray-900"
          : "text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      }
    >
      {link.label}
    </Link>
  ));

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-lg font-semibold text-gray-900">
            mylitigo
          </Link>
          <div className="hidden gap-4 sm:flex">{navLinks}</div>
        </div>
        <div className="hidden sm:flex sm:flex-1">
          <Suspense fallback={SEARCH_BOX_FALLBACK}>
            <NavSearchBox />
          </Suspense>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/profile"
            className={
              pathname.startsWith("/profile")
                ? "text-sm font-medium text-gray-900"
                : "text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            }
          >
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4 sm:hidden">
        <Suspense fallback={SEARCH_BOX_FALLBACK}>
          <NavSearchBox />
        </Suspense>
      </div>
      <div className="mt-2 flex gap-4 sm:hidden">
        {navLinks}
        <Link
          href="/profile"
          className={
            pathname.startsWith("/profile")
              ? "text-sm font-medium text-gray-900"
              : "text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          }
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
