"use client";

import { Globe } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { useSound } from "@/components/sound/sound-provider";

export function LanguageToggle() {
  const { locale, toggle, t } = useLanguage();
  const { play } = useSound();

  function handleToggle() {
    play("click");
    toggle();
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => play("hover")}
      aria-label={t.controls.switchLanguage}
      title={t.controls.switchLanguage}
      className="inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
    >
      <Globe className="size-[18px]" aria-hidden="true" />
      <span className="text-xs font-semibold tracking-wide uppercase tabular-nums">
        {locale}
      </span>
    </button>
  );
}
