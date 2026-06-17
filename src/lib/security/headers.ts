type Header = { key: string; value: string };

function buildContentSecurityPolicy(
  includeUpgradeInsecureRequests: boolean,
  isDev: boolean
): string {
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://*.supabase.co https://nominatim.openstreetmap.org",
  ];

  if (includeUpgradeInsecureRequests) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function getSecurityHeaders(): Header[] {
  const isDev = process.env.NODE_ENV === "development";

  const headers: Header[] = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(!isDev, isDev),
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-site",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(self), payment=(), usb=()",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
  ];

  if (!isDev) {
    headers.splice(5, 0, {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}

export const securityHeaders: Header[] = getSecurityHeaders();

export function applySecurityHeaders(response: Response): void {
  for (const header of getSecurityHeaders()) {
    response.headers.set(header.key, header.value);
  }
}
