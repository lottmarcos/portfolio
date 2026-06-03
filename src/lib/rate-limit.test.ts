import { describe, expect, it } from "vitest";

import { checkRateLimit } from "./rate-limit";

describe("checkRateLimit", () => {
  it("allows the first hit and blocks an immediate repeat", () => {
    const key = `test-${Math.random()}`;
    expect(checkRateLimit(key, 60_000).ok).toBe(true);

    const blocked = checkRateLimit(key, 60_000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("allows again once the window has elapsed", () => {
    const key = `test-${Math.random()}`;
    expect(checkRateLimit(key, 10).ok).toBe(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(checkRateLimit(key, 10).ok).toBe(true);
        resolve();
      }, 20);
    });
  });
});
