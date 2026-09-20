/**
 * Client/opposing-party names are stored as a single comma-separated string
 * (client_name, opposing_party columns) rather than a real array column —
 * both fields are threaded through 9+ files (case list, search, dashboard,
 * today page...) that all expect a plain string, so this avoids a schema
 * migration while still letting the form collect multiple names.
 */

export function joinNames(values: string[]): string | null {
  const cleaned = values.map((v) => v.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned.join(", ") : null;
}

export function splitNames(value: string | null): string[] {
  if (!value) return [""];
  const parts = value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [""];
}
