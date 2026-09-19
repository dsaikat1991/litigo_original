import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
      <Link href="/" className="absolute left-6 top-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Litigo" className="h-5 w-auto" />
      </Link>

      <div className="w-full max-w-sm p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">404</p>
        <h1 className="mt-2 text-xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-2 text-sm text-gray-500">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
