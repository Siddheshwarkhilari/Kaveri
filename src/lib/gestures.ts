import type { PanInfo } from "motion/react";

/**
 * Reads a finished pan as a carousel swipe: 1 for next (swiped left), -1 for previous
 * (swiped right), 0 when it wasn't a clear horizontal swipe.
 */
export function swipeDirection(info: PanInfo, distance = 60): -1 | 0 | 1 {
  const { x, y } = info.offset;
  if (Math.abs(x) < distance || Math.abs(x) < Math.abs(y)) return 0;
  return x < 0 ? 1 : -1;
}
