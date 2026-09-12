"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteOwnAccount } from "@/lib/data/profiles";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";

export function DeleteAccountSection() {
  const router = useRouter();
  const supabase = createClient();

  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    setError(null);

    const { error } = await deleteOwnAccount(supabase);

    if (error) {
      setError(error.message);
      setDeleting(false);
      return;
    }

    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-md border border-red-200 bg-white p-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Delete account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Permanently deletes your account and every case, hearing, note, task, and research item in it. This cannot
          be undone.
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <ConfirmDeleteDialog
        trigger={
          <button
            type="button"
            disabled={deleting}
            className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete account"}
          </button>
        }
        title="Delete your account?"
        description="This permanently deletes your account and all of your cases, hearings, notes, tasks, and research items. This cannot be undone."
        confirmLabel="Delete account"
        onConfirm={handleDelete}
      />
    </div>
  );
}
