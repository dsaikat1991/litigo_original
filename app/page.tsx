import { Fragment } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList, Layers, Search, ArrowRight, ChevronRight, BookOpen, Plus, Scale, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SiteFooter } from "@/components/marketing/site-footer";

const CAPTURE_BUILD_FIND = [
  {
    number: "01",
    icon: ClipboardList,
    label: "Capture",
    title: "The details that matter, while they are fresh.",
    description:
      "Keep hearing notes, next steps, and the small details of a matter together — without adding another place to check.",
    tag: "Timeline",
  },
  {
    number: "02",
    icon: Layers,
    label: "Build",
    title: "A record that keeps\ngetting richer over time.",
    description: "Bring the story of each case together as it unfolds, from the first filing to the last order.",
    tag: "Case file",
  },
  {
    number: "03",
    icon: Search,
    label: "Find",
    title: "The right detail, before the next hearing.",
    description:
      "Search your own experience when you need it. Past matters, useful notes, and context stay close at hand.",
    tag: "Search",
  },
];

const STEPS = [
  { step: "01", icon: BookOpen, title: "Create your account", description: "A quiet place for the work you already do." },
  { step: "02", icon: Plus, title: "Add your cases", description: "Start with the matters on your desk right now." },
  { step: "03", icon: Scale, title: "Show up prepared", description: "Keep the context you need close to the next hearing." },
];

const MOCK_CASES = [
  {
    title: "State vs. Banerjee",
    type: "Criminal",
    client: "R. Banerjee",
    court: "Sessions Court",
    nextDate: "16 Sep",
    urgencyLabel: "In 2 days",
    urgencyStyle: "bg-amber-50 text-amber-700",
    status: "Active",
    statusStyle: "bg-green-50 text-green-700",
  },
  {
    title: "Ghosh Property Dispute",
    type: "Civil",
    client: "A. Ghosh",
    court: "District Court",
    nextDate: "22 Sep",
    urgencyLabel: "In 8 days",
    urgencyStyle: "bg-gray-100 text-gray-600",
    status: "Adjourned",
    statusStyle: "bg-amber-50 text-amber-700",
  },
  {
    title: "Mehta vs. Mehta",
    type: "Family",
    client: "S. Mehta",
    court: "Family Court",
    nextDate: "17 Sep",
    urgencyLabel: "In 3 days",
    urgencyStyle: "bg-amber-50 text-amber-700",
    status: "Active",
    statusStyle: "bg-green-50 text-green-700",
  },
];

const MOCK_CASE_DETAIL = {
  title: "Sharma vs Verma",
  status: "Active",
  statusStyle: "bg-green-50 text-green-700",
  client: "R.D. Sharma",
  court: "High Court, Calcutta",
  caseType: "Writ",
  nextHearing: "17 Sep 2026",
};

const MOCK_RELATED_CASE = {
  title: "IA No. 5 of 2026",
  type: "Civil",
  status: "Active",
  statusStyle: "bg-green-50 text-green-700",
  lastHearing: "05 Sep 2026",
  lastPurpose: "Heard and disposed",
};

const MOCK_TIMELINE = [
  {
    date: "12 Sep 2026",
    kind: "note" as const,
    badge: "Note",
    content: "Client confirmed no settlement possible; proceeding to trial.",
  },
  {
    date: "05 Sep 2026",
    kind: "hearing" as const,
    badge: "Hearing",
    purpose: "Arguments on interim application",
    next: "17 Sep 2026 — Final arguments",
  },
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
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
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
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-0 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gray-100 to-white blur-3xl"
        />
        <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Built for solo advocates in India
            </span>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-gray-900 sm:text-7xl">
              Your case diary,
              <br />
              finally digital.
            </h1>
            <p className="mt-6 max-w-xl text-base text-gray-600 sm:text-lg">
              Replace the physical diary, WhatsApp threads, and Excel sheets with one place for
              your cases, hearing dates, and notes — built to work as fast as you do in court.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="flex items-center gap-1.5 rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-1 rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Sign in
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/40 sm:mt-14">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-md border border-gray-100 bg-white px-3 py-1 text-xs text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                mylitigo.com/dashboard
              </div>
            </div>

            {/* App nav bar, mirroring the real NavBar */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-2.5 text-left">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-900">Litigo</span>
                <div className="hidden items-center gap-3 text-xs font-medium sm:flex">
                  <span className="text-gray-900">Cases</span>
                  <span className="text-gray-400">Today</span>
                  <span className="text-gray-400">Calendar</span>
                  <span className="text-gray-400">Notes</span>
                </div>
              </div>
              <div className="hidden items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1 text-gray-400 sm:flex">
                <Search className="h-3 w-3" />
                <span className="text-xs">Search cases, notes, hearings...</span>
              </div>
              <span className="h-5 w-5 shrink-0 rounded-full bg-gray-200" />
            </div>

            {/* Dashboard content */}
            <div className="p-6 text-left">
              <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "Active cases", value: "3" },
                  { label: "Hearings this week", value: "2" },
                  { label: "Tasks due this week", value: "1" },
                  { label: "Critical deadlines", value: "0" },
                ].map((s) => (
                  <div key={s.label} className="rounded-md border border-gray-200 bg-gray-50/60 px-3 py-2">
                    <p className="text-sm font-semibold text-gray-900">{s.value}</p>
                    <p className="text-[11px] text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-3 flex items-center justify-between">
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{c.title}</p>
                        <span className="hidden rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 sm:inline">
                          {c.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{c.client} · {c.court}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="hidden items-center gap-1.5 sm:flex">
                        <span className="text-xs text-gray-500">{c.nextDate}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${c.urgencyStyle}`}>
                          {c.urgencyLabel}
                        </span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.statusStyle}`}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 text-xs text-gray-500 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
            <p>Cases, hearings, notes — in one considered place.</p>
            <p className="flex items-center gap-1.5">
              <Check className="h-3 w-3" />
              Made for the rhythm of court work
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200" />
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24 sm:py-32">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              A better record of the work
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
              Less looking back.
              <br />
              More moving forward.
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 sm:pt-1">
            <p>
              A legal practice is built on what you remember — the argument that worked, the detail that
              changed the direction of a matter, the order you need to find again.
            </p>
            <p>Litigo gives that experience a place to accumulate, so the next case can begin with more than a blank page.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
          {CAPTURE_BUILD_FIND.map((f) => (
            <div key={f.label} className="border-t border-gray-200 pt-8">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-gray-200">
                <f.icon className="h-4 w-4 text-gray-700" strokeWidth={1.75} />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">{f.label}</p>
              <h3 className="mb-2 whitespace-pre-line text-lg font-bold leading-snug text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-xs text-gray-400">{f.number}</span>
                <span className="h-px w-6 bg-gray-300" />
                <span className="text-xs font-medium text-gray-500">{f.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case page preview */}
      <section className="relative overflow-hidden border-t border-gray-100 pt-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Inside every case</p>
          <h2 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl">
            The whole matter,
            <br />
            one page deep.
          </h2>
          <p className="mt-4 max-w-md text-gray-600">
            Case details, related proceedings, and a timeline of every hearing and note — organized the moment
            you open it.
          </p>

          {/* MacBook mockup — deliberately cut off flat at the section boundary below, like it's still scrolling */}
          <div className="-mb-16 mt-16 sm:-mb-20 sm:mt-20">
            <div className="rounded-t-xl bg-gray-900 p-1.5">
              <div className="mx-auto mb-1 h-1 w-1 rounded-full bg-gray-700" />
              <div className="overflow-hidden rounded-t-md bg-white">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-gray-300" />
                    <span className="h-2 w-2 rounded-full bg-gray-300" />
                    <span className="h-2 w-2 rounded-full bg-gray-300" />
                  </div>
                  <div className="mx-auto flex items-center gap-1.5 rounded-md border border-gray-100 bg-white px-3 py-1 text-xs text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                    mylitigo.com/cases/sharma-vs-verma
                  </div>
                </div>

                {/* Mini nav bar */}
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-2 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-900">Litigo</span>
                    <div className="hidden items-center gap-2.5 text-[11px] font-medium sm:flex">
                      <span className="text-gray-900">Cases</span>
                      <span className="text-gray-400">Today</span>
                      <span className="text-gray-400">Calendar</span>
                      <span className="text-gray-400">Notes</span>
                    </div>
                  </div>
                  <span className="h-4 w-4 shrink-0 rounded-full bg-gray-200" />
                </div>

                {/* Case detail content */}
                <div className="p-5 text-left">
                  <div className="mb-3 rounded-md border border-gray-200 p-3">
                    <div className="mb-1.5 flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900">{MOCK_CASE_DETAIL.title}</p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${MOCK_CASE_DETAIL.statusStyle}`}
                      >
                        {MOCK_CASE_DETAIL.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-gray-500">
                      <p>
                        Client: <span className="text-gray-700">{MOCK_CASE_DETAIL.client}</span>
                      </p>
                      <p>
                        Court: <span className="text-gray-700">{MOCK_CASE_DETAIL.court}</span>
                      </p>
                      <p>
                        Case type: <span className="text-gray-700">{MOCK_CASE_DETAIL.caseType}</span>
                      </p>
                      <p>
                        Next hearing:{" "}
                        <span className="font-medium text-gray-900">{MOCK_CASE_DETAIL.nextHearing}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-md border border-gray-200 p-3">
                    <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Related proceedings
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-gray-900">{MOCK_RELATED_CASE.title}</span>
                        <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                          {MOCK_RELATED_CASE.type}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${MOCK_RELATED_CASE.statusStyle}`}
                      >
                        {MOCK_RELATED_CASE.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Last hearing: {MOCK_RELATED_CASE.lastHearing} — {MOCK_RELATED_CASE.lastPurpose}
                    </p>
                  </div>

                  <div className="mb-3 flex items-center gap-3 border-b border-gray-100 pb-2 text-[11px] font-medium">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-900">Timeline</span>
                    <span className="text-gray-400">Hearings · 2</span>
                    <span className="hidden text-gray-400 sm:inline">Tasks</span>
                    <span className="hidden text-gray-400 sm:inline">Documents</span>
                    <span className="text-gray-400">Notes · 1</span>
                  </div>

                  <div className="space-y-2.5">
                    {MOCK_TIMELINE.map((item) => (
                      <div key={item.date} className="flex gap-3">
                        <span className="w-14 shrink-0 pt-0.5 text-right text-[10px] text-gray-400">
                          {item.date}
                        </span>
                        <div className="min-w-0 flex-1 rounded-md border border-gray-100 bg-gray-50/60 p-2.5">
                          <span className="mb-1 inline-block rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                            {item.badge}
                          </span>
                          {item.kind === "note" ? (
                            <p className="text-[11px] text-gray-600">{item.content}</p>
                          ) : (
                            <>
                              <p className="text-[11px] font-medium text-gray-900">{item.purpose}</p>
                              <p className="mt-1 rounded bg-gray-100/80 px-2 py-1 text-[10px] text-gray-500">
                                Next hearing: <span className="font-medium text-gray-700">{item.next}</span>
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">How it works</p>
          <h2 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl">
            Set up once.
            <br />
            Keep going.
          </h2>
          <p className="mt-4 max-w-md text-gray-600">
            Litigo fits around the way you already work. No new process to learn — just a more reliable place to
            keep it.
          </p>

          <div className="mt-16 flex flex-col gap-10 sm:mt-20 sm:flex-row sm:items-start sm:gap-0">
            {STEPS.map((s, i) => (
              <Fragment key={s.step}>
                <div className="sm:flex-1">
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white">
                    <s.icon className="h-5 w-5 text-gray-700" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">{s.step}</span>
                  <h3 className="mt-1 mb-1 text-base font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </div>
                {i < STEPS.length - 1 && <div className="hidden h-px sm:mt-6 sm:block sm:flex-1 sm:bg-gray-200" />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Start with the next case
              </p>
              <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
                Start your digital
                <br />
                diary today
              </h2>
              <p className="mt-4 max-w-sm text-gray-400">Free to use. Set up your first case in under a minute.</p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
                >
                  Create your account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-1 rounded-md border border-gray-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Sign in
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden w-px bg-gray-700 sm:block" />
            <div className="sm:pt-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                A calm place for serious work
              </p>
              <p className="max-w-xs text-sm text-gray-400">
                Your matters, your notes, your way of working — kept together.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-gray-700 pt-6 sm:mt-16">
            <p className="text-sm text-gray-400">
              Already using Litigo?{" "}
              <Link href="/login" className="font-semibold text-white underline underline-offset-2">
                Sign in to your diary
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
