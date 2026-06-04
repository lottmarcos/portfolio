"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { useSound } from "@/components/sound/sound-provider";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();
  const { t } = useLanguage();
  const label = enabled ? t.controls.soundMute : t.controls.soundEnable;

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => play("hover")}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
    >
      {enabled ? (
        <Volume2 className="size-[18px]" aria-hidden="true" />
      ) : (
        <VolumeX className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
