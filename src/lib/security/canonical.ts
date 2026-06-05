const DEFAULT_REDIRECT_HOSTS = [
  "lott.dev.br",
  "marcoslott.dev",
  "www.marcoslott.dev",
] as const;

export function getCanonicalOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://lott.dev";
}

export function getCanonicalHost(): string {
  return new URL(getCanonicalOrigin()).host;
}

export function getRedirectHosts(): string[] {
  const canonical = getCanonicalHost();
  const configured = process.env.REDIRECT_HOSTS?.split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  const hosts = configured ?? [...DEFAULT_REDIRECT_HOSTS];
  return [...new Set(hosts)].filter((host) => host !== canonical);
}

export function buildCanonicalRedirectUrl(
  requestUrl: URL,
  canonicalOrigin: string
): URL {
  const target = new URL(canonicalOrigin);
  target.pathname = requestUrl.pathname;
  target.search = requestUrl.search;
  return target;
}

export function resolveCanonicalRedirect(
  host: string | null,
  protocol: string | null,
  pathname: string,
  search: string
): { kind: "https" | "canonical"; target: URL } | null {
  if (protocol === "http") {
    const target = new URL(getCanonicalOrigin());
    target.pathname = pathname;
    target.search = search;
    return { kind: "https", target };
  }

  const normalizedHost = host?.toLowerCase();
  if (!normalizedHost) return null;

  const redirectHosts = getRedirectHosts();
  if (!redirectHosts.includes(normalizedHost)) return null;

  const target = buildCanonicalRedirectUrl(
    new URL(`https://${normalizedHost}${pathname}${search}`),
    getCanonicalOrigin()
  );
  return { kind: "canonical", target };
}
