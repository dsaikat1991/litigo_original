"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createCaseDocument } from "@/lib/data/case-documents";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export function UploadDocumentForm({ caseId }: { caseId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 10MB.");
      return;
    }

    setUploading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      setUploading(false);
      return;
    }

    const storagePath = `${user.id}/${caseId}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;

    const { error: uploadError } = await supabase.storage.from("case-documents").upload(storagePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { error: insertError } = await createCaseDocument(supabase, {
      advocate_id: user.id,
      case_id: caseId,
      file_name: file.name,
      storage_path: storagePath,
      file_size: file.size,
      mime_type: file.type || null,
    });

    if (insertError) {
      await supabase.storage.from("case-documents").remove([storagePath]);
      setError(insertError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
    router.refresh();
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <label className="inline-block cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
        {uploading ? "Uploading..." : "Upload document"}
        <input
          type="file"
          accept=".pdf,.doc,.docx,image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      <p className="mt-1 text-xs text-gray-500">PDF, Word, or image. Up to 10MB.</p>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
