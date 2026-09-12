import Link from "next/link";

type FooterLink = { label: string; href: string };

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Changelog", href: "/changelog" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const RESOURCES_LINKS: FooterLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Documentation", href: "/docs" },
  { label: "Help Centre", href: "/help" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Refund & Cancellation Policy", href: "/refund-policy" },
  { label: "Acceptable Use Policy", href: "/acceptable-use" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", abbr: "in", href: "https://www.linkedin.com/company/litigoofficial/" },
  { label: "Facebook", abbr: "f", href: "https://www.facebook.com/mylitigo" },
  { label: "Instagram", abbr: "ig", href: "https://www.instagram.com/mylitigo" },
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-900">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-gray-900">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="Litigo" className="h-10 w-10 rounded-lg" />
          </div>
          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Resources" links={RESOURCES_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">Connect</p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-xs text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900"
                >
                  {social.abbr}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Litigo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
