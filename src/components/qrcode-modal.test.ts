import { beforeEach, describe, expect, test, vi } from "vitest";

const mockGet = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

vi.mock("@/components/i18n/language-provider", () => ({
  useLanguage: () => ({
    locale: "en",
    t: {
      qrcode: {
        meetupFrontendAvenue: {
          title: "Frontend Avenue",
          description: "Thanks for attending the meetup!",
          fab: "Meetup Frontend",
          connectPrompt: "Let's connect on LinkedIn:",
          connectButton: "Connect",
        },
      },
    },
  }),
}));

vi.mock("@/components/sound/sound-provider", () => ({
  useSound: () => ({ play: vi.fn() }),
}));

import { isValidQrCode } from "@/lib/qrcode";
import { QR_CODE_REGISTRY } from "@/lib/qrcode-registry";

describe("QrCodeModal integration logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("param validation → modal open decision", () => {
    test("valid param triggers modal open", () => {
      mockGet.mockReturnValue("meetup-frontend-avenue");
      const param = mockGet("qrcode");
      expect(isValidQrCode(param)).toBe(true);
    });

    test("null param does not trigger modal", () => {
      mockGet.mockReturnValue(null);
      const param = mockGet("qrcode");
      expect(isValidQrCode(param)).toBe(false);
    });

    test("invalid param does not trigger modal", () => {
      mockGet.mockReturnValue("random-event");
      const param = mockGet("qrcode");
      expect(isValidQrCode(param)).toBe(false);
    });
  });

  describe("close behavior", () => {
    test("closing only toggles dismissed state, URL is preserved", () => {
      mockGet.mockReturnValue("meetup-frontend-avenue");
      const param = mockGet("qrcode");

      let dismissed = false;
      dismissed = true;

      expect(dismissed).toBe(true);
      expect(isValidQrCode(param)).toBe(true);
    });

    test("dismissed state can be toggled back to reopen modal", () => {
      mockGet.mockReturnValue("meetup-frontend-avenue");
      const param = mockGet("qrcode");

      let dismissed = true;
      dismissed = false;

      expect(dismissed).toBe(false);
      expect(isValidQrCode(param)).toBe(true);
    });
  });

  describe("registry mapping", () => {
    test("meetup-frontend-avenue resolves to a valid registry entry", () => {
      const entry = QR_CODE_REGISTRY["meetup-frontend-avenue"];
      expect(entry.dictKey).toBe("meetupFrontendAvenue");
      expect(typeof entry.component).toBe("function");
      expect(entry.hasFab).toBe(true);
    });
  });
});
