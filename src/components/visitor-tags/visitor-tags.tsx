"use client";

import { LoaderCircle, MapPin, RotateCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/i18n/language-provider";
import { useSound } from "@/components/sound/sound-provider";
import { EmojiPicker } from "@/components/visitor-tags/emoji-picker";
import { DEFAULT_EMOJI } from "@/lib/emoji-data";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { CityTag, EmojiTag, VisitorTagsSnapshot } from "@/lib/types";
import {
  clearInvalidStoredEmoji,
  persistStoredEmoji,
  readStoredEmoji,
} from "@/lib/visitor-emoji-storage";

type Phase = "idle" | "locating" | "submitting" | "denied" | "done";

type PostMarkResult =
  | { ok: true; data: VisitorTagsSnapshot }
  | {
      ok: false;
      error: string;
      code?: string;
      retryAfter?: number;
    };

const STORAGE_CITY_KEY = "visitor_city_submitted";
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
    return null;
  }
}

function readCitySubmitted(): boolean {
  try {
    return Boolean(localStorage.getItem(STORAGE_CITY_KEY));
  } catch {
    return false;
  }
}

function formatErrorMessage(
  visitor: Dictionary["visitor"],
  error: string,
  options?: { code?: string; retryAfter?: number }
): string {
  if (options?.retryAfter && options.retryAfter > 0) {
    return visitor.rateLimitedRetry.replace(
      "{seconds}",
      String(options.retryAfter)
    );
  }
  if (options?.code === "not_configured") return visitor.saveFailedConfig;
  if (options?.code === "rpc_error") return visitor.saveFailedDb;
  return error || visitor.rateLimited;
}

export function VisitorTags() {
  const { play } = useSound();
  const { t } = useLanguage();
  const [cities, setCities] = useState<CityTag[]>([]);
  const [globalEmojis, setGlobalEmojis] = useState<EmojiTag[]>([]);
  const [emoji, setEmoji] = useState<string>(DEFAULT_EMOJI);
  const [savedEmoji, setSavedEmoji] = useState<string | null>(null);
  const [citySubmitted, setCitySubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const emojiSubmitLockRef = useRef(false);

  const applySnapshot = useCallback((snapshot: VisitorTagsSnapshot) => {
    setCities(snapshot.topCities ?? []);
    setGlobalEmojis(snapshot.topEmojis ?? []);
  }, []);

  const fetchSnapshot = useCallback(async () => {
    try {
      const res = await fetch("/api/visitor-tags", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as VisitorTagsSnapshot;
      applySnapshot(data);
    } catch {
      // Silent — the widget simply shows nothing new.
    }
  }, [applySnapshot]);

  const postMark = useCallback(
    async (body: {
      city?: string;
      emoji?: string;
      previousEmoji?: string;
    }): Promise<PostMarkResult> => {
      const res = await fetch("/api/visitor-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let payload: {
        error?: string;
        code?: string;
        success?: boolean;
      } & Partial<VisitorTagsSnapshot> = {};
      try {
        payload = (await res.json()) as typeof payload;
      } catch {
        payload = {};
      }

      if (!res.ok) {
        const retryHeader = res.headers.get("Retry-After");
        const retryAfter = retryHeader ? Number.parseInt(retryHeader, 10) : undefined;
        return {
          ok: false,
          error: payload.error ?? t.visitor.saveFailed,
          code: payload.code,
          retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined,
        };
      }

      return {
        ok: true,
        data: {
          topCities: payload.topCities ?? [],
          topEmojis: payload.topEmojis ?? [],
        },
      };
    },
    [t.visitor.saveFailed]
  );

  useEffect(() => {
    let cancelled = false;

    clearInvalidStoredEmoji();

    void (async () => {
      await fetchSnapshot();
      if (cancelled) return;
      const cityFlag = readCitySubmitted();
      const storedEmoji = readStoredEmoji();
      setCitySubmitted(cityFlag);
      if (storedEmoji) {
        setEmoji(storedEmoji);
        setSavedEmoji(storedEmoji);
      }
      if (cityFlag || storedEmoji) setPhase("done");
    })();

    pollRef.current = setInterval(() => void fetchSnapshot(), POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void fetchSnapshot();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchSnapshot]);

  const markCityFromGeo = useCallback(() => {
    play("click");
    setErrorMessage(null);

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

        if (!city) {
          setPhase(citySubmitted ? "done" : "idle");
          return;
        }

        setPhase("submitting");
        const result = await postMark({ city });
        if (!result.ok) {
          setErrorMessage(
            formatErrorMessage(t.visitor, result.error, {
              code: result.code,
              retryAfter: result.retryAfter,
            })
          );
          setPhase(citySubmitted ? "done" : "idle");
          return;
        }

        applySnapshot(result.data);
        setCitySubmitted(true);
        setPhase("done");
        play("success");
        try {
          localStorage.setItem(STORAGE_CITY_KEY, "1");
        } catch {
          // ignore
        }
      },
      () => setPhase("denied"),
      { timeout: 10_000, maximumAge: 60_000 }
    );
  }, [applySnapshot, citySubmitted, play, postMark, t.visitor]);

  const sendGlobalEmoji = useCallback(async () => {
    if (emojiSubmitLockRef.current) return;
    emojiSubmitLockRef.current = true;
    setTimeout(() => {
      emojiSubmitLockRef.current = false;
    }, 400);

    play("click");
    setErrorMessage(null);
    setPhase("submitting");

    const previousEmoji =
      savedEmoji && savedEmoji !== emoji ? savedEmoji : undefined;
    const result = await postMark({ emoji, previousEmoji });

    if (!result.ok) {
      setErrorMessage(
        formatErrorMessage(t.visitor, result.error, {
          code: result.code,
          retryAfter: result.retryAfter,
        })
      );
      setPhase("done");
      return;
    }

    applySnapshot(result.data);
    setSavedEmoji(emoji);
    setPhase("done");
    play("success");
    persistStoredEmoji(emoji);
  }, [applySnapshot, emoji, play, postMark, savedEmoji, t.visitor]);

  const busy = phase === "locating" || phase === "submitting";
  const showCityForm = !citySubmitted;
  const emojiUnchanged = savedEmoji !== null && savedEmoji === emoji;

  return (
    <section aria-labelledby="visitor-tags-title" className="w-full">
      <h3 id="visitor-tags-title" className="text-overline mb-3">
        {t.visitor.title}
      </h3>

      {globalEmojis.length > 0 && (
        <ul
          className="mb-3 flex flex-wrap gap-2"
          aria-label={t.visitor.sendEmoji}
        >
          {globalEmojis.map((tag) => (
            <li
              key={tag.emoji}
              className="animate-tag-in inline-flex items-center gap-1 rounded-full border border-border bg-background/60 py-1 pr-2.5 pl-2 text-sm"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {tag.emoji}
              </span>
              <span className="tabular-nums text-muted-foreground">×{tag.count}</span>
            </li>
          ))}
        </ul>
      )}

      {cities.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2" aria-label={t.visitor.leaveMark}>
          {cities.map((tag) => (
            <li
              key={tag.city}
              className="animate-tag-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 py-1 pr-2.5 pl-2 text-sm"
            >
              <span className="text-foreground">{tag.city}</span>
              <span className="tabular-nums text-muted-foreground">
                ×{tag.count}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" className="min-h-11 space-y-3">
        {errorMessage ? (
          <p className="text-caption text-destructive">{errorMessage}</p>
        ) : null}

        {phase === "denied" && showCityForm ? (
          <div className="space-y-3">
            <p className="text-caption inline-flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {t.visitor.denied}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={markCityFromGeo}
                onMouseEnter={() => play("hover")}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
              >
                <RotateCw className="size-3.5" aria-hidden="true" />
                {t.visitor.retry}
              </button>
            </div>
          </div>
        ) : null}

        {citySubmitted && (
          <p className="text-caption inline-flex items-center gap-1.5">
            <Sparkles className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {t.visitor.onMap}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <EmojiPicker value={emoji} onSelect={setEmoji} />
          <button
            type="button"
            onClick={() => void sendGlobalEmoji()}
            onMouseEnter={() => !busy && !emojiUnchanged && play("hover")}
            disabled={busy || emojiUnchanged}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background/80 px-4 text-sm font-semibold text-foreground transition-[transform,opacity] duration-200 ease-[var(--ease-spring)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
          >
            {busy && phase === "submitting" && (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            )}
            {busy && phase === "submitting"
              ? t.visitor.saving
              : savedEmoji
                ? t.visitor.changeEmoji
                : t.visitor.sendEmoji}
          </button>
        </div>

        {showCityForm && phase !== "denied" && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={markCityFromGeo}
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
