/**
 * Minimal in-memory rate limiter. Per serverless instance — adequate for a
 * portfolio's low traffic. Not a distributed limiter; do not rely on it for
 * security-critical throttling.
 */
const hits = new Map<string, number>();

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number; // seconds
}

export function checkRateLimit(key: string, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  const last = hits.get(key);

  if (last !== undefined && now - last < windowMs) {
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - last)) / 1000) };
  }

  hits.set(key, now);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5_000) {
    for (const [k, ts] of hits) {
      if (now - ts > windowMs) hits.delete(k);
    }
  }

  return { ok: true, retryAfter: 0 };
}
