import { describe, expect, it } from "vitest";

import {
  commitRateLimit,
  peekRateLimit,
  releaseRateLimit,
} from "./rate-limit";

describe("peekRateLimit + commitRateLimit", () => {
  it("peek does not consume a slot; commit records after success", () => {
    const key = `peek-${Math.random()}`;
    const opts = { windowMs: 60_000, maxHits: 1 };

    expect(peekRateLimit(key, opts).ok).toBe(true);
    expect(peekRateLimit(key, opts).ok).toBe(true);

    commitRateLimit(key, opts);

    expect(peekRateLimit(key, opts).ok).toBe(false);
  });

  it("failed attempts do not block when only commit is used", () => {
    const key = `fail-${Math.random()}`;
    const opts = { windowMs: 60_000, maxHits: 1 };

    expect(peekRateLimit(key, opts).ok).toBe(true);
    expect(peekRateLimit(key, opts).ok).toBe(true);
    expect(peekRateLimit(key, opts).ok).toBe(true);
  });

  it("allows up to maxHits after commits", () => {
    const key = `multi-${Math.random()}`;
    const opts = { windowMs: 60_000, maxHits: 3 };

    expect(peekRateLimit(key, opts).ok).toBe(true);
    commitRateLimit(key, opts);
    expect(peekRateLimit(key, opts).ok).toBe(true);
    commitRateLimit(key, opts);
    expect(peekRateLimit(key, opts).ok).toBe(true);
    commitRateLimit(key, opts);
    expect(peekRateLimit(key, opts).ok).toBe(false);
  });

  it("uses separate keys independently", () => {
    const a = `peek-a-${Math.random()}`;
    const b = `peek-b-${Math.random()}`;
    const opts = { windowMs: 60_000, maxHits: 1 };

    commitRateLimit(a, opts);
    expect(peekRateLimit(a, opts).ok).toBe(false);
    expect(peekRateLimit(b, opts).ok).toBe(true);
  });

  it("release undoes a reserved hit so a failed attempt isn't counted", () => {
    const key = `release-${Math.random()}`;
    const opts = { windowMs: 60_000, maxHits: 1 };

    commitRateLimit(key, opts);
    expect(peekRateLimit(key, opts).ok).toBe(false);

    releaseRateLimit(key, opts);
    expect(peekRateLimit(key, opts).ok).toBe(true);
  });
});
