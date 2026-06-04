import "server-only";

import { cookies, headers } from "next/headers";

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/**
 * Resolve the active locale for a request:
 * 1. An explicit `locale` cookie (set by the language toggle) wins.
 * 2. Otherwise fall back to the visitor's country — Brazil → pt, else en.
 * 3. Finally honor Accept-Language, then the default.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const headerStore = await headers();
  const country = headerStore.get("x-vercel-ip-country");
  if (country === "BR") return "pt";

  const accept = (headerStore.get("accept-language") ?? "").toLowerCase();
  if (accept.startsWith("pt")) return "pt";

  return defaultLocale;
}
