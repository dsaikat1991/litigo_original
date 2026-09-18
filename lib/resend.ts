import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily constructed so importing this file doesn't blow up when the env var is unset (e.g. local dev without email configured). */
export function getResendClient() {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}
