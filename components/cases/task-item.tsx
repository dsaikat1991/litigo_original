"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateTask, deleteTask } from "@/lib/data/tasks";
import type { Task } from "@/types/database";

function isOverdue(dueDate: string | null, isDone: boolean) {
  if (!dueDate || isDone) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today;
}

export function TaskItem({ task }: { task: Task }) {
  const router = useRouter();
  const supabase = createClient();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.due_date ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);

  async function handleToggle() {
    setToggling(true);
    setError(null);

    const { error } = await updateTask(supabase, task.id, { is_done: !task.is_done });

    if (error) {
      setError(error.message);
    }
    setToggling(false);
    router.refresh();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await updateTask(supabase, task.id, {
      title,
      due_date: dueDate || null,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    const { error } = await deleteTask(supabase, task.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-3 text-sm sm:flex-row sm:items-end">
        <div className="flex-1">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    );
  }

  const overdue = isOverdue(task.due_date, task.is_done);

  return (
    <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
      <input
        type="checkbox"
        checked={task.is_done}
        onChange={handleToggle}
        disabled={toggling}
        className="h-4 w-4 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
      />
      <div className="min-w-0 flex-1">
        <p className={task.is_done ? "truncate text-gray-400 line-through" : "truncate text-gray-900"}>
          {task.title}
        </p>
        {task.due_date && (
          <p className={overdue ? "text-xs font-medium text-red-600" : "text-xs text-gray-500"}>
            {overdue ? "Overdue: " : "Due "}
            {task.due_date}
          </p>
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="text-xs font-medium text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
