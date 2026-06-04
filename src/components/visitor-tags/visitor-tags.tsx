"use client";

import { LoaderCircle, MapPin, RotateCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/i18n/language-provider";
import { useSound } from "@/components/sound/sound-provider";
import { EmojiPicker } from "@/components/visitor-tags/emoji-picker";
import { DEFAULT_EMOJI } from "@/lib/emoji-data";
import type { CityTag } from "@/lib/types";

type Phase = "idle" | "locating" | "submitting" | "denied" | "done";

const STORAGE_KEY = "visitor_tag_submitted";
const POLL_MS = 30_000;

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&addressdetails=1`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const data = (await res.json()) as { address?: Record<string, string> };
    const a = data.address ?? {};
    return (
      a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? a.state ?? null
    );
  } catch {
    // Silent fallback per spec — no visible geocoding error.
    return null;
  }
}

export function VisitorTags() {
  const { play } = useSound();
  const { t } = useLanguage();
  const [cities, setCities] = useState<CityTag[]>([]);
  const [emoji, setEmoji] = useState<string>(DEFAULT_EMOJI);
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchCities = useCallback(async () => {
    try {
      const res = await fetch("/api/visitor-tags", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { topCities: CityTag[] };
      setCities(data.topCities ?? []);
    } catch {
      // Silent — the widget simply shows nothing new.
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await fetchCities();
      if (cancelled) return;
      try {
        if (localStorage.getItem(STORAGE_KEY)) {
          setSubmitted(true);
          setPhase("done");
        }
      } catch {
        // ignore
      }
    })();

    pollRef.current = setInterval(() => void fetchCities(), POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void fetchCities();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchCities]);

  const leaveMark = useCallback(() => {
    play("click");

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setPhase("denied");
      return;
    }

    setPhase("locating");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const city = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude
        );

        // Geocoding failed — silent fallback, let the user retry.
        if (!city) {
          setPhase("idle");
          return;
        }

        setPhase("submitting");
        try {
          const res = await fetch("/api/visitor-tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city, emoji }),
          });

          if (!res.ok) {
            setPhase("idle");
            return;
          }

          const data = (await res.json()) as { topCities: CityTag[] };
          setCities(data.topCities ?? []);
          setSubmitted(true);
          setPhase("done");
          play("success");
          try {
            localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            // ignore
          }
        } catch {
          setPhase("idle");
        }
      },
      () => setPhase("denied"),
      { timeout: 10_000, maximumAge: 60_000 }
    );
  }, [emoji, play]);

  const busy = phase === "locating" || phase === "submitting";

  return (
    <section aria-labelledby="visitor-tags-title" className="w-full">
      <h3 id="visitor-tags-title" className="text-overline mb-3">
        {t.visitor.title}
      </h3>

      {cities.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {cities.map((tag) => (
            <li
              key={tag.city}
              className="animate-tag-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 py-1 pr-2.5 pl-2 text-sm"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {tag.emoji}
              </span>
              <span className="text-foreground">{tag.city}</span>
              <span className="tabular-nums text-muted-foreground">
                ×{tag.count}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" className="min-h-11">
        {phase === "denied" ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-caption inline-flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {t.visitor.denied}
            </p>
            <button
              type="button"
              onClick={leaveMark}
              onMouseEnter={() => play("hover")}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
            >
              <RotateCw className="size-3.5" aria-hidden="true" />
              {t.visitor.retry}
            </button>
          </div>
        ) : submitted ? (
          <p className="text-caption inline-flex items-center gap-1.5">
            <Sparkles className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {t.visitor.onMap}
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <EmojiPicker value={emoji} onSelect={setEmoji} />
            <button
              type="button"
              onClick={leaveMark}
              onMouseEnter={() => !busy && play("hover")}
              disabled={busy}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[transform,opacity] duration-200 ease-[var(--ease-spring)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
            >
              {busy && (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              )}
              {phase === "locating"
                ? t.visitor.locating
                : phase === "submitting"
                  ? t.visitor.saving
                  : t.visitor.leaveMark}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
