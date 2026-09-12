import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <InfoPage title="Terms of Use" disclaimer="Effective Date: 12 September 2026">
      <p>
        Welcome to Litigo (“Litigo”, “we”, “our”, or “us”).
      </p>
      <p>
        These Terms of Use (“Terms”) govern your access to and use of the Litigo website, applications, and
        services (collectively, the “Service”). By creating an account, accessing, or using Litigo, you
        agree to be bound by these Terms. If you do not agree with these Terms, you must not access or use
        the Service.
      </p>
      <p>These Terms constitute a legally binding agreement between you and Litigo.</p>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">1. About Litigo</h2>
        <p>
          Litigo is a cloud-based software platform designed to help advocates organize litigation matters,
          maintain case timelines, preserve legal research, record arguments, manage legal memories, and
          build a searchable repository of professional knowledge accumulated through legal practice.
        </p>
        <p className="mt-2">
          Litigo is intended to assist advocates in managing their own work product and professional
          knowledge. It is not a legal research database, legal advice service, law firm management
          platform, or substitute for professional legal judgment.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">2. Eligibility</h2>
        <p>To use Litigo, you must:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Be at least 18 years of age.</li>
          <li>Have the legal capacity to enter into a binding contract.</li>
          <li>Register using accurate and complete information.</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
        <p className="mt-2">
          If you are using Litigo on behalf of a law firm, chamber, organization, or other legal entity, you
          represent and warrant that you have the authority to bind that entity to these Terms.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">3. Acceptance of These Terms</h2>
        <p>By:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>creating an account;</li>
          <li>subscribing to a paid plan;</li>
          <li>accessing any part of the Service; or</li>
          <li>continuing to use Litigo,</li>
        </ul>
        <p className="mt-2">
          you acknowledge that you have read, understood, and agreed to these Terms, our Privacy Policy,
          Cookie Policy, Refund Policy, and any additional policies referenced within the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">4. Changes to These Terms</h2>
        <p>We may revise these Terms from time to time to reflect:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>changes in applicable law;</li>
          <li>improvements to the Service;</li>
          <li>introduction of new features;</li>
          <li>changes to subscription plans;</li>
          <li>security requirements; or</li>
          <li>operational requirements.</li>
        </ul>
        <p className="mt-2">
          When material changes are made, we will update the “Effective Date” above and, where appropriate,
          notify users through the Service or by email.
        </p>
        <p className="mt-2">
          Your continued use of Litigo after revised Terms become effective constitutes acceptance of those
          revised Terms.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">5. Your Account</h2>
        <p>To use certain features of Litigo, you must create an account.</p>
        <p className="mt-2">You agree to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>provide accurate registration information;</li>
          <li>maintain current account information;</li>
          <li>keep your login credentials confidential;</li>
          <li>use a strong password;</li>
          <li>immediately notify us of any unauthorized access to your account.</li>
        </ul>
        <p className="mt-2">
          You are responsible for all activity occurring under your account, whether or not you personally
          performed that activity.
        </p>
        <p className="mt-2">
          Litigo is not responsible for losses arising from your failure to maintain the confidentiality of
          your account credentials.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">6. Account Security</h2>
        <p>We implement reasonable technical and organizational measures designed to protect user accounts.</p>
        <p className="mt-2">However, no online platform can guarantee absolute security.</p>
        <p className="mt-2">You are responsible for:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>maintaining the confidentiality of your password;</li>
          <li>enabling any available security features;</li>
          <li>securing the devices used to access Litigo;</li>
          <li>promptly reporting suspected unauthorized access.</li>
        </ul>
        <p className="mt-2">
          If we reasonably believe your account has been compromised, we may temporarily suspend access
          until ownership can be verified.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">7. Description of the Service</h2>
        <p>Litigo provides software tools that may include, among other features:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Case management</li>
          <li>Case timelines</li>
          <li>Hearing tracking</li>
          <li>Legal research notes</li>
          <li>Argument notes</li>
          <li>Personal legal memories</li>
          <li>Document organization</li>
          <li>Search across your own content</li>
          <li>Practice insights</li>
          <li>Subscription management</li>
          <li>Other features introduced from time to time</li>
        </ul>
        <p className="mt-2">Features available to you depend on your subscription plan.</p>
        <p className="mt-2">
          We reserve the right to modify, improve, replace, suspend, or discontinue any feature at any time.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">8. Professional Responsibility</h2>
        <p>Litigo is designed for legal professionals but does not replace professional judgment.</p>
        <p className="mt-2">You remain solely responsible for:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>legal advice you provide;</li>
          <li>court filings;</li>
          <li>legal research;</li>
          <li>interpretation of statutes;</li>
          <li>interpretation of judicial precedents;</li>
          <li>compliance with procedural law;</li>
          <li>compliance with professional ethics;</li>
          <li>maintaining client confidentiality.</li>
        </ul>
        <p className="mt-2">Nothing within Litigo should be interpreted as legal advice.</p>
        <p className="mt-2">The Service merely stores and organizes information that you choose to create or upload.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">9. No Attorney-Client Relationship</h2>
        <p>Your use of Litigo does not create:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>an advocate-client relationship,</li>
          <li>attorney-client relationship,</li>
          <li>fiduciary relationship,</li>
          <li>legal representation,</li>
          <li>or professional advisory relationship</li>
        </ul>
        <p className="mt-2">between you and Litigo.</p>
        <p className="mt-2">
          We do not provide legal advice, legal opinions, legal representation, or litigation strategy.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">10. User Content</h2>
        <p>
          “User Content” means all information you upload, create, store, transmit, or otherwise make
          available through Litigo, including but not limited to:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>case information;</li>
          <li>client names;</li>
          <li>party details;</li>
          <li>notes;</li>
          <li>legal research;</li>
          <li>arguments;</li>
          <li>timelines;</li>
          <li>documents;</li>
          <li>uploaded files;</li>
          <li>memories;</li>
          <li>tags;</li>
          <li>comments;</li>
          <li>attachments;</li>
          <li>and any other content you create within the Service.</li>
        </ul>
        <p className="mt-2">You remain solely responsible for your User Content.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">11. Ownership of Your Data</h2>
        <p>You retain all ownership rights in the User Content you create or upload to Litigo.</p>
        <p className="mt-2">
          Nothing in these Terms transfers ownership of your legal work product, documents, notes, research,
          or professional knowledge to Litigo.
        </p>
        <p className="mt-2">Subject to these Terms, you grant Litigo only the limited rights necessary to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>store your data;</li>
          <li>process your data;</li>
          <li>synchronize your data across your devices;</li>
          <li>create backups;</li>
          <li>display your content to you;</li>
          <li>provide customer support;</li>
          <li>maintain and improve the Service.</li>
        </ul>
        <p className="mt-2">
          This limited license ends when your User Content is permanently deleted from our systems, subject
          to applicable backup retention periods and legal obligations.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">12. Confidential Information</h2>
        <p>Litigo understands that advocates may store information relating to confidential legal matters.</p>
        <p className="mt-2">
          While we implement commercially reasonable safeguards designed to protect User Content, you remain
          responsible for ensuring that your use of the Service complies with:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>applicable law;</li>
          <li>court orders;</li>
          <li>confidentiality obligations;</li>
          <li>professional conduct rules; and</li>
          <li>obligations owed to your clients.</li>
        </ul>
        <p className="mt-2">
          You should not upload information that you are legally prohibited from storing using third-party
          cloud services.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">13. Free and Paid Plans</h2>
        <p>Litigo may offer both free and paid subscription plans.</p>
        <p className="mt-2">
          The features, storage limits, usage quotas, and functionality available to you depend on the
          subscription plan you choose.
        </p>
        <p className="mt-2">
          We may modify, discontinue, or introduce subscription plans from time to time. Any material
          changes to pricing or plan features will not affect your current billing period and will apply
          only upon renewal or as otherwise communicated.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">14. Subscription Billing</h2>
        <p>
          Paid subscriptions are billed in advance on a recurring basis (monthly or annually), depending on
          the plan selected at the time of purchase.
        </p>
        <p className="mt-2">
          By subscribing to a paid plan, you authorize Litigo (through its payment processor) to charge the
          applicable subscription fees, taxes, and other applicable charges using your selected payment
          method.
        </p>
        <p className="mt-2">Subscription fees are exclusive of applicable taxes unless otherwise stated.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">15. Automatic Renewal</h2>
        <p>
          Unless cancelled before the end of the current billing cycle, paid subscriptions automatically
          renew for successive billing periods.
        </p>
        <p className="mt-2">
          By purchasing a subscription, you authorize recurring payments until your subscription is
          cancelled.
        </p>
        <p className="mt-2">
          You may cancel automatic renewal at any time through your account settings. Cancellation prevents
          future renewals but does not entitle you to a refund for the current billing period unless
          required by applicable law or expressly provided in our Refund Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">16. Payment Processing</h2>
        <p>Payments are securely processed through trusted third-party payment providers, including Razorpay.</p>
        <p className="mt-2">Litigo does not store your complete payment card details.</p>
        <p className="mt-2">
          Your payment is also subject to the terms, privacy policy, and security practices of the
          applicable payment provider.
        </p>
        <p className="mt-2">
          We are not responsible for errors, delays, or interruptions caused by third-party payment
          processors.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">17. Failed Payments</h2>
        <p>
          If a payment cannot be successfully processed for any reason, including expired payment methods,
          insufficient funds, or payment authorization failures, we may:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>retry the payment;</li>
          <li>notify you to update your payment method;</li>
          <li>suspend access to paid features;</li>
          <li>downgrade your account to the applicable free plan; or</li>
          <li>terminate your subscription if payment remains outstanding.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">18. Taxes</h2>
        <p>
          You are responsible for all applicable taxes associated with your subscription, including Goods
          and Services Tax (GST) where applicable.
        </p>
        <p className="mt-2">Where required by law, Litigo will collect and remit applicable taxes.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">19. Refunds</h2>
        <p>Refunds are governed by our Refund Policy.</p>
        <p className="mt-2">
          Unless otherwise required by applicable law or expressly stated in the Refund Policy, subscription
          fees are non-refundable.
        </p>
        <p className="mt-2">
          Cancelling your subscription does not automatically entitle you to a refund for unused portions of
          the billing period.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">20. Acceptable Use</h2>
        <p>You agree to use Litigo only for lawful purposes and in accordance with these Terms.</p>
        <p className="mt-2">You agree not to misuse, interfere with, or attempt to disrupt the Service or other users.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">21. Prohibited Activities</h2>
        <p>You must not:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>violate any applicable law or regulation;</li>
          <li>infringe the intellectual property rights of others;</li>
          <li>upload malicious software, viruses, worms, ransomware, or harmful code;</li>
          <li>attempt unauthorized access to Litigo, other user accounts, or underlying infrastructure;</li>
          <li>interfere with or disrupt the security or availability of the Service;</li>
          <li>reverse engineer, decompile, or attempt to extract source code except where permitted by law;</li>
          <li>scrape, crawl, or systematically collect data from Litigo without our written permission;</li>
          <li>use automated bots or scripts in a manner that negatively impacts the Service;</li>
          <li>impersonate another person or entity;</li>
          <li>submit false or misleading information;</li>
          <li>use Litigo for spam, phishing, fraud, or illegal activities;</li>
          <li>upload content that you do not have the legal right to use or store;</li>
          <li>interfere with other users&rsquo; enjoyment of the Service.</li>
        </ul>
        <p className="mt-2">Violation of this section may result in immediate suspension or termination of your account.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">22. User Responsibilities</h2>
        <p>You are solely responsible for:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>maintaining accurate case information;</li>
          <li>managing deadlines;</li>
          <li>verifying legal authorities;</li>
          <li>preserving client confidentiality;</li>
          <li>complying with professional obligations;</li>
          <li>maintaining backups where appropriate;</li>
          <li>reviewing all information before relying upon it in legal proceedings.</li>
        </ul>
        <p className="mt-2">Litigo assists in organizing information but does not verify its legal accuracy.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">23. Intellectual Property</h2>
        <p>
          The Service, including its software, design, interface, branding, logos, graphics, text,
          documentation, source code, and other materials, is owned by or licensed to Litigo and is
          protected under applicable intellectual property laws.
        </p>
        <p className="mt-2">Except as expressly permitted under these Terms, you may not:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>copy,</li>
          <li>reproduce,</li>
          <li>distribute,</li>
          <li>modify,</li>
          <li>create derivative works,</li>
          <li>publicly display,</li>
          <li>commercially exploit,</li>
          <li>or otherwise use any part of the Service without prior written permission.</li>
        </ul>
        <p className="mt-2">These Terms do not transfer ownership of Litigo&rsquo;s intellectual property to you.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">24. Limited License</h2>
        <p>
          Subject to your compliance with these Terms, Litigo grants you a limited, non-exclusive,
          non-transferable, revocable license to access and use the Service solely for your personal or
          internal professional use.
        </p>
        <p className="mt-2">
          This license does not permit resale, sublicensing, redistribution, or commercial exploitation of
          the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">25. Feedback</h2>
        <p>
          We welcome suggestions, comments, feature requests, bug reports, and other feedback regarding
          Litigo.
        </p>
        <p className="mt-2">
          If you voluntarily provide feedback, you grant Litigo a perpetual, worldwide, royalty-free,
          irrevocable license to use, modify, incorporate, and improve the Service based on that feedback
          without compensation or attribution.
        </p>
        <p className="mt-2">You are under no obligation to provide feedback.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">26. Third-Party Services</h2>
        <p>
          Litigo integrates with or relies upon third-party providers to deliver certain functionality,
          including but not limited to:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Razorpay (payment processing)</li>
          <li>Google Analytics (website analytics)</li>
          <li>Vercel Analytics (performance analytics)</li>
          <li>Cloud infrastructure providers</li>
          <li>Authentication services</li>
          <li>Email delivery providers</li>
        </ul>
        <p className="mt-2">
          Your use of these services may also be subject to their respective terms and privacy policies.
        </p>
        <p className="mt-2">Litigo is not responsible for the acts, omissions, or policies of third-party providers.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">27. Service Availability</h2>
        <p>We strive to maintain a reliable and available Service.</p>
        <p className="mt-2">However, we do not guarantee uninterrupted, error-free, or continuous availability.</p>
        <p className="mt-2">The Service may be temporarily unavailable due to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>scheduled maintenance;</li>
          <li>software updates;</li>
          <li>infrastructure failures;</li>
          <li>internet connectivity issues;</li>
          <li>security incidents;</li>
          <li>third-party outages;</li>
          <li>events beyond our reasonable control.</li>
        </ul>
        <p className="mt-2">
          We may suspend or limit access where necessary to maintain the security, stability, or integrity
          of the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">28. Beta Features</h2>
        <p>From time to time, Litigo may offer experimental or beta features.</p>
        <p className="mt-2">Beta features are provided “as is” and may:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>change without notice;</li>
          <li>contain bugs;</li>
          <li>be incomplete;</li>
          <li>be discontinued at any time.</li>
        </ul>
        <p className="mt-2">Use of beta features is entirely at your own risk.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">29. Data Retention</h2>
        <p>
          Litigo retains User Content for as long as necessary to provide the Service, comply with legal
          obligations, resolve disputes, enforce these Terms, and maintain appropriate backups.
        </p>
        <p className="mt-2">
          If you delete content or close your account, certain information may remain in encrypted backups
          for a limited period before permanent deletion, subject to our backup retention policies and
          applicable legal requirements.
        </p>
        <p className="mt-2">Retention of personal information is governed by our Privacy Policy.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">30. Data Export</h2>
        <p>
          Where supported by the Service, you may export your User Content before cancelling your
          subscription or deleting your account.
        </p>
        <p className="mt-2">You are responsible for maintaining your own copies of exported information.</p>
        <p className="mt-2">Litigo is not responsible for retaining your data indefinitely after account deletion.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">31. Account Suspension</h2>
        <p>
          We may temporarily suspend your account, with or without prior notice, if we reasonably believe
          that:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>these Terms have been violated;</li>
          <li>your account has been compromised;</li>
          <li>continued access poses a security risk;</li>
          <li>fraudulent activity is suspected;</li>
          <li>payment obligations remain outstanding;</li>
          <li>we are required to do so by law or a lawful governmental authority.</li>
        </ul>
        <p className="mt-2">
          Where reasonably practicable, we will notify you of the suspension and the steps required to
          restore access.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">32. Termination</h2>
        <p>
          You may terminate your account at any time by following the account deletion process available
          within the Service.
        </p>
        <p className="mt-2">We may terminate or permanently disable your account if:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>you materially breach these Terms;</li>
          <li>you repeatedly violate our policies;</li>
          <li>you engage in unlawful conduct;</li>
          <li>continued access would expose Litigo or other users to legal or security risks.</li>
        </ul>
        <p className="mt-2">
          Termination of your account does not relieve you of any outstanding payment obligations that
          accrued prior to termination.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">33. Effect of Termination</h2>
        <p>Upon termination:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>your right to access the Service ends immediately;</li>
          <li>active subscriptions will not renew;</li>
          <li>certain User Content may be deleted in accordance with our data retention practices;</li>
          <li>
            provisions intended to survive termination shall continue to apply, including those relating to
            intellectual property, confidentiality, disclaimers, limitation of liability, indemnification,
            governing law, and dispute resolution.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">34. Disclaimer of Warranties</h2>
        <p>The Service is provided on an “as is” and “as available” basis.</p>
        <p className="mt-2">
          To the fullest extent permitted by applicable law, Litigo disclaims all warranties, whether
          express, implied, statutory, or otherwise, including but not limited to warranties of:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>merchantability;</li>
          <li>fitness for a particular purpose;</li>
          <li>non-infringement;</li>
          <li>uninterrupted availability;</li>
          <li>accuracy;</li>
          <li>completeness;</li>
          <li>reliability; and</li>
          <li>freedom from errors or defects.</li>
        </ul>
        <p className="mt-2">We do not warrant that:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>the Service will always be available;</li>
          <li>the Service will be error-free;</li>
          <li>defects will always be corrected immediately;</li>
          <li>the Service will meet every individual requirement;</li>
          <li>stored information will never be lost due to circumstances beyond our reasonable control.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">35. No Legal Advice</h2>
        <p>Litigo is a software platform for organizing information.</p>
        <p className="mt-2">Nothing within the Service constitutes:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>legal advice;</li>
          <li>legal representation;</li>
          <li>legal opinion;</li>
          <li>legal research conclusions;</li>
          <li>litigation strategy;</li>
          <li>professional legal services.</li>
        </ul>
        <p className="mt-2">Users remain solely responsible for exercising independent professional judgment.</p>
        <p className="mt-2">
          You should independently verify all legal authorities, statutory references, judicial precedents,
          procedural requirements, deadlines, and court filings before relying upon them.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">36. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Litigo, its founder, affiliates, licensors,
          contractors, and service providers shall not be liable for any indirect, incidental,
          consequential, special, exemplary, or punitive damages arising out of or relating to your use of
          the Service.
        </p>
        <p className="mt-2">This includes, without limitation:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>loss of profits;</li>
          <li>loss of revenue;</li>
          <li>loss of goodwill;</li>
          <li>loss of business opportunities;</li>
          <li>loss of professional reputation;</li>
          <li>loss of data;</li>
          <li>interruption of legal practice;</li>
          <li>missed court deadlines;</li>
          <li>loss arising from incorrect or incomplete User Content;</li>
          <li>reliance upon information stored within the Service.</li>
        </ul>
        <p className="mt-2">
          Our total aggregate liability arising from or relating to these Terms or the Service shall not
          exceed the total subscription fees paid by you to Litigo during the twelve (12) months immediately
          preceding the event giving rise to the claim.
        </p>
        <p className="mt-2">Nothing in these Terms excludes liability that cannot lawfully be excluded under applicable law.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">37. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Litigo, its founder, affiliates, employees,
          contractors, licensors, and service providers from and against any claims, liabilities, losses,
          damages, judgments, penalties, costs, and reasonable legal expenses arising from:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>your use of the Service;</li>
          <li>your User Content;</li>
          <li>your violation of these Terms;</li>
          <li>your violation of applicable law;</li>
          <li>infringement of third-party rights;</li>
          <li>misuse of the Service.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">38. Force Majeure</h2>
        <p>
          Litigo shall not be liable for any delay or failure in performing its obligations where such delay
          or failure results from events beyond our reasonable control, including but not limited to:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>natural disasters;</li>
          <li>fire;</li>
          <li>flood;</li>
          <li>pandemic;</li>
          <li>epidemic;</li>
          <li>war;</li>
          <li>terrorism;</li>
          <li>civil unrest;</li>
          <li>governmental actions;</li>
          <li>internet outages;</li>
          <li>cloud infrastructure failures;</li>
          <li>power failures;</li>
          <li>labour disputes;</li>
          <li>cyber attacks.</li>
        </ul>
        <p className="mt-2">Performance shall be suspended for the duration of the affected event.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">39. Assignment</h2>
        <p>You may not assign or transfer your rights or obligations under these Terms without our prior written consent.</p>
        <p className="mt-2">
          Litigo may assign these Terms as part of a merger, acquisition, corporate restructuring, sale of
          assets, or similar transaction.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">40. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of
          competent jurisdiction, the remaining provisions shall remain in full force and effect.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">41. Waiver</h2>
        <p>Failure by Litigo to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision.</p>
        <p className="mt-2">Any waiver must be in writing.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">42. Entire Agreement</h2>
        <p>These Terms, together with our:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Privacy Policy;</li>
          <li>Cookie Policy;</li>
          <li>Refund Policy; and</li>
          <li>any additional policies expressly incorporated by reference,</li>
        </ul>
        <p className="mt-2">
          constitute the entire agreement between you and Litigo concerning your use of the Service and
          supersede all prior discussions, understandings, and agreements relating to the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">43. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without
          regard to its conflict of law principles.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">44. Jurisdiction</h2>
        <p>
          Any dispute arising out of or relating to these Terms or the Service shall be subject to the
          exclusive jurisdiction of the competent courts located in Kolkata, West Bengal, India, unless
          otherwise required by applicable law.
        </p>
        <p className="mt-2">
          Before initiating formal legal proceedings, both parties agree to make reasonable efforts to
          resolve the dispute through good-faith discussions.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">45. Contact Information</h2>
        <p>If you have any questions regarding these Terms of Use, you may contact us:</p>
        <p className="mt-2">
          Litigo
          <br />
          Email:{" "}
          <a href="mailto:support@mylitigo.com" className="font-medium text-gray-900 underline">
            support@mylitigo.com
          </a>
          <br />
          Website:{" "}
          <Link href="/" className="font-medium text-gray-900 underline">
            mylitigo.com
          </Link>
        </p>
      </section>
    </InfoPage>
  );
}
