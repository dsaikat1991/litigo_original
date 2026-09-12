import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <InfoPage title="Careers">
      <p>We&rsquo;re not hiring right now — Litigo is currently built and maintained by a small, focused team.</p>
      <p>
        If that changes, openings will be posted here. In the meantime, if you&rsquo;re interested in what
        we&rsquo;re building, feel free to{" "}
        <a href="mailto:hello@mylitigo.com" className="font-medium text-gray-900 underline">
          get in touch
        </a>
        .
      </p>
    </InfoPage>
  );
}
