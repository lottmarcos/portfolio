import { z } from "zod";

const cityField = z
  .string()
  .trim()
  .min(1, "City is required.")
  .max(100, "City is too long.")
  .optional();

const emojiField = z
  .string()
  .min(1, "Emoji is required.")
  .max(16, "Invalid emoji.")
  .optional();

const previousEmojiField = z
  .string()
  .min(1, "Emoji is required.")
  .max(16, "Invalid emoji.")
  .optional();

/** Validate the POST body for /api/visitor-tags (city or emoji, not both). */
export const visitorMarkSchema = z
  .object({
    city: cityField,
    emoji: emojiField,
    previousEmoji: previousEmojiField,
  })
  .refine((data) => Boolean(data.city?.length || data.emoji?.length), {
    message: "Provide a city or an emoji.",
  })
  .refine((data) => !(data.city?.length && data.emoji?.length), {
    message: "City and emoji must be sent separately.",
  });

export type VisitorMarkInput = z.infer<typeof visitorMarkSchema>;

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
