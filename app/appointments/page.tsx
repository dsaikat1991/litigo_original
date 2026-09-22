import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listAllAppointments, type AppointmentWithCase } from "@/lib/data/appointments";
import { listCases } from "@/lib/data/cases";
import { NavBar } from "@/components/layout/nav-bar";
import { AddAppointmentForm } from "@/components/cases/add-appointment-form";
import { AppointmentItem } from "@/components/cases/appointment-item";

export const metadata: Metadata = { title: "Appointments" };

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const [{ data }, { data: cases }] = await Promise.all([listAllAppointments(supabase), listCases(supabase)]);
  const appointments = (data ?? []) as AppointmentWithCase[];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-1 text-lg font-semibold text-gray-900">Appointments</h1>
        <p className="mb-6 text-sm text-gray-500">
          Client conferences, meetings with co-counsel, anything time-bound that isn&rsquo;t a court hearing. Not
          every appointment needs to belong to a case.
        </p>

        <div className="mb-6">
          <AddAppointmentForm cases={cases ?? []} />
        </div>

        <div className="space-y-2">
          {appointments.length === 0 ? (
            <p className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
              No appointments yet. Add one above.
            </p>
          ) : (
            appointments.map((a) => (
              <AppointmentItem key={a.id} appointment={a} linkedCase={a.case} cases={cases ?? []} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
