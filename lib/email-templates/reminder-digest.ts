import type { ReminderItem } from "@/lib/reminders";
import { daysAwayLabel } from "@/lib/dates";

const SITE_URL = "https://mylitigo.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function kindLabelOf(kind: ReminderItem["kind"]) {
  if (kind === "hearing") return "Hearing";
  if (kind === "limitation") return "Limitation";
  if (kind === "appointment") return "Appointment";
  return "Task";
}

function titleOf(item: ReminderItem) {
  if (item.kind === "hearing" || item.kind === "limitation") return item.caseTitle;
  if (item.caseId) return `${item.title} — ${item.caseTitle}`;
  return item.title;
}

function rowHtml(item: ReminderItem) {
  const label = daysAwayLabel(item.date);
  const kindLabel = kindLabelOf(item.kind);
  const title = titleOf(item);
  const critical = item.isCritical
    ? ' <span style="color:#b91c1c;font-weight:600;font-size:11px;text-transform:uppercase;">Critical</span>'
    : "";

  return `
    <tr>
      <td style="padding:12px 0;border-top:1px solid #e5e7eb;">
        <span style="display:inline-block;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.02em;">${kindLabel}</span>${critical}
        <div style="margin-top:2px;font-size:14px;color:#111827;">${escapeHtml(title)}</div>
        <div style="margin-top:2px;font-size:12px;color:#6b7280;">${item.date} · ${label}</div>
      </td>
    </tr>`;
}

export function buildReminderDigestEmail(recipientName: string | null, items: ReminderItem[]) {
  const greeting = recipientName ? `Hi ${recipientName},` : "Hi,";
  const count = items.length;
  const subject = count === 1 ? "1 upcoming reminder on Litigo" : `${count} upcoming reminders on Litigo`;

  const rows = items.map(rowHtml).join("");
  const text = [
    greeting,
    "",
    ...items.map(
      (item) =>
        `${kindLabelOf(item.kind)}: ${titleOf(item)} (${item.date}, ${daysAwayLabel(item.date)})${
          item.isCritical ? " [CRITICAL]" : ""
        }`
    ),
    "",
    `Open Litigo: ${SITE_URL}/dashboard`,
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px;">
                  <span style="display:inline-block;width:24px;height:24px;border-radius:6px;background:#18181b;color:#ffffff;font-weight:700;font-size:13px;line-height:24px;text-align:center;">L</span>
                  <span style="font-weight:600;font-size:14px;color:#111827;">Litigo</span>
                </div>
                <p style="margin:0 0 4px;font-size:14px;color:#111827;">${greeting}</p>
                <p style="margin:0 0 16px;font-size:14px;color:#6b7280;">
                  ${count === 1 ? "You have 1 upcoming reminder" : `You have ${count} upcoming reminders`} on Litigo.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
                <a href="${SITE_URL}/dashboard" style="display:inline-block;margin-top:24px;background:#18181b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:10px 20px;border-radius:8px;">
                  Open Litigo
                </a>
                <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;">
                  You're receiving this because you turned on email reminders in Litigo Settings.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
