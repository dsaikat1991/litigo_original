"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { quickSearch, type QuickSearchResult } from "@/lib/data/search";
import { SearchFiltersDialog } from "@/components/layout/search-filters-dialog";

const RESULT_TYPE_LABELS: Record<QuickSearchResult["type"], string> = {
  case: "Case",
  hearing: "Hearing",
  task: "Task",
  note: "Note",
  research: "Research",
  document: "Document",
};

const DROPDOWN_LIMIT = 5;

export function NavSearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(pathname === "/search" ? (searchParams.get("q") ?? "") : "");
  const [results, setResults] = useState<QuickSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(async () => {
      const supabase = createClient();
      const found = await quickSearch(supabase, trimmed, DROPDOWN_LIMIT);
      if (!cancelled) {
        setResults(found);
        setLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToFullSearch() {
    setOpen(false);
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <form
        action="/search"
        className="flex w-full max-w-sm items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 transition-colors focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-900/10"
        onSubmit={(e) => {
          e.preventDefault();
          goToFullSearch();
        }}
      >
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          type="search"
          name="q"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          placeholder="Search cases, notes, hearings..."
          className="w-full min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
        />
        <SearchFiltersDialog query={query} />
      </form>

      {open && query.trim() && (
        <div className="absolute left-0 top-full z-20 mt-1 w-full max-w-sm rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {loading ? (
            <p className="px-3 py-2 text-sm text-gray-500">Searching…</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-gray-500">No quick matches for &ldquo;{query.trim()}&rdquo;.</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={`${r.type}-${r.id}`}>
                  <Link
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-50"
                  >
                    <span className="min-w-0 truncate text-gray-900">{r.title}</span>
                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {RESULT_TYPE_LABELS[r.type]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={goToFullSearch}
            className="block w-full border-t border-gray-100 px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            View all results for &ldquo;{query.trim()}&rdquo; →
          </button>
        </div>
      )}
    </div>
  );
}
