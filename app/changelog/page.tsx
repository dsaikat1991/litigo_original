import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in Litigo, most recent first.",
};

type Release = { heading: string; items: string[] };

/** Strips inline markdown (`code`, [text](url)) down to plain text — keeps **bold** for `renderBold` to turn into <strong> at render time. */
function stripInlineMarkdown(text: string) {
  return text.replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/**
 * Parses PUBLIC_CHANGELOG.md — a hand-curated, customer-facing summary. This
 * is deliberately a separate file from CHANGELOG.md (the full engineering
 * log, which stays internal-only): that one has table names, migration
 * files, and security implementation detail that's meaningless — or
 * needlessly revealing — to an advocate using the product.
 */
function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  let current: Release | null = null;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.startsWith("## ")) {
      current = { heading: stripInlineMarkdown(line.replace(/^##\s*/, "")), items: [] };
      releases.push(current);
    } else if (line.startsWith("- ") && current) {
      current.items.push(stripInlineMarkdown(line.slice(2)));
    }
  }

  return releases;
}

function renderBold(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function ChangelogPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "PUBLIC_CHANGELOG.md"), "utf-8");
  const releases = parseChangelog(markdown);

  return (
    <InfoPage title="Changelog" disclaimer="What's new in Litigo, most recent first.">
      {releases.map((release) => (
        <section key={release.heading}>
          <h2 className="mb-2 font-semibold text-gray-900">{release.heading}</h2>
          <ul className="list-disc space-y-1 pl-5">
            {release.items.map((item, i) => (
              <li key={i}>{renderBold(item)}</li>
            ))}
          </ul>
        </section>
      ))}
    </InfoPage>
  );
}
