import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <InfoPage title="Blog">
      <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        No posts yet — check back soon.
      </p>
    </InfoPage>
  );
}
