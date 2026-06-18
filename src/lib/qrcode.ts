import type { ComponentType } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export const QR_CODE_VALUES = ["meetup-frontend-avenue"] as const;
export type QrCodeValue = (typeof QR_CODE_VALUES)[number];

export function isValidQrCode(value: string | null): value is QrCodeValue {
  return QR_CODE_VALUES.includes(value as QrCodeValue);
}

export interface QrCodeEntry {
  dictKey: keyof Dictionary["qrcode"];
  component: ComponentType;
  hasFab: boolean;
}
