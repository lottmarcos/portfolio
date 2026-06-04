/**
 * Career timeline. Entries are language-neutral here (id, year, optional photo);
 * the localized title/description live in the i18n dictionary under
 * `timeline.entries[id]`. Photos are optional and shown as small thumbnails
 * that zoom on click.
 */
export interface TimelineEntry {
  id: string;
  year: string;
  photo?: string;
  /** Shown in the compact (collapsed) view — a 3-beat summary. */
  compact?: boolean;
}

export const timeline: TimelineEntry[] = [
  { id: "ufmg", year: "2021", compact: true },
  { id: "formulaTesla", year: "2022" },
  { id: "dito", year: "2023" },
  { id: "tdc2023", year: "2023", photo: "/tdc2023.jpg" },
  { id: "avenue", year: "2024", compact: true },
  { id: "braziljs", year: "2024", photo: "/braziljs2024.jpg" },
  { id: "tdcBts", year: "2024", photo: "/tdc2024.jpg" },
  { id: "graduation", year: "2025", photo: "/graduation2025.jpg" },
  { id: "building", year: "2026", compact: true },
];
