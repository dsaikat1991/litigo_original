"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateProfile } from "@/lib/data/profiles";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export function AvatarUploader({ userId, avatarUrl }: { userId: string; avatarUrl: string | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [preview, setPreview] = useState(avatarUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be under 2MB.");
      return;
    }

    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const bustedUrl = `${data.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await updateProfile(supabase, userId, { avatar_url: bustedUrl });

    if (updateError) {
      setError(updateError.message);
      setUploading(false);
      return;
    }

    setPreview(bustedUrl);
    setUploading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-white p-6">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-medium text-gray-400">?</div>
        )}
      </div>
      <div>
        <label className="inline-block cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          {uploading ? "Uploading..." : "Change photo"}
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, or WebP. Up to 2MB.</p>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
