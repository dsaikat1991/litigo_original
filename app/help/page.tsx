import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Help Centre" };

export default function HelpPage() {
  return (
    <InfoPage title="Help Centre">
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Is my data private?</h2>
        <p>
          Yes. Every record is scoped to your account at the database level — no one else can see your
          cases, not even other Litigo users.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Can I share a case with another advocate or a junior?</h2>
        <p>Not yet — Litigo is currently single-user per account.</p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Is there a mobile app?</h2>
        <p>Not a native app, but Litigo works as a responsive website on your phone&rsquo;s browser.</p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">How do I delete my account?</h2>
        <p>
          Go to Settings and use Delete Account — it permanently removes your account and everything in it.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Still stuck?</h2>
        <p>
          See the{" "}
          <Link href="/docs" className="font-medium text-gray-900 underline">
            Documentation
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-medium text-gray-900 underline">
            contact us
          </Link>
          .
        </p>
      </section>
    </InfoPage>
  );
}
