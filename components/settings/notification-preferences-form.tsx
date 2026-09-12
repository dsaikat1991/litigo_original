"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateProfile } from "@/lib/data/profiles";
import { emitProfileUpdated } from "@/lib/profile-events";
import type { Profile } from "@/types/database";

const THRESHOLDS: { days: number; label: string }[] = [
  { days: 7, label: "7 days before" },
  { days: 3, label: "3 days before" },
  { days: 1, label: "1 day before" },
  { days: 0, label: "Same day" },
];

export function NotificationPreferencesForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const supabase = createClient();

  const [expanded, setExpanded] = useState(true);
  const [reminderDays, setReminderDays] = useState<number[]>(profile.reminder_days);
  const [reminderEmailDays, setReminderEmailDays] = useState<number[]>(profile.reminder_email_days);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function toggle(days: number, channel: "inApp" | "email") {
    setSaved(false);
    const setter = channel === "inApp" ? setReminderDays : setReminderEmailDays;
    setter((prev) => (prev.includes(days) ? prev.filter((d) => d !== days) : [...prev, days]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error } = await updateProfile(supabase, profile.id, {
      reminder_days: reminderDays,
      reminder_email_days: reminderEmailDays,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    emitProfileUpdated();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-gray-200 bg-white p-6">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-xs font-semibold tracking-wide text-gray-900">NOTIFICATIONS</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
        )}
      </button>

      {expanded && (
        <div className="mt-1">
          <p className="text-sm text-gray-500">Choose which hearing reminders you want, and how you want them.</p>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="grid grid-cols-[1fr_64px_64px] items-center gap-y-3">
              <div />
              <span className="text-center text-xs font-medium text-gray-500">In-app</span>
              <span className="text-center text-xs font-medium text-gray-500">Email</span>

              {THRESHOLDS.map(({ days, label }) => (
                <Fragment key={days}>
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={reminderDays.includes(days)}
                      onChange={() => toggle(days, "inApp")}
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                  </span>
                  <span className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={reminderEmailDays.includes(days)}
                      onChange={() => toggle(days, "email")}
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                  </span>
                </Fragment>
              ))}
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {saved && !error && <p className="mt-4 text-sm text-green-700">Preferences saved.</p>}

          <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
