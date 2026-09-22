"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createTask } from "@/lib/data/tasks";
import { Checkbox } from "@/components/ui/checkbox";
import { DateField } from "@/components/shared/date-field";

export function AddTaskForm({ caseId }: { caseId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCritical, setIsCritical] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      setLoading(false);
      return;
    }

    const { error } = await createTask(supabase, {
      advocate_id: user.id,
      case_id: caseId,
      title,
      due_date: dueDate || null,
      is_critical: isCritical,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setTitle("");
    setDueDate("");
    setIsCritical(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-md border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-700">Task</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. File rejoinder before next date"
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
        <div>
          <DateField
            label="Due date"
            labelClassName="mb-1 block text-xs font-medium text-gray-700"
            value={dueDate}
            onChange={setDueDate}
            className="w-auto"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add task"}
        </button>
      </div>
      <label htmlFor="add-task-critical" className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
        <Checkbox
          id="add-task-critical"
          checked={isCritical}
          onCheckedChange={(checked) => setIsCritical(checked === true)}
          className="size-3.5 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
        />
        Critical deadline (e.g. limitation period) — missing this is not just a delay
      </label>
    </form>
  );
}
