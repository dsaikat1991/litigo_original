/**
 * ISO date string (YYYY-MM-DD) for today, or `days` days from today, using
 * the server's local calendar date. Deliberately avoids `toISOString()`,
 * which converts to UTC and rolls the date back by one for any timezone
 * ahead of UTC during its early morning hours (e.g. IST just after midnight).
 */
export function isoDateDaysFromNow(days: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Human label for how far away a date is: "Overdue", "Today", "Tomorrow", or "In N days". */
export function daysAwayLabel(dateStr: string): string {
  const today = new Date(`${isoDateDaysFromNow(0)}T00:00:00Z`);
  const target = new Date(`${dateStr}T00:00:00Z`);
  const diffDays = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return `In ${diffDays} days`;
}

/** Tailwind classes for a days-away badge, most urgent first. */
export function daysAwayStyle(dateStr: string): string {
  const label = daysAwayLabel(dateStr);
  if (label === "Overdue" || label === "Today") return "bg-red-50 text-red-700";
  if (label === "Tomorrow") return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-600";
}
