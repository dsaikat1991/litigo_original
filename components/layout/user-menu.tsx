"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getProfile } from "@/lib/data/profiles";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { onProfileUpdated } from "@/lib/profile-events";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await getProfile(supabase, user.id);
      if (!cancelled && profile) {
        setFullName(profile.full_name);
        setAvatarUrl(profile.avatar_url);
      }
    }

    load();
    const unsubscribe = onProfileUpdated(load);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  useClickOutside(containerRef, open, () => setOpen(false));

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const firstName = fullName?.trim().split(/\s+/)[0];
  const initial = firstName?.[0]?.toUpperCase();

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
      >
        {firstName && <span className="hidden sm:inline">Hi, {firstName}</span>}
        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">
              {initial ?? <User className="h-4 w-4" />}
            </span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            Settings
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
