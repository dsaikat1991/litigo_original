import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8">
        <Link href="/" className="mb-6 inline-block text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Litigo
        </Link>
        <h1 className="mb-1 text-xl font-semibold text-gray-900">Terms of Service</h1>
        <p className="mb-6 text-xs text-gray-400">
          Draft placeholder — not yet reviewed by a lawyer. Do not rely on this as a complete or binding agreement.
        </p>

        <div className="space-y-5 text-sm text-gray-700">
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">Using Litigo</h2>
            <p>
              Litigo is a case diary tool for advocates. You&rsquo;re responsible for the accuracy of
              the case, hearing, and note data you enter, and for keeping your account credentials secure.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">Your data, your responsibility</h2>
            <p>
              You retain ownership of everything you enter. Litigo is a tool to help you track it — it
              is not a substitute for your own diligence in meeting court deadlines, and we are not
              liable for missed dates or decisions made based on data in the app.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">No warranty</h2>
            <p>
              The service is provided &ldquo;as is&rdquo;, without warranty of any kind, while it is in
              active early development.
            </p>
          </section>
          <section>
            <h2 className="mb-1 font-semibold text-gray-900">Account termination</h2>
            <p>You may stop using Litigo and request deletion of your account at any time.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
