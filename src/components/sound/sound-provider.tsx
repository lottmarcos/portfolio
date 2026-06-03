"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { playSound, type SoundName } from "@/lib/sound/engine";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (value: boolean) => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "sound-enabled";

interface AudioWindow {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

export function SoundProvider({ children }: { children: ReactNode }) {
  // Default off: sound is opt-in and browsers block audio before a gesture anyway.
  const [enabled, setEnabledState] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Defer the persisted-preference read off the synchronous render path.
    const id = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) setEnabledState(stored === "true");
      } catch {
        // localStorage unavailable — keep the default.
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const ensureContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;

    let ctx = contextRef.current;
    if (!ctx) {
      const win = window as unknown as AudioWindow;
      const Ctor = win.AudioContext ?? win.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      contextRef.current = ctx;
    }

    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    return ctx;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = ensureContext();
      if (!ctx) return;
      try {
        playSound(ctx, name);
      } catch {
        // Ignore audio failures — sound is non-essential.
      }
    },
    [enabled, ensureContext]
  );

  const setEnabled = useCallback(
    (value: boolean) => {
      setEnabledState(value);
      try {
        localStorage.setItem(STORAGE_KEY, String(value));
      } catch {
        // Ignore persistence failures.
      }
      // Confirm the toggle audibly when turning sound on.
      if (value) {
        const ctx = ensureContext();
        if (ctx) {
          try {
            playSound(ctx, "toggle");
          } catch {
            // ignore
          }
        }
      }
    },
    [ensureContext]
  );

  const toggle = useCallback(() => setEnabled(!enabled), [enabled, setEnabled]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, setEnabled, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within a SoundProvider.");
  }
  return ctx;
}
