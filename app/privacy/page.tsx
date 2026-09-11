import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8">
        <Link href="/" className="mb-6 inline-block text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Litigo
        </Link>
        <h1 className="mb-1 text-xl font-semibold text-gray-900">Privacy Policy</h1>
        <p className="mb-6 text-xs text-gray-400">
          Draft placeholder — not yet reviewed by a lawyer. Do not rely on this as a complete or binding policy.
        </p>

        <div className="space-y-5 text-sm text-gray-700">
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">What we collect</h2>
            <p>
              Your account details (name, email, phone), and the case, hearing, and note data you enter
              into your diary — which may include client names and other details of your legal practice.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">How we use it</h2>
            <p>
              Solely to operate the diary for you: storing your cases, showing them back to you, and
              sending account-related emails (sign-in confirmation, password reset). We do not sell your
              data or use it for advertising.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">Where it&rsquo;s stored</h2>
            <p>
              Data is stored with Supabase, our database and authentication provider, and access is
              restricted so that each advocate can only see their own data.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">Your rights</h2>
            <p>
              You can edit or delete any case, hearing, or note yourself at any time. To request full
              account deletion, contact us using the details below.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">Contact</h2>
            <p>For questions about this policy, contact the Litigo team.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
