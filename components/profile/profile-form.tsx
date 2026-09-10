"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateProfile } from "@/lib/data/profiles";
import { emitProfileUpdated } from "@/lib/profile-events";
import type { Profile } from "@/types/database";

export function ProfileForm({ profile, email }: { profile: Profile; email: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [barEnrollmentNo, setBarEnrollmentNo] = useState(profile.bar_enrollment_no ?? "");
  const [practiceCity, setPracticeCity] = useState(profile.practice_city ?? "");
  const [courts, setCourts] = useState(profile.courts.join(", "));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error } = await updateProfile(supabase, profile.id, {
      full_name: fullName || null,
      phone: phone || null,
      bar_enrollment_no: barEnrollmentNo || null,
      practice_city: practiceCity || null,
      courts: courts ? courts.split(",").map((c) => c.trim()).filter(Boolean) : [],
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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-md border border-gray-200 bg-white p-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input
          disabled
          value={email}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Bar enrollment no.</label>
          <input
            value={barEnrollmentNo}
            onChange={(e) => setBarEnrollmentNo(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Practice city</label>
          <input
            value={practiceCity}
            onChange={(e) => setPracticeCity(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Courts (comma separated)</label>
          <input
            value={courts}
            onChange={(e) => setCourts(e.target.value)}
            placeholder="e.g. Alipore District Court, Calcutta High Court"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-green-700">Profile updated.</p>}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
