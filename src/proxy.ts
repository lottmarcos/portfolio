import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { resolveCanonicalRedirect } from "@/lib/security/canonical";
import { applySecurityHeaders } from "@/lib/security/headers";

function withSecurityHeaders(response: NextResponse): NextResponse {
  applySecurityHeaders(response);
  return response;
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? null;
  const protocol = request.headers.get("x-forwarded-proto");
  const redirect = resolveCanonicalRedirect(
    host,
    protocol,
    request.nextUrl.pathname,
    request.nextUrl.search
  );

  if (redirect) {
    return withSecurityHeaders(NextResponse.redirect(redirect.target, 308));
  }

  let supabaseResponse = withSecurityHeaders(NextResponse.next({ request }));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return supabaseResponse;
  }

  createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = withSecurityHeaders(NextResponse.next({ request }));
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
