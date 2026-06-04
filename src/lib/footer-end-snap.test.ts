import { describe, expect, test } from "vitest";

import {
  FOOTER_END_SNAP_ALIGNED_THRESHOLD_PX,
  FOOTER_END_SNAP_RADIUS_PX,
  getMaxScrollTop,
  getRemainingScrollGap,
  isInFooterSnapZone,
  shouldSnapToPageEnd,
} from "./footer-end-snap";

describe("getRemainingScrollGap", () => {
  test("returns distance from viewport bottom to document end", () => {
    expect(getRemainingScrollGap(1000, 3000, 800)).toBe(1200);
    expect(getRemainingScrollGap(2200, 3000, 800)).toBe(0);
  });
});

describe("getMaxScrollTop", () => {
  test("returns scrollHeight minus innerHeight", () => {
    expect(getMaxScrollTop(3000, 800)).toBe(2200);
  });
});

describe("isInFooterSnapZone", () => {
  test("is true when gap is within radius", () => {
    expect(isInFooterSnapZone(FOOTER_END_SNAP_RADIUS_PX)).toBe(true);
    expect(isInFooterSnapZone(0)).toBe(true);
  });

  test("is false when gap exceeds radius", () => {
    expect(isInFooterSnapZone(FOOTER_END_SNAP_RADIUS_PX + 1)).toBe(false);
  });
});

describe("shouldSnapToPageEnd", () => {
  test("returns true when gap is within snap radius", () => {
    expect(shouldSnapToPageEnd(80)).toBe(true);
    expect(shouldSnapToPageEnd(FOOTER_END_SNAP_RADIUS_PX)).toBe(true);
  });

  test("returns false when already at end or out of radius", () => {
    expect(shouldSnapToPageEnd(FOOTER_END_SNAP_ALIGNED_THRESHOLD_PX)).toBe(false);
    expect(shouldSnapToPageEnd(0)).toBe(false);
    expect(shouldSnapToPageEnd(FOOTER_END_SNAP_RADIUS_PX + 1)).toBe(false);
  });
});
