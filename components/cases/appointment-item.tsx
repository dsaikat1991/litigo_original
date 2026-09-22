"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateAppointment, deleteAppointment } from "@/lib/data/appointments";
import { formatDateDDMMYYYY, formatTime12h, isoDateDaysFromNow } from "@/lib/dates";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateField } from "@/components/shared/date-field";
import type { Appointment } from "@/types/database";
import type { CaseListItem } from "@/lib/data/cases";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/10";
const labelClass = "mb-1 block text-xs font-medium text-gray-700";
const NO_LINKED_CASE = "__none__";

function isOverdue(date: string, isDone: boolean) {
  if (isDone) return false;
  return date < isoDateDaysFromNow(0);
}

type LinkedCase = { id: string; case_title: string } | null;

export function AppointmentItem({
  appointment,
  linkedCase,
  cases,
}: {
  appointment: Appointment;
  linkedCase?: LinkedCase;
  cases?: CaseListItem[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(appointment.title);
  const [date, setDate] = useState(appointment.appointment_date);
  const [time, setTime] = useState(appointment.appointment_time ?? "");
  const [location, setLocation] = useState(appointment.location ?? "");
  const [notes, setNotes] = useState(appointment.notes ?? "");
  const [linkedCaseId, setLinkedCaseId] = useState(appointment.case_id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleToggle() {
    setToggling(true);
    setError(null);

    const { error } = await updateAppointment(supabase, appointment.id, { is_done: !appointment.is_done });

    if (error) {
      setError(error.message);
    }
    setToggling(false);
    router.refresh();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("Date is required.");
      return;
    }
    setSaving(true);
    setError(null);

    const { error } = await updateAppointment(supabase, appointment.id, {
      title,
      appointment_date: date,
      appointment_time: time || null,
      location: location || null,
      notes: notes || null,
      ...(cases ? { case_id: linkedCaseId || null } : {}),
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
    setDeleting(true);
    setError(null);

    const { error } = await deleteAppointment(supabase, appointment.id);

    if (error) {
      setError(error.message);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="space-y-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Title</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DateField label="Date" labelClassName={labelClass} value={date} onChange={setDate} clearable={false} />
          <div>
            <label className={labelClass}>Time (optional)</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
          </div>
        </div>

        {cases && cases.length > 0 && (
          <div>
            <label className={labelClass}>Case (optional)</label>
            <Select
              value={linkedCaseId || NO_LINKED_CASE}
              onValueChange={(value) => setLinkedCaseId(value === NO_LINKED_CASE ? "" : value)}
            >
              <SelectTrigger className="py-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_LINKED_CASE}>— None —</SelectItem>
                {cases.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.case_title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <label className={labelClass}>Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={inputClass} />
        </div>

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

  return (
    <div className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
      <Checkbox
        checked={appointment.is_done}
        onCheckedChange={handleToggle}
        disabled={toggling}
        className="mt-0.5"
        aria-label={appointment.is_done ? "Mark as not done" : "Mark as done"}
      />
      <div className="min-w-0 flex-1">
        {linkedCase && (
          <Link
            href={`/cases/${linkedCase.id}`}
            className="mb-1 inline-block text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            {linkedCase.case_title} →
          </Link>
        )}
        <p className={appointment.is_done ? "truncate text-gray-400 line-through" : "truncate font-medium text-gray-900"}>
          {title}
        </p>
        <p className={`mt-0.5 text-xs ${isOverdue(date, appointment.is_done) ? "font-medium text-red-600" : "text-gray-500"}`}>
          {formatDateDDMMYYYY(date)}
          {time ? ` · ${formatTime12h(time)}` : ""}
          {location ? ` · ${location}` : ""}
        </p>
        {notes && <p className="mt-1 whitespace-pre-wrap text-gray-600">{notes}</p>}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          Edit
        </button>
        <ConfirmDeleteDialog
          trigger={
            <button type="button" disabled={deleting} className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50">
              {deleting ? "Deleting..." : "Delete"}
            </button>
          }
          title="Delete this appointment?"
          description="This cannot be undone."
          onConfirm={handleDelete}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
