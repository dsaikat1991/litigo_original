import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" disclaimer="Last Updated: 12 September 2026">
      <p>
        Litigo (“Litigo”, “we”, “our”, or “us”) respects your privacy and is committed to protecting the
        personal information you provide to us.
      </p>
      <p>
        This Privacy Policy explains how we collect, use, store, disclose, and protect personal data when
        you visit our website, create a Litigo account, use the Litigo application, subscribe to our
        services, or otherwise interact with us.
      </p>
      <p>
        Litigo is designed for advocates and legal professionals. We understand that the information stored
        in a legal practice can be sensitive, confidential, and professionally important. We therefore take
        the protection and security of your information seriously.
      </p>
      <p>
        This Privacy Policy should be read together with our Terms of Use, Cookie Policy, Refund Policy,
        and, where applicable, our Data Processing Agreement.
      </p>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">1. Who We Are</h2>
        <p>Litigo is a legal practice software platform designed primarily for advocates practicing in India.</p>
        <p className="mt-2">
          Litigo helps advocates organize and preserve information arising from their legal practice,
          including case information, case timelines, legal research, arguments, notes, memories, documents,
          and other professional information entered by the user.
        </p>
        <p className="mt-2">
          For questions regarding this Privacy Policy or your personal data, you may contact us using the
          details provided at the end of this Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">2. Scope of This Privacy Policy</h2>
        <p>This Privacy Policy applies to personal data processed by Litigo through:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>The Litigo website;</li>
          <li>The Litigo web application;</li>
          <li>Your Litigo account;</li>
          <li>Communications between you and Litigo;</li>
          <li>Subscription and payment interactions;</li>
          <li>Support requests;</li>
          <li>Marketing or informational communications;</li>
          <li>Other services or features that expressly link to this Privacy Policy.</li>
        </ul>
        <p className="mt-2">
          This Policy does not apply to websites, applications, or services operated by third parties, even
          where those services are linked from Litigo.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">3. What Is Personal Data?</h2>
        <p>
          For the purposes of this Policy, “personal data” generally means information that relates to an
          identified or identifiable individual.
        </p>
        <p className="mt-2">
          This may include information that you provide directly to us as well as certain information
          automatically collected when you use our website or services.
        </p>
        <p className="mt-2">
          The Digital Personal Data Protection Act, 2023 (“DPDP Act”) uses the terms “personal data”, “Data
          Principal”, and “Data Fiduciary” in relation to the processing of digital personal data. Where
          applicable, Litigo processes personal data in accordance with the DPDP Act and applicable rules
          and regulations made under it.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">4. Information We Collect</h2>
        <p>The information we collect depends on how you interact with Litigo.</p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">4.1 Account Information</h3>
        <p>When you create an account, we may collect information such as:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Full name;</li>
          <li>Display name;</li>
          <li>Email address;</li>
          <li>Password or authentication credentials;</li>
          <li>Professional title;</li>
          <li>Country;</li>
          <li>Preferred language;</li>
          <li>Time zone;</li>
          <li>Profile information;</li>
          <li>Professional licence or registration information where you choose to provide it;</li>
          <li>Profile photograph or avatar where you choose to provide one.</li>
        </ul>
        <p className="mt-2">
          Some information may be required to create or maintain your account, while other information is
          optional.
        </p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">4.2 Professional Information</h3>
        <p>Because Litigo is designed for advocates, you may choose to provide professional information such as:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Professional designation;</li>
          <li>Practice areas;</li>
          <li>Bar or licensing information;</li>
          <li>Jurisdiction;</li>
          <li>Professional registration number;</li>
          <li>Admission date;</li>
          <li>Professional biography.</li>
        </ul>
        <p className="mt-2">You decide which optional professional information to add to your Litigo profile.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">5. Case and Legal Information</h2>
        <p>Litigo allows you to store information relating to your legal practice.</p>
        <p className="mt-2">This may include:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Case titles;</li>
          <li>Case numbers;</li>
          <li>Court information;</li>
          <li>Party names;</li>
          <li>Client information;</li>
          <li>Case status;</li>
          <li>Hearing dates;</li>
          <li>Case timelines;</li>
          <li>Arguments;</li>
          <li>Research notes;</li>
          <li>Statutes;</li>
          <li>Judicial decisions;</li>
          <li>Legal authorities;</li>
          <li>Personal observations;</li>
          <li>Memories;</li>
          <li>Tags;</li>
          <li>Documents and attachments;</li>
          <li>Other information you choose to enter into Litigo.</li>
        </ul>
        <p className="mt-2">
          This information may contain personal data relating to your clients, opposing parties, witnesses,
          colleagues, or other individuals.
        </p>
        <p className="mt-2">
          You are responsible for ensuring that you have the necessary authority or lawful basis to provide
          such information to Litigo and that your use of the Service complies with your professional,
          contractual, legal, and confidentiality obligations.
        </p>
        <p className="mt-2">
          Litigo does not determine the purposes for which you enter such case information. We process it to
          provide the functionality you request through the Service.
        </p>
        <p className="mt-2">
          Where Litigo processes personal data on behalf of a business customer or law firm acting as the
          relevant Data Fiduciary, the parties may enter into a separate Data Processing Agreement.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">6. Information About Your Use of Litigo</h2>
        <p>We may automatically collect information about how you interact with our website and application.</p>
        <p className="mt-2">This may include:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>IP address;</li>
          <li>Browser type;</li>
          <li>Operating system;</li>
          <li>Device type;</li>
          <li>Approximate location derived from technical information;</li>
          <li>Pages visited;</li>
          <li>Features used;</li>
          <li>Session information;</li>
          <li>Referring website;</li>
          <li>Date and time of access;</li>
          <li>Performance information;</li>
          <li>Error information;</li>
          <li>General usage patterns.</li>
        </ul>
        <p className="mt-2">We use this information primarily to operate, secure, maintain, and improve Litigo.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">7. Payment Information</h2>
        <p>
          When you purchase a Litigo subscription, payments are processed through third-party payment
          providers such as Razorpay.
        </p>
        <p className="mt-2">Depending on the payment method, Razorpay may process information such as:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Name;</li>
          <li>Email address;</li>
          <li>Billing information;</li>
          <li>Transaction information;</li>
          <li>Payment method information;</li>
          <li>Payment status;</li>
          <li>Transaction identifiers.</li>
        </ul>
        <p className="mt-2">
          Litigo does not intentionally store your complete credit or debit card number or other complete
          payment credentials.
        </p>
        <p className="mt-2">Payment processing is subject to the payment provider&rsquo;s own terms and privacy practices.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">8. Communications</h2>
        <p>If you contact us, we may collect information contained in your communication.</p>
        <p className="mt-2">For example, when you:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Contact support;</li>
          <li>Report a bug;</li>
          <li>Request a feature;</li>
          <li>Provide feedback;</li>
          <li>Ask a billing question;</li>
          <li>Contact us about your account;</li>
        </ul>
        <p className="mt-2">we may retain the information necessary to respond to and manage your request.</p>
        <p className="mt-2">We may also send transactional communications relating to your account, including:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Account verification;</li>
          <li>Password or authentication notifications;</li>
          <li>Subscription confirmations;</li>
          <li>Payment notifications;</li>
          <li>Service announcements;</li>
          <li>Security notifications;</li>
          <li>Important changes to the Service.</li>
        </ul>
        <p className="mt-2">
          These communications are necessary for operating your Litigo account and are not treated as
          optional marketing communications.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">9. How We Use Personal Data</h2>
        <p>We may process personal data for the following purposes:</p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Providing the Service</h3>
        <p>To:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Create and maintain your account;</li>
          <li>Authenticate you;</li>
          <li>Provide access to Litigo;</li>
          <li>Store and display your information;</li>
          <li>Synchronize your account;</li>
          <li>Provide search functionality;</li>
          <li>Provide case and practice management features;</li>
          <li>Process subscriptions;</li>
          <li>Provide customer support.</li>
        </ul>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Security and Fraud Prevention</h3>
        <p>To:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Protect accounts;</li>
          <li>Detect unauthorized access;</li>
          <li>Prevent fraud;</li>
          <li>Detect malicious activity;</li>
          <li>Investigate security incidents;</li>
          <li>Protect the integrity of our systems.</li>
        </ul>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Improving Litigo</h3>
        <p>To:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Understand how the Service is used;</li>
          <li>Diagnose technical problems;</li>
          <li>Improve performance;</li>
          <li>Develop new features;</li>
          <li>Improve usability;</li>
          <li>Analyze aggregated usage trends.</li>
        </ul>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Communications</h3>
        <p>To:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Respond to enquiries;</li>
          <li>Provide support;</li>
          <li>Send service-related communications;</li>
          <li>Notify you about material changes to the Service;</li>
          <li>Communicate about subscriptions and payments.</li>
        </ul>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Legal and Regulatory Compliance</h3>
        <p>To:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Comply with applicable laws;</li>
          <li>Respond to lawful requests;</li>
          <li>Establish, exercise, or defend legal claims;</li>
          <li>Enforce our Terms of Use;</li>
          <li>Protect the rights, property, and safety of Litigo and its users.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">10. Legal Basis for Processing</h2>
        <p>
          Where the DPDP Act applies, Litigo processes personal data only for lawful purposes and on an
          applicable legal basis, including consent or legitimate uses recognized under applicable law.
        </p>
        <p className="mt-2">
          Where processing is based on consent, we will provide appropriate information about the personal
          data being collected and the purpose for which it is processed.
        </p>
        <p className="mt-2">
          You may withdraw consent where the processing is based on consent, subject to applicable law and
          the consequences of withdrawing consent.
        </p>
        <p className="mt-2">Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal.</p>
        <p className="mt-2">
          The DPDP Act provides for processing based on consent and certain legitimate uses, and requires
          appropriate notice regarding the personal data being processed and the purposes of processing.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">11. Consent</h2>
        <p>Where consent is required, Litigo will seek consent through an appropriate mechanism.</p>
        <p className="mt-2">We aim to make consent requests clear and understandable.</p>
        <p className="mt-2">
          Where you provide consent, you may withdraw it through the mechanism made available by Litigo or
          by contacting us.
        </p>
        <p className="mt-2">
          Withdrawing consent may affect our ability to provide certain features or services where the
          relevant processing is necessary for those features.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">12. Cookies and Similar Technologies</h2>
        <p>Litigo uses cookies and similar technologies.</p>
        <p className="mt-2">These technologies may be used to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Keep you securely signed in;</li>
          <li>Maintain sessions;</li>
          <li>Remember preferences;</li>
          <li>Improve performance;</li>
          <li>Understand website usage;</li>
          <li>Measure traffic;</li>
          <li>Detect security issues;</li>
          <li>Improve the user experience.</li>
        </ul>
        <p className="mt-2">Our use of cookies is described in greater detail in our Cookie Policy.</p>
        <p className="mt-2">
          Where required by applicable law, we will obtain consent before using non-essential cookies or
          similar technologies.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">13. Google Analytics</h2>
        <p>Litigo uses Google Analytics to understand how visitors use our website.</p>
        <p className="mt-2">Google Analytics may collect information such as:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Pages visited;</li>
          <li>Approximate session information;</li>
          <li>Device and browser information;</li>
          <li>Traffic sources;</li>
          <li>General interaction and usage information.</li>
        </ul>
        <p className="mt-2">
          We use this information to understand website performance and improve our content and services.
        </p>
        <p className="mt-2">Google processes information in accordance with its own privacy practices.</p>
        <p className="mt-2">You can learn more about Google&rsquo;s privacy practices through its privacy documentation.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">14. Vercel Analytics</h2>
        <p>Litigo uses Vercel Analytics and related Vercel services to understand website performance and usage.</p>
        <p className="mt-2">This may help us monitor:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Website performance;</li>
          <li>Core Web Vitals;</li>
          <li>Traffic patterns;</li>
          <li>Page performance;</li>
          <li>Technical issues.</li>
        </ul>
        <p className="mt-2">We use this information to improve the speed, reliability, and usability of Litigo.</p>
        <p className="mt-2">Vercel&rsquo;s processing of information is governed by its applicable privacy policies.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">15. How We Share Personal Data</h2>
        <p>We do not sell your personal data.</p>
        <p className="mt-2">We may share personal data with trusted service providers where necessary to operate Litigo.</p>
        <p className="mt-2">These providers may include:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Cloud infrastructure providers;</li>
          <li>Authentication providers;</li>
          <li>Payment processors;</li>
          <li>Email delivery providers;</li>
          <li>Analytics providers;</li>
          <li>Performance monitoring providers;</li>
          <li>Security providers;</li>
          <li>Customer support providers;</li>
          <li>Other technology providers necessary to operate the Service.</li>
        </ul>
        <p className="mt-2">
          These providers are permitted to process information only as necessary to provide their services
          to us or as otherwise permitted by applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">16. Third-Party Service Providers</h2>
        <p>Litigo may use third-party providers including, depending on the features and infrastructure in use:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Razorpay — payment processing and subscription transactions.</li>
          <li>Google Analytics — website analytics.</li>
          <li>Vercel Analytics — website performance and analytics.</li>
        </ul>
        <p className="mt-2">Other service providers may be introduced as Litigo evolves.</p>
        <p className="mt-2">
          Where a third party processes personal data on our behalf, we take reasonable steps to require
          appropriate confidentiality and security protections.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">17. Legal Disclosures</h2>
        <p>We may disclose personal data where reasonably necessary to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Comply with applicable law;</li>
          <li>Respond to lawful governmental or regulatory requests;</li>
          <li>Comply with court orders;</li>
          <li>Protect the rights or safety of Litigo, users, or others;</li>
          <li>Investigate fraud or security incidents;</li>
          <li>Enforce our Terms of Use;</li>
          <li>Establish, exercise, or defend legal claims.</li>
        </ul>
        <p className="mt-2">
          We will seek to limit such disclosures to what is reasonably necessary for the relevant purpose,
          subject to applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">18. International Processing and Transfers</h2>
        <p>Some third-party service providers used by Litigo may process information outside India.</p>
        <p className="mt-2">
          Where personal data is transferred or made available outside India, Litigo will take appropriate
          steps required by applicable law.
        </p>
        <p className="mt-2">
          The DPDP Act permits the Central Government to restrict transfers of personal data outside India
          to specified countries or territories through notification. Litigo will comply with applicable
          restrictions and requirements concerning cross-border transfers.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">19. Data Retention</h2>
        <p>We retain personal data only for as long as reasonably necessary for the purposes described in this Policy, including to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Provide the Service;</li>
          <li>Maintain your account;</li>
          <li>Complete transactions;</li>
          <li>Comply with legal obligations;</li>
          <li>Resolve disputes;</li>
          <li>Enforce agreements;</li>
          <li>Prevent fraud;</li>
          <li>Maintain security;</li>
          <li>Maintain appropriate backups.</li>
        </ul>
        <p className="mt-2">
          When personal data is no longer required, we will delete it, anonymize it, or otherwise dispose of
          it in accordance with our retention practices and applicable law.
        </p>
        <p className="mt-2">Some information may remain temporarily in encrypted backups before it is permanently removed.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">20. Deleting Your Account</h2>
        <p>You may request deletion of your Litigo account.</p>
        <p className="mt-2">
          Depending on the applicable circumstances, account deletion may result in the deletion of your
          User Content and associated personal data.
        </p>
        <p className="mt-2">
          Before deleting your account, we recommend exporting any information you wish to retain where
          export functionality is available.
        </p>
        <p className="mt-2">Certain information may be retained where necessary to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Comply with legal obligations;</li>
          <li>Resolve disputes;</li>
          <li>Prevent fraud;</li>
          <li>Enforce agreements;</li>
          <li>Establish or defend legal claims;</li>
          <li>Maintain security records;</li>
          <li>Comply with applicable retention requirements.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">21. Your Rights</h2>
        <p>Subject to applicable law, you may have rights regarding your personal data, including the right to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Obtain information about processing of your personal data;</li>
          <li>Request access to personal data;</li>
          <li>Request correction of inaccurate or incomplete personal data;</li>
          <li>Request deletion of personal data where applicable;</li>
          <li>Withdraw consent where processing is based on consent;</li>
          <li>Raise a grievance regarding our processing of personal data;</li>
          <li>Nominate another individual to exercise certain rights on your behalf where provided by applicable law.</li>
        </ul>
        <p className="mt-2">
          The precise scope and manner of exercising these rights may depend on the provisions of the DPDP
          Act and applicable rules in force at the relevant time.
        </p>
        <p className="mt-2">
          The DPDP Act expressly provides Data Principals with rights including access to information,
          correction and erasure, grievance redressal, and nomination, subject to the Act.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">22. How to Exercise Your Rights</h2>
        <p>You may contact us to exercise an applicable privacy right or raise a privacy-related request.</p>
        <p className="mt-2">Please include:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Your name;</li>
          <li>The email address associated with your Litigo account;</li>
          <li>The nature of your request;</li>
          <li>Any information necessary to help us identify and process the request.</li>
        </ul>
        <p className="mt-2">
          We may need to verify your identity before processing certain requests in order to protect your
          account and personal information.
        </p>
        <p className="mt-2">We will respond within the period required by applicable law.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">23. Grievance Redressal</h2>
        <p>
          If you have a concern regarding our processing of your personal data, you may first contact us
          using the contact details provided below.
        </p>
        <p className="mt-2">We will review and respond to privacy-related grievances in accordance with applicable law.</p>
        <p className="mt-2">
          Where applicable, you may also have the right to approach the Data Protection Board of India or
          another competent authority after following the applicable grievance process.
        </p>
        <p className="mt-2">The Government of India has established the Data Protection Board of India under the DPDP framework.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">24. Security</h2>
        <p>
          We use reasonable technical and organizational measures designed to protect personal data against
          unauthorized access, alteration, disclosure, destruction, or loss.
        </p>
        <p className="mt-2">Depending on the nature of the information and the technology involved, these measures may include:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Encryption in transit;</li>
          <li>Access controls;</li>
          <li>Authentication mechanisms;</li>
          <li>Secure infrastructure;</li>
          <li>Monitoring and logging;</li>
          <li>Backup systems;</li>
          <li>Security updates;</li>
          <li>Limited access to production systems;</li>
          <li>Measures designed to detect and respond to security incidents.</li>
        </ul>
        <p className="mt-2">No online service can guarantee absolute security.</p>
        <p className="mt-2">
          You are also responsible for maintaining the security of your account credentials and devices used
          to access Litigo.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">25. Personal Data Breaches</h2>
        <p>
          If Litigo becomes aware of a personal data breach requiring notification under applicable law, we
          will take appropriate steps to investigate, contain, mitigate, and notify affected parties and
          authorities as required.
        </p>
        <p className="mt-2">
          We may also take steps to secure affected accounts and systems and prevent further unauthorized
          access.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">26. Children&rsquo;s Data</h2>
        <p>Litigo is intended for use by adults and legal professionals.</p>
        <p className="mt-2">We do not knowingly seek to provide services to children.</p>
        <p className="mt-2">
          If you believe that a child has provided personal data to Litigo in circumstances where such
          collection was not authorized, please contact us so that we can take appropriate action.
        </p>
        <p className="mt-2">
          Where applicable, Litigo will comply with requirements relating to children&rsquo;s personal data
          under the DPDP Act and applicable rules.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">27. Your Responsibility Regarding Client and Third-Party Information</h2>
        <p>
          Litigo may allow you to store information relating to clients, parties, witnesses, opposing
          counsel, employees, and other individuals.
        </p>
        <p className="mt-2">
          You are responsible for ensuring that you have an appropriate lawful basis, authorization,
          consent, or other legal authority to provide such information to Litigo.
        </p>
        <p className="mt-2">
          As an advocate, you should also ensure that your use of Litigo is consistent with your professional
          duties, confidentiality obligations, court requirements, and applicable law.
        </p>
        <p className="mt-2">Litigo does not determine whether you are permitted to upload or process particular information.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">28. Confidential Legal Information</h2>
        <p>Litigo is designed for advocates and may therefore contain confidential legal and professional information.</p>
        <p className="mt-2">
          We do not claim ownership of the case information, legal research, arguments, notes, documents, or
          other User Content that you store in Litigo.
        </p>
        <p className="mt-2">
          Our processing of such information is limited to what is reasonably necessary to provide, secure,
          maintain, support, and improve the Service, comply with applicable law, and perform other
          activities described in this Policy and our Terms of Use.
        </p>
        <p className="mt-2">We do not sell your case information or use your stored legal content for advertising.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">29. Data Processing Agreement</h2>
        <p>
          For certain business, law-firm, chamber, or organizational customers, Litigo may process personal
          data on behalf of the customer.
        </p>
        <p className="mt-2">
          Where appropriate, those relationships may be governed by a separate Data Processing Agreement
          (DPA).
        </p>
        <p className="mt-2">The DPA addresses matters such as:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Processing instructions;</li>
          <li>Confidentiality;</li>
          <li>Security;</li>
          <li>Sub-processors;</li>
          <li>Data breach assistance;</li>
          <li>Data deletion;</li>
          <li>Data subject requests;</li>
          <li>International transfers;</li>
          <li>Other processor obligations.</li>
        </ul>
        <p className="mt-2">
          Where a DPA applies, its terms will govern the relevant processing relationship to the extent of
          any conflict with this Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">30. Data Protection by Design</h2>
        <p>We aim to incorporate privacy and security considerations into the design and development of Litigo.</p>
        <p className="mt-2">This includes considering:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>What information is necessary to provide a feature;</li>
          <li>How information is accessed;</li>
          <li>How information is secured;</li>
          <li>How long information needs to be retained;</li>
          <li>How users can control or delete their information.</li>
        </ul>
        <p className="mt-2">As Litigo evolves, we may introduce additional privacy and security controls.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">31. Marketing Communications</h2>
        <p>We may send you product-related communications necessary to operate your account.</p>
        <p className="mt-2">Where permitted and where you have provided the necessary consent, we may also send information about:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>New features;</li>
          <li>Product updates;</li>
          <li>Educational content;</li>
          <li>Litigo announcements;</li>
          <li>Special offers.</li>
        </ul>
        <p className="mt-2">
          You may opt out of non-essential marketing communications by using the unsubscribe mechanism
          included in the communication or by contacting us.
        </p>
        <p className="mt-2">You will continue to receive essential transactional and account-related communications where necessary.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">32. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time.</p>
        <p className="mt-2">Changes may be made to reflect:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Changes to Litigo;</li>
          <li>New features;</li>
          <li>Changes in technology;</li>
          <li>Changes in our data practices;</li>
          <li>Changes in applicable law or regulation;</li>
          <li>Changes to the DPDP framework.</li>
        </ul>
        <p className="mt-2">
          When we make material changes, we will update the “Last Updated” date and, where appropriate,
          provide additional notice through the Service or by email.
        </p>
        <p className="mt-2">We encourage you to review this Policy periodically.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">33. Applicable Law</h2>
        <p>
          This Privacy Policy is intended to operate in accordance with applicable laws of India, including
          applicable provisions of the Digital Personal Data Protection Act, 2023 and rules made under it as
          they come into force.
        </p>
        <p className="mt-2">
          Where applicable law provides you with greater privacy protections than those described in this
          Policy, those protections will apply to the extent required by law.
        </p>
        <p className="mt-2">
          The DPDP Act received Presidential assent on August 11, 2023. The Central Government subsequently
          notified the Digital Personal Data Protection Rules, 2025 on November 14, 2025, with a phased
          commencement framework.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">34. Contact Us</h2>
        <p>
          If you have questions, requests, or concerns regarding this Privacy Policy or the handling of your
          personal data, please contact us:
        </p>
        <p className="mt-2">
          Litigo
          <br />
          Email:{" "}
          <a href="mailto:contact@mylitigo.com" className="font-medium text-gray-900 underline">
            contact@mylitigo.com
          </a>
        </p>
        <p className="mt-2">
          We will use reasonable efforts to respond to privacy-related enquiries and requests within the
          period required by applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">35. Privacy Commitment</h2>
        <p>Litigo exists to help advocates preserve and retrieve the knowledge they build through their legal practice.</p>
        <p className="mt-2">We understand that this requires trust.</p>
        <p className="mt-2">
          We therefore aim to treat the information entrusted to Litigo with care, limit its use to
          legitimate purposes, maintain appropriate security measures, and give users meaningful control
          over their personal information.
        </p>
        <p className="mt-2">
          Your legal experience belongs to you.
          <br />
          Our responsibility is to provide a secure place for you to preserve it.
        </p>
      </section>
    </InfoPage>
  );
}
