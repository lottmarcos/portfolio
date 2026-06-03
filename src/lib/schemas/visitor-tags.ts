import { z } from "zod";

/** Validate the POST body for /api/visitor-tags. */
export const visitorTagSchema = z.object({
  city: z.string().trim().min(1, "City is required.").max(100, "City is too long."),
  emoji: z.string().min(1, "Emoji is required.").max(16, "Invalid emoji."),
});

export type VisitorTagInput = z.infer<typeof visitorTagSchema>;

/**
 * True when the string is exactly one user-perceived emoji grapheme.
 * Uses Intl.Segmenter for grapheme counting and Extended_Pictographic to
 * confirm it's actually an emoji (not a single letter or digit).
 */
export function isSingleEmoji(value: string): boolean {
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  const graphemes = [...segmenter.segment(value)];
  if (graphemes.length !== 1) return false;
  return /\p{Extended_Pictographic}/u.test(value);
}
