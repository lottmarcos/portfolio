"use client";

import Image from "next/image";
import {
  Building2,
  ChevronDown,
  Cpu,
  GraduationCap,
  type LucideIcon,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "@/components/i18n/language-provider";
import { Reveal } from "@/components/reveal";
import { useSound } from "@/components/sound/sound-provider";
import { timeline } from "@/lib/timeline";
import { cn } from "@/lib/utils";

/**
 * Career timeline. Two views: a compact 3-beat summary (default, photoless) and
 * the full chronology (with photos). Every entry is always in the DOM; the
 * non-compact ones live in a `grid-template-rows: 0fr → 1fr` wrapper that
 * animates open/closed over 800ms (height + opacity), so expanding AND
 * collapsing are both animated and chronological order is preserved.
 *
 * Repeated years (2023×2, 2024×3) only print the year badge when it changes.
 */

/** Glyphs for the photoless entries — semantic, never emoji-as-icon. */
const ENTRY_ICONS: Record<string, LucideIcon> = {
  ufmg: GraduationCap,
  formulaTesla: Cpu,
  dito: MapPin,
  avenue: Building2,
  building: Sparkles,
};

export function Timeline() {
  const { t } = useLanguage();
  const { play } = useSound();
  const [expanded, setExpanded] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, close]);

  function toggleExpanded() {
    play("click");
    setExpanded((v) => {
      if (v) setOpenId(null);
      return !v;
    });
  }

  return (
    <section className="snap-section border-t border-border/60 py-16 sm:py-20">
      <div className="grid gap-8 md:grid-cols-[0.28fr_0.72fr] md:gap-16">
        <div className="md:sticky md:top-[var(--snap-header-offset)] md:self-start">
          <Reveal>
            <h2 className="text-overline md:pt-1">{t.timeline.heading}</h2>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <ol
              className={cn(
                "relative",
                "before:absolute before:top-9 before:bottom-12 before:left-[15px] before:w-px sm:before:left-[18px]",
                "before:bg-[linear-gradient(to_bottom,transparent,var(--primary)_10%,var(--primary)_90%,transparent)]",
                "before:opacity-50"
              )}
            >
              {timeline.map((entry, index) => {
                const text = t.timeline.entries[entry.id];
                const prev = timeline[index - 1];
                const showYear = !prev || prev.year !== entry.year;
                const Icon = ENTRY_ICONS[entry.id] ?? Sparkles;
                const isOpen = openId === entry.id;

                const body = (
                  <div className="relative pt-6 pl-10 sm:pl-12">
                    {/* Marker, anchored on the rail (relative to this body). */}
                    <div className="absolute top-6 left-[15px] flex -translate-x-1/2 items-center justify-center sm:left-[18px]">
                      {entry.photo ? (
                        <PhotoNode
                          src={entry.photo}
                          alt={text.title}
                          label={`${t.controls.expandPhoto}: ${text.title}`}
                          isOpen={isOpen}
                          onToggle={() => {
                            const willOpen = openId !== entry.id;
                            if (willOpen) play("zoom");
                            setOpenId(willOpen ? entry.id : null);
                          }}
                          onClose={close}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="grid size-7 place-items-center rounded-full border border-primary/40 bg-card text-primary/80 shadow-elevated"
                        >
                          <Icon className="size-3" strokeWidth={2} />
                        </span>
                      )}
                    </div>

                    <div>
                      {showYear ? (
                        <p className="font-[family-name:var(--font-heading)] text-xs leading-none font-semibold tracking-tight text-primary">
                          {entry.year}
                        </p>
                      ) : (
                        <p
                          aria-hidden="true"
                          className="text-xs leading-none text-muted-foreground/50"
                        >
                          ·
                        </p>
                      )}
                      <h3 className="mt-1.5 font-[family-name:var(--font-heading)] text-base leading-snug font-semibold tracking-tight text-foreground sm:text-lg">
                        {text.title}
                      </h3>
                      <p className="text-caption mt-1 max-w-md">{text.desc}</p>
                    </div>
                  </div>
                );

                return (
                  <li key={entry.id} className="relative">
                    {entry.compact ? (
                      body
                    ) : (
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-[800ms] ease-[var(--ease-out)]",
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        )}
                      >
                        <div
                          className={cn(
                            "overflow-hidden transition-opacity duration-[800ms] ease-[var(--ease-out)]",
                            expanded ? "opacity-100" : "opacity-0"
                          )}
                        >
                          {body}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Expand / collapse control. */}
          <button
            type="button"
            onClick={toggleExpanded}
            onMouseEnter={() => play("hover")}
            aria-expanded={expanded}
            className="mt-7 ml-10 inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:text-foreground sm:ml-12"
          >
            {expanded ? t.timeline.collapse : t.timeline.expand}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300 ease-[var(--ease-spring)]",
                expanded && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

interface PhotoNodeProps {
  src: string;
  alt: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

/**
 * A small square photo thumbnail that grows over 500ms when clicked. The
 * enlarged image is rendered in a PORTAL on <body> (fixed, z-[100]) so it sits
 * above every entry's text and the page chrome — no stacking-context games. It
 * grows from the thumbnail's on-screen position, clamped to stay on screen.
 */
function PhotoNode({ src, alt, label, isOpen, onToggle, onClose }: PhotoNodeProps) {
  const thumbRef = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  function handleThumbClick() {
    if (!isOpen && thumbRef.current) {
      setRect(thumbRef.current.getBoundingClientRect());
      setMounted(true);
    }
    onToggle();
  }

  useEffect(() => {
    if (mounted && isOpen) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true))
      );
      return () => cancelAnimationFrame(id);
    }
    if (!isOpen && mounted) {
      const raf = requestAnimationFrame(() => setShown(false));
      const timer = setTimeout(() => setMounted(false), 520);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [isOpen, mounted]);

  const overlay =
    mounted && typeof document !== "undefined" && rect
      ? createPortal(
          <div className="fixed inset-0 z-[100]">
            <button
              type="button"
              aria-label="Close"
              tabIndex={-1}
              onClick={onClose}
              className={cn(
                "absolute inset-0 cursor-default bg-background/60 backdrop-blur-[1px]",
                "transition-opacity duration-500 ease-[var(--ease-out)]",
                shown ? "opacity-100" : "opacity-0"
              )}
            />
            <button
              type="button"
              aria-label={label}
              onClick={onToggle}
              className={cn(
                "absolute block overflow-hidden rounded-xl shadow-portrait",
                "ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
                "transition-[transform,opacity] duration-500 ease-[var(--ease-spring)]",
                shown ? "opacity-100" : "opacity-0"
              )}
              style={zoomGeometry(rect, shown)}
            >
              <Image
                src={src}
                alt={alt}
                width={480}
                height={480}
                sizes="(min-width: 640px) 280px, 70vw"
                className="size-full object-cover"
              />
            </button>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={thumbRef}
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onClick={handleThumbClick}
        className={cn(
          "group/photo block size-8 overflow-hidden rounded-lg",
          "shadow-elevated ring-2 ring-primary/55 ring-offset-2 ring-offset-background",
          "transition-[transform,box-shadow] duration-200 ease-[var(--ease-spring)]",
          "hover:-translate-y-px hover:ring-primary"
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={480}
          height={480}
          loading="lazy"
          sizes="32px"
          className="size-full object-cover transition-transform duration-300 ease-[var(--ease-spring)] group-hover/photo:scale-105"
        />
      </button>
      {overlay}
    </>
  );
}

/** Position + scale for the zoom, growing from the thumbnail rect, on-screen. */
function zoomGeometry(rect: DOMRect, shown: boolean): CSSProperties {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const size = Math.min(280, Math.max(208, Math.round(vw * 0.7)));
  const margin = 16;
  const left = Math.max(margin, Math.min(rect.left, vw - size - margin));
  const top = Math.max(margin, Math.min(rect.top, vh - size - margin));
  const scale = shown ? 1 : rect.width / size;
  return {
    left,
    top,
    width: size,
    height: size,
    transformOrigin: "top left",
    transform: `scale(${scale})`,
  };
}
