import { FOOTER_END_SNAP_RADIUS_PX } from "@/lib/about-scroll-snap-config";

export { FOOTER_END_SNAP_RADIUS_PX };

export const FOOTER_END_SNAP_ALIGNED_THRESHOLD_PX = 2;
export const FOOTER_END_SNAP_DURATION_MS = 800;
export const FOOTER_END_SNAP_SCROLL_DEBOUNCE_MS = 120;

export function getRemainingScrollGap(
  scrollY: number,
  scrollHeight: number,
  innerHeight: number
): number {
  return scrollHeight - scrollY - innerHeight;
}

export function getMaxScrollTop(scrollHeight: number, innerHeight: number): number {
  return Math.max(0, scrollHeight - innerHeight);
}

export function isInFooterSnapZone(
  gap: number,
  radius = FOOTER_END_SNAP_RADIUS_PX
): boolean {
  return gap <= radius;
}

export function shouldSnapToPageEnd(
  gap: number,
  radius = FOOTER_END_SNAP_RADIUS_PX,
  alignedThreshold = FOOTER_END_SNAP_ALIGNED_THRESHOLD_PX
): boolean {
  return gap > alignedThreshold && gap <= radius;
}

export function snapScrollEase(progress: number): number {
  const t = Math.min(Math.max(progress, 0), 1);
  return 1 - (1 - t) ** 3;
}

export function getSnapScrollOffset(
  startScrollTop: number,
  targetScrollTop: number,
  progress: number
): number {
  const eased = snapScrollEase(progress);
  return startScrollTop + (targetScrollTop - startScrollTop) * eased;
}
