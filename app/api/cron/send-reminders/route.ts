import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { listAllProfilesForReminders } from "@/lib/data/profiles";
import { listCasesWithHearingWithinForAdvocate, listCasesWithLimitationWithinForAdvocate } from "@/lib/data/cases";
import { listUpcomingTasksForAdvocate } from "@/lib/data/tasks";
import { listReminderEmailLog, recordReminderEmailsSent } from "@/lib/data/reminder-email-log";
import { buildReminders, filterRemindersByPreference } from "@/lib/reminders";
import { daysAway } from "@/lib/dates";
import { buildReminderDigestEmail } from "@/lib/email-templates/reminder-digest";
import { getResendClient } from "@/lib/resend";

/**
 * Sends the daily hearing/task reminder-email digest. Triggered by Vercel Cron
 * (see vercel.json — 02:30 UTC = 08:00 IST) via a GET request carrying
 * `Authorization: Bearer <CRON_SECRET>`, which Vercel adds automatically when
 * a `CRON_SECRET` env var is set on the project.
 *
 * `daysAway` (lib/dates.ts) computes "today" from the server's local calendar
 * date, which on Vercel is UTC. Running this between UTC 00:00 and 18:30 keeps
 * that in sync with IST's own calendar day (IST rolls over at UTC 18:30) — an
 * earlier or later schedule would need this reconsidered.
 */
export const dynamic = "force-dynamic";

/** The widest reminder threshold Settings offers (7/3/1/0 days) — how far out we need to fetch. */
const MAX_THRESHOLD_DAYS = 7;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const resend = getResendClient();
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  const { data: profiles, error: profilesError } = await listAllProfilesForReminders(supabase);
  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  let emailsSent = 0;
  const errors: { advocateId: string; message: string }[] = [];

  for (const profile of profiles ?? []) {
    if (profile.reminder_email_days.length === 0) continue;

    try {
      const [{ data: cases }, { data: tasks }, { data: limitationCases }, { data: alreadySent }] = await Promise.all([
        listCasesWithHearingWithinForAdvocate(supabase, profile.id, MAX_THRESHOLD_DAYS),
        listUpcomingTasksForAdvocate(supabase, profile.id, MAX_THRESHOLD_DAYS),
        listCasesWithLimitationWithinForAdvocate(supabase, profile.id, MAX_THRESHOLD_DAYS),
        listReminderEmailLog(supabase, profile.id),
      ]);

      const reminders = filterRemindersByPreference(
        buildReminders(cases ?? [], tasks ?? [], limitationCases ?? []),
        profile.reminder_email_days
      );

      const sentKeys = new Set(
        (alreadySent ?? []).map((row) => `${row.item_kind}:${row.item_id}:${row.threshold_days}`)
      );

      const toSend = reminders.filter((r) => {
        const threshold = Math.max(daysAway(r.date), 0);
        const [, id] = r.id.split(/-(.+)/); // "hearing-<uuid>" / "task-<uuid>" -> uuid
        return !sentKeys.has(`${r.kind}:${id}:${threshold}`);
      });

      if (toSend.length === 0) continue;

      const {
        data: { user },
      } = await supabase.auth.admin.getUserById(profile.id);
      if (!user?.email) continue;

      const { subject, html, text } = buildReminderDigestEmail(profile.full_name, toSend);

      if (fromEmail) {
        await resend.emails.send({ from: `Reminder: Litigo <${fromEmail}>`, to: user.email, subject, html, text });
      }

      await recordReminderEmailsSent(
        supabase,
        toSend.map((r) => {
          const [, id] = r.id.split(/-(.+)/);
          return {
            advocate_id: profile.id,
            item_kind: r.kind,
            item_id: id,
            threshold_days: Math.max(daysAway(r.date), 0),
          };
        })
      );

      emailsSent += 1;
    } catch (err) {
      errors.push({ advocateId: profile.id, message: err instanceof Error ? err.message : "Unknown error" });
    }
  }

  return NextResponse.json({ advocatesChecked: profiles?.length ?? 0, emailsSent, errors });
}
