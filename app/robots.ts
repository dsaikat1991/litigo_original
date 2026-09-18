import type { MetadataRoute } from "next";

const SITE_URL = "https://mylitigo.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/cases",
          "/today",
          "/calendar",
          "/notes",
          "/settings",
          "/profile",
          "/notifications",
          "/search",
          "/reset-password",
          "/auth",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
