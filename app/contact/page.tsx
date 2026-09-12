import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <InfoPage title="Contact">
      <p>
        Questions, feedback, or something not working right? Reach us at{" "}
        <a href="mailto:hello@mylitigo.com" className="font-medium text-gray-900 underline">
          hello@mylitigo.com
        </a>
        .
      </p>
    </InfoPage>
  );
}
