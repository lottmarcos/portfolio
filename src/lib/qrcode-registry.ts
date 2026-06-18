import { MeetupFrontendAvenue } from "@/components/qrcode/meetup-frontend-avenue";
import type { QrCodeEntry, QrCodeValue } from "./qrcode";

export const QR_CODE_REGISTRY: Record<QrCodeValue, QrCodeEntry> = {
  "meetup-frontend-avenue": {
    dictKey: "meetupFrontendAvenue",
    component: MeetupFrontendAvenue,
    hasFab: true,
  },
};
