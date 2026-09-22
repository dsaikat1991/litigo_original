"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createCaseDocument } from "@/lib/data/case-documents";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Hearing } from "@/types/database";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const NO_RELATED_HEARING = "__none__";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export function UploadDocumentForm({ caseId, hearings }: { caseId: string; hearings: Hearing[] }) {
  const router = useRouter();
  const supabase = createClient();

  const [hearingId, setHearingId] = useState("");
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
      hearing_id: hearingId || null,
    });

    if (insertError) {
      await supabase.storage.from("case-documents").remove([storagePath]);
      setError(insertError.message);
      setUploading(false);
      return;
    }

    setHearingId("");
    setUploading(false);
    router.refresh();
  }

  return (
    <div className="space-y-2 rounded-md border border-gray-200 bg-white p-4">
      {hearings.length > 0 && (
        <div className="max-w-xs">
          <label className="mb-1 block text-xs font-medium text-gray-700">Related hearing (optional)</label>
          <Select
            value={hearingId || NO_RELATED_HEARING}
            onValueChange={(value) => setHearingId(value === NO_RELATED_HEARING ? "" : value)}
          >
            <SelectTrigger className="py-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NO_RELATED_HEARING}>— None —</SelectItem>
              {hearings.map((h) => (
                <SelectItem key={h.id} value={h.id}>
                  {h.hearing_date}
                  {h.purpose ? ` — ${h.purpose}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
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
    </div>
  );
}
