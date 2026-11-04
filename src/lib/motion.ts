import type { Variants } from "motion/react";

/**
 * Shared motion conventions. Keep durations and easings here so every section
 * moves with the same rhythm.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  in: [0.55, 0, 0.75, 0.06] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  micro: 0.15,
  ui: 0.3,
  reveal: 0.7,
  media: 1.1,
};

export const stagger = 0.06;

// Scroll-reveal building blocks. A parent with `revealStagger` (initial "hidden",
// whileInView "visible") cascades these through its children in DOM order.
export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: ease.out } },
};

export const riseWord: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: ease.out } },
};
