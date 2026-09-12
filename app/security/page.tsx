import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <InfoPage title="Security">
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Row-level isolation</h2>
        <p>
          Every table — cases, hearings, tasks, notes, research, documents — enforces row-level security at
          the database level, not just in the app. An advocate can only ever read or write their own
          records; there is no code path that bypasses this.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Authentication</h2>
        <p>
          Sign in with email and password, or Google. Passwords are never stored by Litigo directly —
          authentication is handled by Supabase Auth.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Document storage</h2>
        <p>
          Uploaded case documents live in a private storage bucket, not a public one. Every file is only
          ever accessed through a short-lived signed link generated at the moment you open it — there is no
          permanent public URL for any document you upload.
        </p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Transport</h2>
        <p>Every connection to Litigo, in the browser and to the database, is encrypted over HTTPS.</p>
      </section>
      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Reporting an issue</h2>
        <p>
          If you find a security issue, please email{" "}
          <a href="mailto:hello@mylitigo.com" className="font-medium text-gray-900 underline">
            hello@mylitigo.com
          </a>
          .
        </p>
      </section>
    </InfoPage>
  );
}
