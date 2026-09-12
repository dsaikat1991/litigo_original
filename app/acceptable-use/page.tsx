import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Acceptable Use Policy" };

export default function AcceptableUsePage() {
  return (
    <InfoPage title="Acceptable Use Policy" disclaimer="Last Updated: 12 September 2026">
      <p>
        This Acceptable Use Policy (“AUP”) describes the acceptable and prohibited uses of Litigo&rsquo;s
        website, application, software, and related services (collectively, the “Service”).
      </p>
      <p>
        This AUP forms part of the Litigo Terms of Use. By accessing or using Litigo, you agree to comply
        with this AUP.
      </p>
      <p>Capitalized terms not defined in this AUP have the meanings given to them in the Terms of Use.</p>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">1. Purpose</h2>
        <p>
          Litigo is designed to help advocates and legal professionals organize their professional
          knowledge, manage litigation-related information, preserve legal research, record arguments and
          lessons, and retrieve that information when needed.
        </p>
        <p className="mt-2">
          The Service must be used responsibly, lawfully, and in a manner that does not compromise the
          security, privacy, availability, or integrity of Litigo or its users.
        </p>
        <p className="mt-2">This AUP establishes the minimum standards expected when using Litigo.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">2. Lawful Use</h2>
        <p>
          You may use Litigo only for lawful purposes and in compliance with all applicable laws,
          regulations, professional obligations, and court requirements.
        </p>
        <p className="mt-2">You must not use Litigo to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Commit or facilitate a crime;</li>
          <li>Fraudulently obtain money, information, or services;</li>
          <li>Violate the rights of another person;</li>
          <li>Circumvent applicable laws or regulatory requirements;</li>
          <li>Facilitate unlawful activities;</li>
          <li>Store or distribute content that you are legally prohibited from possessing or transmitting.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">3. Legal and Professional Responsibilities</h2>
        <p>
          If you use Litigo in connection with your legal practice, you remain responsible for complying
          with your professional obligations.
        </p>
        <p className="mt-2">You must ensure that your use of Litigo is consistent with:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Applicable professional conduct rules;</li>
          <li>Advocate-client confidentiality obligations;</li>
          <li>Court rules and directions;</li>
          <li>Confidentiality agreements;</li>
          <li>Applicable data protection and privacy laws;</li>
          <li>Any contractual obligations applicable to information you upload.</li>
        </ul>
        <p className="mt-2">
          Litigo does not determine whether particular information may lawfully or professionally be
          uploaded to the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">4. Client and Confidential Information</h2>
        <p>
          Litigo may allow you to store information relating to clients, parties, witnesses, opposing
          parties, and other individuals.
        </p>
        <p className="mt-2">
          You must not upload or process information through Litigo unless you have the necessary legal
          authority, consent, authorization, or other lawful basis to do so.
        </p>
        <p className="mt-2">You are responsible for ensuring that your use of Litigo does not breach:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Client confidentiality;</li>
          <li>Legal professional obligations;</li>
          <li>Court orders;</li>
          <li>Non-disclosure agreements;</li>
          <li>Contractual restrictions;</li>
          <li>Applicable privacy laws.</li>
        </ul>
        <p className="mt-2">You should exercise particular care when uploading highly sensitive or confidential information.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">5. Account Security</h2>
        <p>You must take reasonable steps to protect your Litigo account.</p>
        <p className="mt-2">You must not:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Share your password with unauthorized persons;</li>
          <li>Allow unauthorized individuals to access your account;</li>
          <li>Circumvent authentication controls;</li>
          <li>Attempt to access another user&rsquo;s account;</li>
          <li>Use another person&rsquo;s credentials without authorization;</li>
          <li>Create accounts using false identities for the purpose of misleading Litigo or others.</li>
        </ul>
        <p className="mt-2">If you believe your account has been compromised, you should notify Litigo promptly.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">6. Prohibited Content</h2>
        <p>You must not knowingly use Litigo to store, transmit, or distribute content that:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Is unlawful;</li>
          <li>Infringes intellectual property rights;</li>
          <li>Violates privacy or confidentiality rights;</li>
          <li>Contains malicious code;</li>
          <li>Facilitates fraud;</li>
          <li>Facilitates unauthorized access to systems;</li>
          <li>Contains malware, ransomware, viruses, or other harmful software;</li>
          <li>Is intended to deceive or impersonate another person;</li>
          <li>Violates applicable court orders or legal restrictions.</li>
        </ul>
        <p className="mt-2">
          Litigo does not generally monitor or review User Content for compliance with this AUP. However, we
          may take appropriate action where we become aware of unlawful or prohibited use.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">7. Security and System Abuse</h2>
        <p>You must not interfere with or attempt to compromise the security, integrity, or availability of Litigo.</p>
        <p className="mt-2">Prohibited activities include:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Attempting to gain unauthorized access to Litigo systems;</li>
          <li>Attempting to access another user&rsquo;s data;</li>
          <li>Circumventing authentication or authorization controls;</li>
          <li>Probing or scanning systems for vulnerabilities without authorization;</li>
          <li>Introducing malicious code;</li>
          <li>Launching denial-of-service attacks;</li>
          <li>Attempting to overload infrastructure;</li>
          <li>Interfering with network traffic;</li>
          <li>Exploiting vulnerabilities without authorization;</li>
          <li>Attempting to bypass technical restrictions or security controls.</li>
        </ul>
        <p className="mt-2">
          If you discover a security vulnerability in Litigo, please report it to us rather than attempting
          to exploit it.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">8. Scraping and Automated Access</h2>
        <p>
          You must not use automated tools to access, scrape, crawl, copy, index, or extract information
          from Litigo in a manner that:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Circumvents technical restrictions;</li>
          <li>Places unreasonable load on the Service;</li>
          <li>Extracts information belonging to other users;</li>
          <li>Circumvents subscription or usage limits;</li>
          <li>Interferes with normal operation of the Service.</li>
        </ul>
        <p className="mt-2">
          This does not prohibit reasonable automated use through an API or other mechanism expressly
          provided or authorized by Litigo.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">9. Reverse Engineering</h2>
        <p>Except where expressly permitted by applicable law, you must not:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Reverse engineer the Service;</li>
          <li>Decompile the software;</li>
          <li>Disassemble the software;</li>
          <li>Attempt to derive source code;</li>
          <li>Circumvent technical protections;</li>
          <li>Attempt to reproduce the underlying architecture or functionality through unauthorized means.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">10. Circumventing Subscription Limits</h2>
        <p>You must not attempt to bypass limitations associated with your subscription plan.</p>
        <p className="mt-2">This includes attempting to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Circumvent document limits;</li>
          <li>Circumvent storage limits;</li>
          <li>Create multiple accounts to evade plan restrictions;</li>
          <li>Manipulate usage tracking;</li>
          <li>Exploit technical errors to obtain paid features without authorization;</li>
          <li>Share paid account access with unauthorized users.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">11. Fraud and Misrepresentation</h2>
        <p>You must not use Litigo to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Impersonate another person or organization;</li>
          <li>Create accounts using fraudulent information;</li>
          <li>Misrepresent your professional credentials;</li>
          <li>Engage in phishing;</li>
          <li>Facilitate financial fraud;</li>
          <li>Attempt to obtain unauthorized access to another person&rsquo;s information;</li>
          <li>Mislead Litigo, payment providers, or other users.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">12. Intellectual Property</h2>
        <p>
          You must have the necessary rights or permissions to upload, store, reproduce, or otherwise
          process content through Litigo.
        </p>
        <p className="mt-2">
          You must not use Litigo to knowingly infringe the intellectual property rights of another person
          or organization.
        </p>
        <p className="mt-2">This includes unauthorized use of:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Copyrighted works;</li>
          <li>Trademarks;</li>
          <li>Confidential materials;</li>
          <li>Proprietary documents;</li>
          <li>Trade secrets;</li>
          <li>Other protected materials.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">13. Harmful or Malicious Activity</h2>
        <p>You must not use Litigo to develop, distribute, or facilitate malware or other harmful software.</p>
        <p className="mt-2">This includes:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Viruses;</li>
          <li>Worms;</li>
          <li>Trojans;</li>
          <li>Ransomware;</li>
          <li>Spyware;</li>
          <li>Credential-stealing software;</li>
          <li>Malicious scripts;</li>
          <li>Destructive code.</li>
        </ul>
        <p className="mt-2">You must not use Litigo as infrastructure for attacking or compromising third-party systems.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">14. Unreasonable Use</h2>
        <p>You must not use Litigo in a manner that places an unreasonable burden on the Service or its infrastructure.</p>
        <p className="mt-2">This includes activities that:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Generate excessive automated requests;</li>
          <li>Consume disproportionate resources;</li>
          <li>Interfere with other users;</li>
          <li>Degrade Service performance;</li>
          <li>Circumvent reasonable usage limits.</li>
        </ul>
        <p className="mt-2">
          We may impose reasonable technical limits where necessary to protect the stability and
          availability of Litigo.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">15. Third-Party Rights</h2>
        <p>You must not use Litigo in a manner that violates the rights of third parties.</p>
        <p className="mt-2">This includes rights relating to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Privacy;</li>
          <li>Confidentiality;</li>
          <li>Intellectual property;</li>
          <li>Data protection;</li>
          <li>Reputation;</li>
          <li>Contractual rights.</li>
        </ul>
        <p className="mt-2">
          You are responsible for obtaining any permissions required to process information belonging to
          another person.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">16. Third-Party Services</h2>
        <p>
          Litigo may integrate with third-party services such as payment processors, analytics providers,
          authentication providers, infrastructure providers, and other technology services.
        </p>
        <p className="mt-2">You must use such integrations in accordance with applicable third-party terms and restrictions.</p>
        <p className="mt-2">
          You must not attempt to exploit Litigo integrations to obtain unauthorized access to third-party
          systems.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">17. Reporting Abuse</h2>
        <p>If you become aware of activity that you reasonably believe violates this AUP, you may report it to Litigo.</p>
        <p className="mt-2">
          Reports should include enough information for us to understand the suspected violation and
          investigate it appropriately.
        </p>
        <p className="mt-2">
          You should not attempt to investigate, access, or interfere with another user&rsquo;s account or
          information yourself.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">18. Enforcement</h2>
        <p>Litigo may investigate suspected violations of this AUP.</p>
        <p className="mt-2">Depending on the circumstances, we may:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Request additional information;</li>
          <li>Issue a warning;</li>
          <li>Restrict particular functionality;</li>
          <li>Temporarily suspend an account;</li>
          <li>Remove or restrict access to prohibited content where legally appropriate;</li>
          <li>Suspend access to the Service;</li>
          <li>Terminate an account;</li>
          <li>Take other measures reasonably necessary to protect Litigo, its users, or third parties.</li>
        </ul>
        <p className="mt-2">We will consider the nature and severity of the conduct when determining an appropriate response.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">19. Emergency Measures</h2>
        <p>Where we reasonably believe that continued access creates an immediate risk to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>The security of Litigo;</li>
          <li>Other users;</li>
          <li>User data;</li>
          <li>Our infrastructure;</li>
          <li>Third-party systems;</li>
          <li>Or the public,</li>
        </ul>
        <p className="mt-2">we may take immediate protective measures, including temporary suspension of access.</p>
        <p className="mt-2">
          Where reasonably practicable, we will notify the affected user and provide information regarding
          the action taken.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">20. No Monitoring Obligation</h2>
        <p>Litigo does not undertake to proactively monitor all User Content or user activity for violations of this AUP.</p>
        <p className="mt-2">
          The absence of monitoring does not prevent Litigo from taking action where we become aware of
          prohibited conduct or where action is otherwise necessary to protect the Service or comply with
          applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">21. Relationship With the Terms of Use</h2>
        <p>This AUP forms part of the Litigo Terms of Use.</p>
        <p className="mt-2">
          A violation of this AUP may constitute a violation of the Terms of Use and may result in
          suspension or termination of your account.
        </p>
        <p className="mt-2">
          If there is a conflict between this AUP and the Terms of Use, the Terms of Use will control unless
          expressly stated otherwise.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">22. Changes to This Policy</h2>
        <p>We may update this AUP from time to time to reflect:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Changes to the Service;</li>
          <li>Changes in technology;</li>
          <li>New security risks;</li>
          <li>Changes in applicable law;</li>
          <li>Changes to our operational practices.</li>
        </ul>
        <p className="mt-2">
          When material changes are made, we will update the “Last Updated” date and, where appropriate,
          notify users through the Service or by email.
        </p>
        <p className="mt-2">
          Your continued use of Litigo after an updated AUP becomes effective constitutes acceptance of the
          revised policy.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">23. Contact Us</h2>
        <p>
          If you have questions regarding this Acceptable Use Policy or wish to report suspected abuse or
          security issues, contact us at:
        </p>
        <p className="mt-2">
          Litigo
          <br />
          Email:{" "}
          <a href="mailto:contact@mylitigo.com" className="font-medium text-gray-900 underline">
            contact@mylitigo.com
          </a>
          <br />
          Website:{" "}
          <a
            href="https://mylitigo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline"
          >
            https://mylitigo.com
          </a>
        </p>
      </section>
    </InfoPage>
  );
}
