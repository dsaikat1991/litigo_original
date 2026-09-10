import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCase } from "@/lib/data/cases";
import { NavBar } from "@/components/layout/nav-bar";
import { EditCaseForm } from "@/components/cases/edit-case-form";

export const metadata: Metadata = { title: "Edit case" };

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: caseRow } = await getCase(supabase, id);

  if (!caseRow) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-6 text-lg font-semibold text-gray-900">Edit case</h1>
        <EditCaseForm caseRow={caseRow} />
      </main>
    </div>
  );
}
