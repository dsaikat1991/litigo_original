"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
        <Link href="/" className="absolute left-6 top-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Litigo" className="h-5 w-auto" />
        </Link>

        <div className="w-full max-w-sm p-8 text-center">
          <h1 className="mb-2 text-lg font-semibold text-gray-900">Check your email</h1>
          <p className="text-sm text-gray-500">
            If an account exists for {email}, we sent a link to reset your password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
      <Link href="/" className="absolute left-6 top-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Litigo" className="h-5 w-auto" />
      </Link>

      <div className="w-full max-w-sm p-8">
        <div className="text-center">
          <h1 className="mb-1 text-xl font-semibold text-gray-900">Forgot password</h1>
          <p className="mb-6 text-sm text-gray-500">We&rsquo;ll email you a link to reset it.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/login" className="font-medium text-gray-900 underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
