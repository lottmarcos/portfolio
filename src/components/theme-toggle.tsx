"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useLanguage } from "@/components/i18n/language-provider";
import { useSound } from "@/components/sound/sound-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { play } = useSound();
  const { t } = useLanguage();

  function handleToggle() {
    play("click");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => play("hover")}
      aria-label={t.controls.theme}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
    >
      {/* Icons are driven purely by the `dark:` variant — no JS state, no
          hydration flash. */}
      <Sun
        className="size-[18px] scale-100 rotate-0 transition-all duration-300 ease-[var(--ease-spring)] dark:scale-0 dark:-rotate-90"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-[18px] scale-0 rotate-90 transition-all duration-300 ease-[var(--ease-spring)] dark:scale-100 dark:rotate-0"
        aria-hidden="true"
      />
    </button>
  );
}
