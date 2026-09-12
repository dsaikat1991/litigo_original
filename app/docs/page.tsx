import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Documentation" };

export default function DocsPage() {
  return (
    <InfoPage title="Documentation">
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Cases</h2>
        <p>
          Add a case from the dashboard with the client, opposing party, court, case type, and any tags.
          You can link a case to another as a related proceeding — for an IA, interim application, appeal,
          or execution arising from it.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Timeline</h2>
        <p>
          Every case has a Timeline tab — hearings, completed tasks, and notes merged into one chronological
          feed, so you can review a case&rsquo;s full history before you walk into court.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Hearings</h2>
        <p>
          Log a hearing&rsquo;s date, purpose, what happened, and the next date fixed. A collapsed &ldquo;More
          details&rdquo; section holds bench, judge, courtroom, stage, attendance, and more, for when you
          need it.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Tasks, Notes &amp; Research</h2>
        <p>
          Tasks track to-dos with an optional due date — flag one as a critical deadline (like a limitation
          period) and it gets a red badge everywhere it appears. Notes and learnings are freeform, standalone
          or case-linked. Research tracks case law, statutes, and articles you&rsquo;ve found.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Documents</h2>
        <p>
          Upload PDFs, Word documents, or images to a case — petitions, orders, evidence. Files are private
          and only ever opened through a short-lived signed link.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Reminders</h2>
        <p>
          The dashboard, notification bell, and Today&rsquo;s cause list surface upcoming and overdue
          hearings and tasks. Choose which of the 7/3/1/0-day thresholds remind you in Settings.
        </p>
      </section>
    </InfoPage>
  );
}
