/**
 * Minimal in-memory rate limiter. Per serverless instance — adequate for a
 * portfolio's low traffic. Not a distributed limiter; do not rely on it for
 * security-critical throttling.
 */
const hits = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number; // seconds
}

export interface RateLimitOptions {
  windowMs?: number;
  maxHits?: number;
}

function normalizeOptions(options: RateLimitOptions | number): Required<RateLimitOptions> {
  if (typeof options === "number") {
    return { windowMs: options, maxHits: 1 };
  }
  return {
    windowMs: options.windowMs ?? 60_000,
    maxHits: options.maxHits ?? 1,
  };
}

function pruneTimestamps(timestamps: number[], windowStart: number): number[] {
  return timestamps.filter((t) => t > windowStart);
}

function evaluateLimit(
  timestamps: number[],
  windowMs: number,
  maxHits: number,
  now: number
): RateLimitResult {
  const windowStart = now - windowMs;
  const active = pruneTimestamps(timestamps, windowStart);

  if (active.length >= maxHits) {
    const oldest = active[0]!;
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  return { ok: true, retryAfter: 0 };
}

/** Check without consuming a hit (use before attempting the operation). */
export function peekRateLimit(
  key: string,
  options: RateLimitOptions | number = {}
): RateLimitResult {
  const { windowMs, maxHits } = normalizeOptions(options);
  const now = Date.now();
  const timestamps = hits.get(key) ?? [];
  return evaluateLimit(timestamps, windowMs, maxHits, now);
}

/** Record a successful hit after the operation completes. */
export function commitRateLimit(
  key: string,
  options: RateLimitOptions | number = {}
): void {
  const { windowMs, maxHits } = normalizeOptions(options);
  const now = Date.now();
  const windowStart = now - windowMs;

  const timestamps = pruneTimestamps(hits.get(key) ?? [], windowStart);
  if (timestamps.length < maxHits) {
    timestamps.push(now);
    hits.set(key, timestamps);
  }

  if (hits.size > 5_000) {
    for (const [k, ts] of hits) {
      const pruned = pruneTimestamps(ts, windowStart);
      if (pruned.length === 0) hits.delete(k);
      else hits.set(k, pruned);
    }
  }
}

/** Undo the most recent committed hit — use when the guarded operation failed. */
export function releaseRateLimit(
  key: string,
  options: RateLimitOptions | number = {}
): void {
  const { windowMs } = normalizeOptions(options);
  const windowStart = Date.now() - windowMs;
  const timestamps = pruneTimestamps(hits.get(key) ?? [], windowStart);
  timestamps.pop();
  if (timestamps.length === 0) hits.delete(key);
  else hits.set(key, timestamps);
}
