import { describe, expect, test } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  test("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  test("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  test("deduplicates conflicting tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
