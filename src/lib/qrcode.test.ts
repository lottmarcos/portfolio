import { describe, expect, test } from "vitest";

import { isValidQrCode, QR_CODE_VALUES } from "./qrcode";
import { QR_CODE_REGISTRY } from "./qrcode-registry";

describe("isValidQrCode", () => {
  test("returns true for 'meetup-frontend-avenue'", () => {
    expect(isValidQrCode("meetup-frontend-avenue")).toBe(true);
  });

  test("returns false for an unknown value", () => {
    expect(isValidQrCode("unknown-value")).toBe(false);
  });

  test("returns false for null", () => {
    expect(isValidQrCode(null)).toBe(false);
  });

  test("returns false for empty string", () => {
    expect(isValidQrCode("")).toBe(false);
  });
});

describe("QR_CODE_REGISTRY", () => {
  test("has an entry for every value in QR_CODE_VALUES", () => {
    for (const value of QR_CODE_VALUES) {
      expect(QR_CODE_REGISTRY[value]).toBeDefined();
    }
  });

  test("all entries have required fields", () => {
    for (const value of QR_CODE_VALUES) {
      const entry = QR_CODE_REGISTRY[value];
      expect(typeof entry.dictKey).toBe("string");
      expect(typeof entry.component).toBe("function");
      expect(typeof entry.hasFab).toBe("boolean");
    }
  });

  test("meetup-frontend-avenue has correct dictKey and hasFab", () => {
    const entry = QR_CODE_REGISTRY["meetup-frontend-avenue"];
    expect(entry.dictKey).toBe("meetupFrontendAvenue");
    expect(entry.hasFab).toBe(true);
  });
});
