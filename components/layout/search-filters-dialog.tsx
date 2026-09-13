"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { listAllTags } from "@/lib/data/tags";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10";

export function SearchFiltersDialog({ query }: { query: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    const supabase = createClient();
    listAllTags(supabase).then(setAvailableTags);
  }, [open]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function applyFilters() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);
    selectedTags.forEach((tag) => params.append("tags", tag));
    setOpen(false);
    router.push(`/search?${params.toString()}`);
  }

  function clearFilters() {
    setDateFrom("");
    setDateTo("");
    setSelectedTags([]);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          title="Advanced search filters"
          className="shrink-0 text-gray-400 transition-colors hover:text-gray-900"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Advanced search</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">From date</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">To date</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={inputClass} />
            </div>
          </div>

          {availableTags.length > 0 && (
            <div>
              <span className="mb-1 block text-xs font-medium text-gray-700">Tags</span>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Clear filters
          </button>
          <button
            type="button"
            onClick={applyFilters}
            className="rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Apply filters
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
