import { isSingleEmoji } from "@/lib/schemas/visitor-tags";

export const STORAGE_EMOJI_KEY = "visitor_global_emoji_submitted";

/** Legacy flag was "1"; only valid single emojis are kept. */
export function sanitizeStoredEmoji(value: string | null): string | null {
  if (!value || value === "1" || !isSingleEmoji(value)) return null;
  return value;
}

export function readStoredEmoji(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_EMOJI_KEY);
    return sanitizeStoredEmoji(raw);
  } catch {
    return null;
  }
}

export function persistStoredEmoji(emoji: string): void {
  try {
    localStorage.setItem(STORAGE_EMOJI_KEY, emoji);
  } catch {
    // ignore
  }
}

export function clearInvalidStoredEmoji(): void {
  try {
    const raw = localStorage.getItem(STORAGE_EMOJI_KEY);
    if (raw !== null && sanitizeStoredEmoji(raw) === null) {
      localStorage.removeItem(STORAGE_EMOJI_KEY);
    }
  } catch {
    // ignore
  }
}
