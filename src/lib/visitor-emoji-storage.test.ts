import { describe, expect, it } from "vitest";

import { sanitizeStoredEmoji } from "./visitor-emoji-storage";

describe("sanitizeStoredEmoji", () => {
  it("rejects legacy boolean flag", () => {
    expect(sanitizeStoredEmoji("1")).toBeNull();
  });

  it("rejects non-emoji strings", () => {
    expect(sanitizeStoredEmoji("abc")).toBeNull();
  });

  it("accepts a single emoji", () => {
    expect(sanitizeStoredEmoji("👋")).toBe("👋");
  });
});
