"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavSearchBox } from "./nav-search-box";
import { NotificationBell } from "./notification-bell";
import { UserMenu } from "./user-menu";

const NAV_LINKS = [
  { href: "/dashboard", label: "Cases" },
  { href: "/calendar", label: "Calendar" },
  { href: "/notes", label: "Notes" },
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
    <nav className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Litigo" className="h-5 w-auto" />
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
