import { describe, expect, it } from "vitest";

import { isSingleEmoji, visitorMarkSchema } from "./visitor-tags";

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

describe("visitorMarkSchema", () => {
  it("rejects city and emoji together", () => {
    const result = visitorMarkSchema.safeParse({ city: "  São Paulo ", emoji: "🌊" });
    expect(result.success).toBe(false);
  });

  it("accepts emoji swap fields", () => {
    const result = visitorMarkSchema.safeParse({
      emoji: "🎉",
      previousEmoji: "👋",
    });
    expect(result.success).toBe(true);
  });

  it("accepts city only", () => {
    const result = visitorMarkSchema.safeParse({ city: "Lisbon" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.emoji).toBeUndefined();
  });

  it("accepts emoji only", () => {
    const result = visitorMarkSchema.safeParse({ emoji: "🎉" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.city).toBeUndefined();
  });

  it("rejects empty body", () => {
    expect(visitorMarkSchema.safeParse({}).success).toBe(false);
  });

  it("rejects an empty city when provided", () => {
    expect(visitorMarkSchema.safeParse({ city: "" }).success).toBe(false);
  });

  it("rejects a city longer than 100 chars", () => {
    expect(visitorMarkSchema.safeParse({ city: "x".repeat(101) }).success).toBe(
      false
    );
  });
});
