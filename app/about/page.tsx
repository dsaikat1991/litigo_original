import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <InfoPage title="About Litigo">
      <p className="text-base font-medium text-gray-900">
        Every case you argue leaves something behind. Litigo is where it stays.
      </p>
      <p>
        A litigating advocate builds real expertise over a career — arguments that worked, authorities that
        held up, questions a particular bench tends to ask, mistakes made once and never again. Yet very
        little of that knowledge lives in one place. It ends up scattered across old files, notebooks, case
        diaries, PDFs, WhatsApp messages, desktop folders, and memory that fades faster than the next matter
        arrives.
      </p>
      <p>
        Litigo exists to solve one specific problem: the moment an advocate says, &ldquo;I know I&rsquo;ve
        argued this before — I just can&rsquo;t find it.&rdquo;
      </p>
      <p>
        We believe that the knowledge gained from every matter is one of an advocate&rsquo;s most valuable
        professional assets. It shouldn&rsquo;t disappear once a case concludes. It should remain
        searchable, reusable, and continue to strengthen every matter that follows.
      </p>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">More Than Case Management</h2>
        <p>Litigo is not trying to replace every piece of software a law office uses.</p>
        <p className="mt-2">
          It isn&rsquo;t a billing platform. It isn&rsquo;t an office management suite. It isn&rsquo;t a
          database of published judgments or another legal research platform.
        </p>
        <p className="mt-2">
          Instead, Litigo focuses on something surprisingly overlooked: preserving your own legal
          experience.
        </p>
        <p className="mt-2">
          Every case contains knowledge that cannot be downloaded from a legal database — the arguments you
          framed, the authorities you relied upon, the objections you anticipated, the strategy that
          succeeded, the approach that failed, and the lessons you would never want to lose.
        </p>
        <p className="mt-2">Litigo brings all of that together in one place.</p>
        <p className="mt-2">Every case becomes a living record of your work, not just another closed file.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Built for Litigating Advocates</h2>
        <p>Litigo is designed specifically for advocates who regularly appear before courts.</p>
        <p className="mt-2">
          Whether you&rsquo;re handling civil disputes, criminal matters, constitutional litigation,
          commercial disputes, consumer cases, family matters, labour matters, or tribunal proceedings,
          every appearance teaches something worth remembering.
        </p>
        <p className="mt-2">Over time, those lessons become your professional advantage.</p>
        <p className="mt-2">Litigo helps you capture:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Case timelines and important events</li>
          <li>Arguments presented before the court</li>
          <li>Legal research and authorities relied upon</li>
          <li>Personal notes and observations</li>
          <li>Practical lessons from every matter</li>
          <li>Searchable knowledge that can be reused years later</li>
        </ul>
        <p className="mt-2">
          Instead of searching through folders, diaries, or hundreds of PDFs, you can search across your own
          practice and instantly find what you&rsquo;ve already learned.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Your Legal Experience Should Compound</h2>
        <p>Every profession benefits from accumulated knowledge.</p>
        <p className="mt-2">
          Doctors rely on years of clinical experience.
          <br />
          Engineers build on previous designs.
          <br />
          Architects refine every project they complete.
        </p>
        <p className="mt-2">
          Advocates deserve the same advantage.
          <br />
          Every completed matter should make the next one easier.
        </p>
        <p className="mt-2">
          Instead, valuable legal experience often disappears because it was never stored in a way that
          could be found again.
        </p>
        <p className="mt-2">Litigo exists to change that.</p>
        <p className="mt-2">
          The platform turns years of litigation into a growing, searchable knowledge base that belongs
          entirely to you.
        </p>
        <p className="mt-2">
          Because the best legal strategy isn&rsquo;t always discovering something new.
          <br />
          Often, it&rsquo;s remembering something you&rsquo;ve already learned.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Built India First</h2>
        <p>Litigo is proudly built in India for advocates practicing in India.</p>
        <p className="mt-2">
          The Indian legal system has its own courts, procedures, terminology, workflows, and day-to-day
          realities. Rather than attempting to build software for every jurisdiction at once, we chose to
          focus on solving the problem properly for Indian litigators first.
        </p>
        <p className="mt-2">
          That means building around the way advocates actually work — not the way generic legal software
          assumes they work.
        </p>
        <p className="mt-2">
          As Litigo evolves, our commitment remains the same: create practical tools that fit naturally into
          the daily practice of litigation.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">What We&rsquo;re Building</h2>
        <p>Our vision is simple.</p>
        <p className="mt-2">We want every advocate to have a permanent legal memory.</p>
        <p className="mt-2">
          A place where every argument, every research note, every observation, and every lesson from every
          matter remains available whenever it&rsquo;s needed.
        </p>
        <p className="mt-2">
          Not locked inside old files.
          <br />
          Not buried inside notebooks.
          <br />
          Not forgotten after years of practice.
        </p>
        <p className="mt-2">
          Just searchable.
          <br />
          Instantly.
          <br />
          Ready when the next case arrives.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Our Mission</h2>
        <p>The best advocates don&rsquo;t simply work harder — they build upon everything they&rsquo;ve learned.</p>
        <p className="mt-2">Our mission is to help every advocate preserve that learning.</p>
        <p className="mt-2">
          One case.
          <br />
          One argument.
          <br />
          One lesson at a time.
        </p>
        <p className="mt-2">
          Whether you&rsquo;ve handled ten matters or ten thousand, your experience should become more
          valuable every year — not harder to find.
        </p>
        <p className="mt-2 font-medium text-gray-900">That&rsquo;s what Litigo is built to do.</p>
      </section>
    </InfoPage>
  );
}
