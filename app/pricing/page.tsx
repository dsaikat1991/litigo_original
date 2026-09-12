import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <InfoPage title="Pricing">
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Free, for now</h2>
        <p>
          Litigo is free to use while it&rsquo;s in early development — every feature on this site, including
          case tracking, hearings, tasks, notes, research, and document uploads, is available at no cost.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">What about later?</h2>
        <p>
          If paid plans are introduced down the line, existing users will be told well in advance — nothing
          changes on you without notice.
        </p>
      </section>
      <p className="pt-2">
        <Link href="/signup" className="font-medium text-gray-900 underline">
          Get started free →
        </Link>
      </p>
    </InfoPage>
  );
}
