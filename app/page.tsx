import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarClock, Search, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const FEATURES = [
  {
    icon: FileText,
    title: "Track every case",
    description: "Case details, client and opposing party info, and full hearing history — all in one record.",
  },
  {
    icon: CalendarClock,
    title: "Never miss a date",
    description: "A calendar of every upcoming hearing across your entire caseload, kept in sync automatically.",
  },
  {
    icon: Search,
    title: "Find anything instantly",
    description: "Search cases, notes, and hearings by keyword, date range, or tag — even with a typo.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Every record is scoped to you alone, enforced at the database level, not just the app.",
  },
];

const STEPS = [
  { step: "01", title: "Create your account", description: "Sign up in under a minute — no credit card, no setup." },
  { step: "02", title: "Add your cases", description: "Log each matter once, with client, court, and case details." },
  { step: "03", title: "Show up prepared", description: "Check your calendar, log what happened, and move to the next hearing." },
];

const MOCK_CASES = [
  { title: "State vs. Banerjee", meta: "R. Banerjee · Sessions Court", status: "Active", statusStyle: "bg-green-50 text-green-700" },
  { title: "Ghosh Property Dispute", meta: "A. Ghosh · District Court", status: "Adjourned", statusStyle: "bg-amber-50 text-amber-700" },
  { title: "Mehta vs. Mehta", meta: "S. Mehta · Family Court", status: "Active", statusStyle: "bg-green-50 text-green-700" },
];

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Litigo" className="h-5 w-auto" />
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Sign up free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gray-100 to-white blur-3xl"
        />
        <div className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-24">
          <span className="mb-5 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
            Built for solo advocates in India
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Your case diary,
            <br />
            finally digital.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-gray-600 sm:text-lg">
            Replace the physical diary, WhatsApp threads, and Excel sheets with one place for
            your cases, hearing dates, and notes — built to work as fast as you do in court.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="flex items-center gap-1.5 rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Product preview */}
        <div className="mx-auto mt-16 max-w-3xl px-6 sm:mt-20">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/40">
            <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            </div>
            <div className="p-6 text-left">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Your cases</span>
                <span className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">+ New case</span>
              </div>
              <div className="space-y-2">
                {MOCK_CASES.map((c) => (
                  <div
                    key={c.title}
                    className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{c.title}</p>
                      <p className="text-xs text-gray-500">{c.meta}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.statusStyle}`}>{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Everything a solo practice actually needs
          </h2>
          <p className="mt-3 text-gray-600">No billing, no bloat — just the diary, done right.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg border border-gray-200 p-6">
              <f.icon className="mb-3 h-5 w-5 text-gray-900" strokeWidth={1.75} />
              <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Up and running today</h2>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step}>
                <span className="text-sm font-semibold text-gray-400">{s.step}</span>
                <h3 className="mt-2 mb-1 text-sm font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gray-900 py-20 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Start your digital diary today</h2>
          <p className="mt-3 text-sm text-gray-400">Free to use. Set up your first case in under a minute.</p>
          <Link
            href="/signup"
            className="mt-7 inline-flex items-center gap-1.5 rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        <p className="mb-2">Litigo</p>
        <Link href="/privacy" className="hover:text-gray-600">
          Privacy
        </Link>
        {" · "}
        <Link href="/terms" className="hover:text-gray-600">
          Terms
        </Link>
      </footer>
    </div>
  );
}
