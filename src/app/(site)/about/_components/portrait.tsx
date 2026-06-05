import Image from "next/image";

/**
 * Hero portrait. Frames the real photo (`/main.jpg`, 900×1200) inside the same
 * organic squircle/blob mask used elsewhere, with an accent-tinted shadow, an
 * offset frame behind for editorial depth, and a faint logo signature
 * tying the photo to the wordmark. CSS-only hover (spring morph + lift); the
 * aspect box reserves layout space so there is no CLS.
 */
export function Portrait({ alt }: { alt: string }) {
  return (
    <div className="group relative w-full max-w-[clamp(15rem,42vw,20rem)]">
      {/* Faint logo signature peeking from behind, lower-left. Low ornament —
          reads as a watermark tying the photo to the wordmark. */}
      <Image
        src="/logo.svg"
        alt="lott logo"
        aria-hidden
        unoptimized
        width={450}
        height={450}
        className="pointer-events-none absolute -bottom-23 -left-15 -z-10 h-auto w-[clamp(12.75rem,25.5vw,12rem)] select-none opacity-45 transition-transform duration-[600ms] ease-[var(--ease-spring)] group-hover:-translate-x-1 group-hover:translate-y-1 dark:opacity-55"
      />

      {/* Offset frame behind for editorial depth — accent border, no grey. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[42%_58%_43%_57%/57%_43%_57%_43%] border border-primary/25 transition-transform duration-[600ms] ease-[var(--ease-spring)] group-hover:translate-x-4 group-hover:translate-y-4"
      />

      {/* Accent gradient edge wrapper — a thin tinted ring framing the photo. */}
      <div className="shadow-portrait relative aspect-[4/5] rounded-[42%_58%_43%_57%/57%_43%_57%_43%] bg-[linear-gradient(150deg,var(--dracula-purple),var(--dracula-pink)_45%,var(--dracula-cyan))] p-[3px] transition-[border-radius,transform] duration-[600ms] ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:rounded-[58%_42%_57%_43%/43%_57%_43%_57%]">
        {/* Photo, masked to the blob. */}
        <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-card ring-1 ring-black/5">
          <Image
            src="/main.jpg"
            alt={alt}
            width={900}
            height={1200}
            priority
            sizes="(min-width: 768px) 20rem, 42vw"
            className="h-full w-full object-cover object-[50%_18%] transition-transform duration-[600ms] ease-[var(--ease-spring)] group-hover:scale-[1.04]"
          />
          {/* Soft top-leading light to seat the photo into the frame. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(120%_90%_at_28%_12%,rgba(255,255,255,0.18),transparent_55%)] mix-blend-soft-light"
          />
        </div>
      </div>
    </div>
  );
}
