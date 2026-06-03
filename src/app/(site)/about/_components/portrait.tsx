import { siteConfig } from "@/lib/site-config";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Generative portrait. No stock photo: an organic gradient "blob" carrying the
 * monogram, with an accent-tinted shadow and a hover morph. Drops in a real
 * photo later by swapping the inner layer for next/image. The aspect-square box
 * reserves layout space, so there is no CLS.
 */
export function Portrait() {
  const mark = initials(siteConfig.name);

  return (
    <div
      role="img"
      aria-label={`Portrait of ${siteConfig.name}`}
      className="group relative w-full max-w-[clamp(15rem,42vw,20rem)]"
    >
      {/* Offset frame behind for editorial depth. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[42%_58%_43%_57%/57%_43%_57%_43%] border border-primary/25 transition-transform duration-[600ms] ease-[var(--ease-spring)] group-hover:translate-x-4 group-hover:translate-y-4"
      />

      {/* Main blob. */}
      <div className="shadow-portrait relative aspect-square overflow-hidden rounded-[42%_58%_43%_57%/57%_43%_57%_43%] bg-[conic-gradient(from_150deg_at_32%_28%,var(--dracula-purple),var(--dracula-pink)_28%,var(--dracula-cyan)_58%,var(--dracula-purple))] ring-1 ring-black/5 transition-[border-radius,transform] duration-[600ms] ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:rounded-[58%_42%_57%_43%/43%_57%_43%_57%]">
        {/* Soft inner light. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_28%_18%,rgba(255,255,255,0.35),transparent_55%)]"
        />
        {/* Monogram. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-heading)] text-[clamp(4rem,16vw,7rem)] font-semibold text-white/90 mix-blend-soft-light transition-transform duration-[600ms] ease-[var(--ease-spring)] group-hover:scale-105"
        >
          {mark}
        </span>
      </div>
    </div>
  );
}
