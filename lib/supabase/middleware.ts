import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const PUBLIC_PATH_PREFIXES = [
    "/login",
    "/signup",
    "/forgot-password",
    "/auth",
    "/privacy",
    "/terms",
    "/pricing",
    "/security",
    "/changelog",
    "/about",
    "/our-story",
    "/careers",
    "/contact",
    "/blog",
    "/docs",
    "/help",
    "/cookie-policy",
    "/refund-policy",
    "/acceptable-use",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
    "/twitter-image",
    // Every API route handles its own auth (a session check returning 401
    // JSON, a shared-secret header, or a webhook signature) and must respond
    // in kind to a fetch() caller — redirecting to the /login HTML page
    // instead would break every client-side error handler expecting JSON.
    "/api",
  ];
  const isAuthRoute =
    request.nextUrl.pathname === "/" ||
    PUBLIC_PATH_PREFIXES.some((prefix) => request.nextUrl.pathname.startsWith(prefix));

  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}
