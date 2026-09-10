"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function NavSearchBox() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <form action="/search" className="flex-1">
      <input
        type="search"
        name="q"
        placeholder="Search cases, notes, hearings..."
        defaultValue={pathname === "/search" ? (searchParams.get("q") ?? "") : ""}
        className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
      />
    </form>
  );
}
