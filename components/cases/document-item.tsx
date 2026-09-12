"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteCaseDocument } from "@/lib/data/case-documents";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import type { CaseDocument } from "@/types/database";

function formatFileSize(bytes: number | null) {
  if (bytes === null) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentItem({ document: doc }: { document: CaseDocument }) {
  const router = useRouter();
  const supabase = createClient();

  const [opening, setOpening] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleView() {
    setOpening(true);
    setError(null);

    const { data, error } = await supabase.storage.from("case-documents").createSignedUrl(doc.storage_path, 60);

    if (error || !data) {
      setError(error?.message ?? "Could not open this file.");
      setOpening(false);
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    setOpening(false);
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);

    const { error: storageError } = await supabase.storage.from("case-documents").remove([doc.storage_path]);

    if (storageError) {
      setError(storageError.message);
      setDeleting(false);
      return;
    }

    const { error: deleteError } = await deleteCaseDocument(supabase, doc.id);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  const size = formatFileSize(doc.file_size);

  return (
    <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3 text-sm">
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={handleView}
          disabled={opening}
          className="truncate font-medium text-gray-900 hover:underline disabled:opacity-50"
        >
          {doc.file_name}
        </button>
        <p className="text-xs text-gray-500">
          {doc.created_at.slice(0, 10)}
          {size ? ` · ${size}` : ""}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <ConfirmDeleteDialog
          trigger={
            <button
              type="button"
              disabled={deleting}
              className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          }
          title={`Delete "${doc.file_name}"?`}
          description="This cannot be undone."
          onConfirm={handleDelete}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
