import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listUpcomingCases } from "@/lib/data/cases";
import { listAppointmentsForCalendar } from "@/lib/data/appointments";
import { NavBar } from "@/components/layout/nav-bar";
import { MonthCalendar } from "@/components/calendar/month-calendar";

export const metadata: Metadata = { title: "Calendar" };

export default async function CalendarPage() {
  const supabase = await createClient();
  const [{ data: cases }, { data: appointments }] = await Promise.all([
    listUpcomingCases(supabase),
    listAppointmentsForCalendar(supabase),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="mb-6 text-lg font-semibold text-gray-900">Upcoming hearings &amp; appointments</h1>
        <MonthCalendar cases={cases ?? []} appointments={appointments ?? []} />
      </main>
    </div>
  );
}
