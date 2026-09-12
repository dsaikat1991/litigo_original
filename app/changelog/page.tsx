import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Changelog" };

type Section = { heading: string; items: string[] };
type Release = { version: string; sections: Section[] };

/** Strips inline markdown (`code`, **bold**, [text](url)) down to plain text. */
function stripInlineMarkdown(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  let currentRelease: Release | null = null;
  let currentSection: Section | null = null;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.startsWith("## ")) {
      currentRelease = { version: stripInlineMarkdown(line.replace(/^##\s*/, "")), sections: [] };
      releases.push(currentRelease);
      currentSection = null;
    } else if (line.startsWith("### ") && currentRelease) {
      currentSection = { heading: line.replace(/^###\s*/, ""), items: [] };
      currentRelease.sections.push(currentSection);
    } else if (line.startsWith("- ") && currentSection) {
      currentSection.items.push(stripInlineMarkdown(line.slice(2)));
    }
  }

  return releases;
}

export default function ChangelogPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "CHANGELOG.md"), "utf-8");
  const releases = parseChangelog(markdown);

  return (
    <InfoPage title="Changelog" disclaimer="What's shipped, most recent first.">
      {releases.map((release) => (
        <section key={release.version}>
          <h2 className="mb-2 font-semibold text-gray-900">{release.version}</h2>
          <div className="space-y-3">
            {release.sections.map((section) => (
              <div key={section.heading}>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">{section.heading}</p>
                <ul className="list-disc space-y-1 pl-5">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </InfoPage>
  );
}
