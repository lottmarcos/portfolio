"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/components/i18n/language-provider";
import { isValidQrCode } from "@/lib/qrcode";
import { QR_CODE_REGISTRY } from "@/lib/qrcode-registry";

export function QrCodeModal() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  const qrcodeParam = searchParams.get("qrcode");
  const isValid = isValidQrCode(qrcodeParam);

  if (!isValid) return null;

  const entry = QR_CODE_REGISTRY[qrcodeParam];
  const strings = t.qrcode[entry.dictKey];
  const Content = entry.component;

  if (dismissed) {
    if (!entry.hasFab) return null;

    return (
      <button
        onClick={() => setDismissed(false)}
        className="fixed bottom-6 right-6 z-40 animate-bounce rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {strings.fab}
      </button>
    );
  }

  return (
    <Dialog open onOpenChange={(open) => !open && setDismissed(true)}>
      <DialogContent
        className="sm:max-w-md bg-card text-card-foreground ring-1 ring-border"
        overlay={<DialogOverlay className="bg-black/50" />}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            {strings.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {strings.description}
          </DialogDescription>
        </DialogHeader>

        <Content />
      </DialogContent>
    </Dialog>
  );
}
