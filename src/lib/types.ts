export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

/** A city's visitor tag: visit count only (decoupled from global emojis). */
export interface CityTag {
  city: string;
  count: number;
}

/** A globally submitted emoji (no city attached). */
export interface EmojiTag {
  emoji: string;
  count: number;
}

export interface VisitorTagsSnapshot {
  topCities: CityTag[];
  topEmojis: EmojiTag[];
}
