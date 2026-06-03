import { describe, expect, it } from "vitest";

import { isSingleEmoji, visitorTagSchema } from "./visitor-tags";

describe("isSingleEmoji", () => {
  it("accepts a single emoji", () => {
    expect(isSingleEmoji("👋")).toBe(true);
    expect(isSingleEmoji("🌊")).toBe(true);
  });

  it("rejects letters, digits, and empty strings", () => {
    expect(isSingleEmoji("a")).toBe(false);
    expect(isSingleEmoji("1")).toBe(false);
    expect(isSingleEmoji("")).toBe(false);
  });

  it("rejects multiple emojis or emoji + text", () => {
    expect(isSingleEmoji("👋👋")).toBe(false);
    expect(isSingleEmoji("👋 hi")).toBe(false);
  });
});

describe("visitorTagSchema", () => {
  it("accepts a valid payload and trims the city", () => {
    const result = visitorTagSchema.safeParse({ city: "  São Paulo ", emoji: "🌊" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.city).toBe("São Paulo");
  });

  it("rejects an empty city", () => {
    expect(visitorTagSchema.safeParse({ city: "", emoji: "🌊" }).success).toBe(false);
  });

  it("rejects a city longer than 100 chars", () => {
    expect(
      visitorTagSchema.safeParse({ city: "x".repeat(101), emoji: "🌊" }).success
    ).toBe(false);
  });
});
