import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://mylitigo.com";
const SITE_DESCRIPTION =
  "Litigo is a digital case diary built for Indian solo advocates and litigators — track cases, hearing dates, and notes in one place, replacing the physical diary, WhatsApp threads, and Excel sheets.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Litigo — Digital Case Diary for Indian Advocates",
    template: "%s · Litigo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "case diary",
    "case diary software",
    "advocate case management",
    "litigation management software India",
    "lawyer case tracking",
    "hearing date tracker",
    "cause list",
    "legal case diary app",
    "solo advocate software",
    "litigator software India",
  ],
  authors: [{ name: "Litigo" }],
  creator: "Litigo",
  publisher: "Litigo",
  category: "Legal Software",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Litigo",
    title: "Litigo — Digital Case Diary for Indian Advocates",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Litigo — Digital Case Diary for Indian Advocates",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
