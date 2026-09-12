import type { ReactNode } from "react";
import Link from "next/link";

export function InfoPage({
  title,
  disclaimer,
  children,
}: {
  title: string;
  disclaimer?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8">
        <Link href="/" className="mb-6 inline-block text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Litigo
        </Link>
        <h1 className={disclaimer ? "mb-1 text-xl font-semibold text-gray-900" : "mb-6 text-xl font-semibold text-gray-900"}>
          {title}
        </h1>
        {disclaimer && <p className="mb-6 text-xs text-gray-400">{disclaimer}</p>}
        <div className="space-y-5 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}
