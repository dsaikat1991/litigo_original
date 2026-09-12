import type { Metadata } from "next";
import { InfoPage } from "@/components/marketing/info-page";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <InfoPage title="Cookie Policy" disclaimer="Last Updated: 12 September 2026">
      <p>
        This Cookie Policy explains how Litigo (“we”, “our”, or “us”) uses cookies and similar technologies
        when you visit our website or use our services.
      </p>
      <p>
        By using Litigo, you acknowledge this Cookie Policy. Where required by applicable law, we will
        request your consent before placing non-essential cookies, such as analytics cookies, on your
        device.
      </p>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device when you visit a website. They help
          websites function properly, improve performance, remember your preferences, and provide insights
          into how the website is being used.
        </p>
        <p className="mt-2">
          Cookies do not usually contain information that personally identifies you. However, information
          collected through cookies may be associated with your account where applicable.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Why We Use Cookies</h2>
        <p>We use cookies to provide a secure, reliable, and improved experience while using Litigo.</p>
        <p className="mt-2">Cookies may be used to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Keep you signed in to your account</li>
          <li>Maintain secure user sessions</li>
          <li>Remember your preferences and settings</li>
          <li>Improve website performance and loading speed</li>
          <li>Understand how visitors use our website</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Measure the effectiveness of product improvements</li>
        </ul>
        <p className="mt-2">We do not use cookies to sell your personal information.</p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Types of Cookies We Use</h2>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Essential Cookies</h3>
        <p>These cookies are necessary for the operation of Litigo.</p>
        <p className="mt-2">They enable core functionality such as:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>User authentication</li>
          <li>Secure login sessions</li>
          <li>Account security</li>
          <li>Navigation between pages</li>
          <li>Protection against malicious activity</li>
        </ul>
        <p className="mt-2">Without these cookies, the service cannot function properly.</p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Performance &amp; Analytics Cookies</h3>
        <p>These cookies help us understand how visitors interact with our website.</p>
        <p className="mt-2">They allow us to measure:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Page views</li>
          <li>Traffic sources</li>
          <li>Feature usage</li>
          <li>Performance issues</li>
          <li>General user behaviour</li>
        </ul>
        <p className="mt-2">
          This information is aggregated wherever possible and helps us improve Litigo over time.
        </p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Functional Cookies</h3>
        <p>
          Functional cookies remember choices you make so that we can provide a more personalized
          experience.
        </p>
        <p className="mt-2">For example, they may remember:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Interface preferences</li>
          <li>Theme settings</li>
          <li>Language preferences (if supported)</li>
          <li>Recently used options</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Third-Party Cookies</h2>
        <p>
          Litigo uses carefully selected third-party services to provide a secure, reliable, and
          high-performing experience. These services may place cookies or use similar technologies as part
          of their functionality.
        </p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Google Analytics</h3>
        <p>
          We use Google Analytics to understand how visitors interact with our website. Google Analytics
          helps us measure information such as:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Pages visited</li>
          <li>Time spent on the website</li>
          <li>Traffic sources</li>
          <li>Device and browser information</li>
          <li>General usage patterns</li>
        </ul>
        <p className="mt-2">
          This information is aggregated and helps us improve the performance, usability, and content of
          Litigo. Google Analytics does not provide us with personally identifiable information unless you
          voluntarily provide it elsewhere.
        </p>
        <p className="mt-2">
          Learn more about Google&rsquo;s privacy practices at{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline"
          >
            policies.google.com/privacy
          </a>
          .
        </p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Vercel Analytics</h3>
        <p>We use Vercel Analytics to monitor website performance and understand how visitors use our website.</p>
        <p className="mt-2">This helps us measure:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Page performance</li>
          <li>Core Web Vitals</li>
          <li>Traffic trends</li>
          <li>Feature adoption</li>
          <li>General website usage</li>
        </ul>
        <p className="mt-2">
          The information collected is used solely to improve the speed, reliability, and overall user
          experience of Litigo.
        </p>
        <p className="mt-2">
          Learn more at{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline"
          >
            vercel.com/legal/privacy-policy
          </a>
          .
        </p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Payment Processing</h3>
        <p>
          When you subscribe to a paid plan, payments are securely processed through Razorpay. Razorpay may
          use cookies or similar technologies to facilitate secure payment processing, fraud prevention, and
          transaction verification.
        </p>
        <p className="mt-2">Litigo does not store your complete payment card information.</p>
        <p className="mt-2">
          Learn more at{" "}
          <a
            href="https://razorpay.com/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline"
          >
            razorpay.com/privacy
          </a>
          .
        </p>

        <h3 className="mt-3 mb-1 text-sm font-semibold text-gray-800">Authentication &amp; Security</h3>
        <p>Litigo also uses authentication and security technologies to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Keep your account securely signed in</li>
          <li>Prevent unauthorized access</li>
          <li>Detect fraudulent or malicious activity</li>
          <li>Protect user sessions</li>
        </ul>
        <p className="mt-2">
          These cookies are essential for the secure operation of the platform and cannot be disabled
          without affecting core functionality.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Managing Cookies</h2>
        <p>Most web browsers allow you to control cookies through their settings.</p>
        <p className="mt-2">You can choose to:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>View stored cookies</li>
          <li>Delete existing cookies</li>
          <li>Block all cookies</li>
          <li>Block cookies from specific websites</li>
          <li>Receive notifications before cookies are stored</li>
        </ul>
        <p className="mt-2">
          Please note that disabling essential cookies may affect the functionality of Litigo, including
          your ability to sign in or use certain features.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, legal
          requirements, or our services.
        </p>
        <p className="mt-2">When significant changes are made, we will update the “Last Updated” date at the top of this page.</p>
        <p className="mt-2">
          Your continued use of Litigo after any changes become effective constitutes your acceptance of the
          updated Cookie Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-1 font-semibold text-gray-900">Contact Us</h2>
        <p>If you have any questions about this Cookie Policy or how we use cookies, please contact us at:</p>
        <p className="mt-2">
          Email:{" "}
          <a href="mailto:support@mylitigo.com" className="font-medium text-gray-900 underline">
            support@mylitigo.com
          </a>
        </p>
      </section>
    </InfoPage>
  );
}
