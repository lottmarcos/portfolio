"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useSound } from "@/components/sound/sound-provider";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => play("hover")}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      title={enabled ? "Sound on" : "Sound off"}
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
