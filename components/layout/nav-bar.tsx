"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { NavSearchBox } from "./nav-search-box";
import { NotificationBell } from "./notification-bell";
import { UserMenu } from "./user-menu";

const NAV_LINKS = [
  { href: "/dashboard", label: "Cases" },
  { href: "/today", label: "Today" },
  { href: "/calendar", label: "Calendar" },
  { href: "/appointments", label: "Appointments" },
  { href: "/notes", label: "Notes" },
];

const SEARCH_BOX_FALLBACK = (
  <div className="flex-1">
    <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5">
      <Search className="h-4 w-4 shrink-0 text-gray-400" />
      <input
        disabled
        placeholder="Search cases, notes, hearings..."
        className="w-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-gray-400 focus:outline-none"
      />
      <SlidersHorizontal className="h-4 w-4 shrink-0 text-gray-300" />
    </div>
  </div>
);

export function NavBar() {
  const pathname = usePathname();

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
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Litigo" className="h-4 w-auto" />
          </Link>
          <div className="hidden gap-4 sm:flex">{navLinks}</div>
        </div>
        <div className="hidden sm:flex sm:flex-1">
          <Suspense fallback={SEARCH_BOX_FALLBACK}>
            <NavSearchBox />
          </Suspense>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4 sm:hidden">
        <Suspense fallback={SEARCH_BOX_FALLBACK}>
          <NavSearchBox />
        </Suspense>
      </div>
      <div className="mt-2 flex gap-4 sm:hidden">{navLinks}</div>
    </nav>
  );
}
