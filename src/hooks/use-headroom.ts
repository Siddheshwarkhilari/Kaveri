import { useEffect, useState } from "react";

interface HeadroomOptions {
  /** Distance from the top (px) within which the header always shows. */
  offset?: number;
  /** Minimum scroll distance (px) before the direction counts, so tiny jitters are ignored. */
  tolerance?: number;
}

/**
 * "Headroom" header behaviour: visible at the top of the page, hidden as soon as the
 * visitor scrolls down, and revealed again as soon as they scroll back up.
 */
export function useHeadroom({ offset = 16, tolerance = 6 }: HeadroomOptions = {}): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = Math.max(window.scrollY, 0);

    // Browsers already fire scroll events at most once per frame, and React skips
    // re-rendering when the value is unchanged, so no extra throttling is needed.
    const onScroll = () => {
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY;
      if (y <= offset) {
        setHidden(false);
        lastY = y;
      } else if (Math.abs(delta) >= tolerance) {
        setHidden(delta > 0);
        lastY = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, tolerance]);

  return hidden;
}
