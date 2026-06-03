export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

/** A city's visitor tag: the last emoji left there and how many have checked in. */
export interface CityTag {
  city: string;
  emoji: string;
  count: number;
}
