import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return (
    <InfoPage title="Our Story">
      <p>
        I&rsquo;m Saikat Das, a practicing advocate based in Kolkata. I started building Litigo because I
        know the problem firsthand — not as a software idea looking for a market, but as something I live
        with in my own practice.
      </p>
      <p>
        Every matter I&rsquo;ve argued has taught me something — an argument that worked, an authority that
        held up, a question a particular bench likes to ask. But that knowledge never lived anywhere I could
        actually find it again. It was scattered across old files, notebooks, PDFs, and WhatsApp messages,
        and more of it disappeared than I&rsquo;d like to admit.
      </p>
      <p>
        The case-management software that does exist tends to be built for large firms — billing modules,
        client portals, features a solo litigator will never touch. None of it solved the actual problem:
        remembering what I&rsquo;d already learned.
      </p>
      <p>
        So I started building Litigo for myself first, shaped by how I actually work in court, not by how
        generic legal software assumes advocates work. It&rsquo;s still early, and it&rsquo;s still growing
        one feature at a time — but the goal hasn&rsquo;t changed since the first line of it: give every
        advocate a permanent, searchable record of their own experience.
      </p>
    </InfoPage>
  );
}
