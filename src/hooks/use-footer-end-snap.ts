"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  FOOTER_END_SNAP_DURATION_MS,
  FOOTER_END_SNAP_SCROLL_DEBOUNCE_MS,
  getMaxScrollTop,
  getRemainingScrollGap,
  getSnapScrollOffset,
  isInFooterSnapZone,
  shouldSnapToPageEnd,
} from "@/lib/footer-end-snap";

const PROGRAMMATIC_CLASS = "about-snap--programmatic";
const FOOTER_MODE_CLASS = "about-snap--footer-mode";

function updateFooterMode(gap: number): void {
  document.documentElement.classList.toggle(
    FOOTER_MODE_CLASS,
    isInFooterSnapZone(gap)
  );
}

export function useFooterEndSnap(enabled = true): void {
  const isSnappingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  const trySnap = useCallback(() => {
    if (!enabled || isSnappingRef.current) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const gap = getRemainingScrollGap(scrollY, scrollHeight, innerHeight);

    updateFooterMode(gap);

    // Respect reduced motion: the CSS already disables scroll-snap, so don't
    // force a programmatic jump either.
    if (reducedMotionRef.current) return;
    if (!shouldSnapToPageEnd(gap)) return;

    isSnappingRef.current = true;
    cancelScrollRef.current?.();
    document.documentElement.classList.add(PROGRAMMATIC_CLASS);

    const release = () => {
      isSnappingRef.current = false;
      cancelScrollRef.current = null;
      document.documentElement.classList.remove(PROGRAMMATIC_CLASS);
    };

    const startTop = scrollY;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = (now - startTime) / FOOTER_END_SNAP_DURATION_MS;
      // Recompute the target each frame: async content (footer reveal, visitor
      // tags) can grow the document mid-animation and shift the real bottom.
      const target = getMaxScrollTop(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      if (progress >= 1) {
        window.scrollTo(0, target);
        release();
        return;
      }
      window.scrollTo(0, getSnapScrollOffset(startTop, target, progress));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    cancelScrollRef.current = () => {
      cancelAnimationFrame(rafId);
      release();
    };
  }, [enabled]);

  const onScrollUpdate = useCallback(() => {
    if (!enabled) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const gap = getRemainingScrollGap(
      window.scrollY,
      scrollHeight,
      innerHeight
    );

    updateFooterMode(gap);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      onScrollUpdate();
      if (isSnappingRef.current) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(trySnap, FOOTER_END_SNAP_SCROLL_DEBOUNCE_MS);
    };

    const onScrollEnd = () => {
      onScrollUpdate();
      clearTimeout(debounceTimer);
      trySnap();
    };

    // Hand control back to the user the moment they take over mid-snap.
    // Programmatic scrollTo doesn't emit wheel/touch/keydown, so these are
    // genuine user-intent signals.
    const cancelOnUserInput = () => {
      if (isSnappingRef.current) cancelScrollRef.current?.();
    };

    window.addEventListener("scrollend", onScrollEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", cancelOnUserInput, { passive: true });
    window.addEventListener("touchstart", cancelOnUserInput, { passive: true });
    window.addEventListener("keydown", cancelOnUserInput);

    return () => {
      cancelScrollRef.current?.();
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancelOnUserInput);
      window.removeEventListener("touchstart", cancelOnUserInput);
      window.removeEventListener("keydown", cancelOnUserInput);
      clearTimeout(debounceTimer);
      document.documentElement.classList.remove(PROGRAMMATIC_CLASS);
      document.documentElement.classList.remove(FOOTER_MODE_CLASS);
    };
  }, [enabled, trySnap, onScrollUpdate]);
}
