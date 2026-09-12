"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createTask, deleteTask, updateTask } from "@/lib/data/tasks";
import type { Task } from "@/types/database";

/** Inline checklist of tasks tied to a specific hearing ("tasks before next hearing"). */
export function HearingTasks({ caseId, hearingId, tasks }: { caseId: string; hearingId: string; tasks: Task[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [isCritical, setIsCritical] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      setAdding(false);
      return;
    }

    const { error } = await createTask(supabase, {
      advocate_id: user.id,
      case_id: caseId,
      hearing_id: hearingId,
      title: title.trim(),
      due_date: null,
      is_critical: isCritical,
    });

    if (error) {
      setError(error.message);
      setAdding(false);
      return;
    }

    setTitle("");
    setIsCritical(false);
    setAdding(false);
    router.refresh();
  }

  async function handleToggle(task: Task) {
    const { error } = await updateTask(supabase, task.id, { is_done: !task.is_done });
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  async function handleRemove(task: Task) {
    const { error } = await deleteTask(supabase, task.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Tasks before next hearing</p>
      {tasks.length > 0 && (
        <ul className="mb-2 space-y-1.5">
          {tasks.map((t) => (
            <li key={t.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.is_done}
                onChange={() => handleToggle(t)}
                className="h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
              />
              <span className={`flex-1 text-sm ${t.is_done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {t.is_critical && !t.is_done && (
                  <span className="mr-1.5 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Critical
                  </span>
                )}
                {t.title}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(t)}
                className="text-xs text-gray-400 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="space-y-1.5">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task for before the next hearing..."
            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
          <button
            type="submit"
            disabled={adding}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-500">
          <input
            type="checkbox"
            checked={isCritical}
            onChange={(e) => setIsCritical(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-gray-300 text-red-600 focus:ring-red-600/20"
          />
          Critical deadline
        </label>
      </form>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
