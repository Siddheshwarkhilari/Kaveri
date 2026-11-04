import { m, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.15 + i * 0.12, duration: 1.4, ease: ease.inOut },
      opacity: { delay: 0.15 + i * 0.12, duration: 0.2 },
    },
  }),
};

// Dash-dot centre lines keep their own dash pattern, so they fade in rather than draw.
const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({ opacity: 1, transition: { delay: 0.15 + i * 0.12, duration: 1.2, ease: ease.out } }),
};

const BOLT_HOLES = Array.from({ length: 8 }, (_, k) => {
  const angle = ((22.5 + k * 45) * Math.PI) / 180;
  return { cx: 200 + 150 * Math.cos(angle), cy: 200 + 150 * Math.sin(angle) };
});

const centerLine = { strokeDasharray: "18 5 3 5" };

interface FlangeBlueprintProps {
  className?: string;
  /** Skip the line-drawing entrance (reduced motion). */
  static?: boolean;
}

/**
 * Line drawing of a keyed flange — outer rim, shoulder, keyed bore, bolt circle and
 * centre lines — used as a quiet engineering backdrop. Colour comes from `currentColor`.
 */
export default function FlangeBlueprint({ className, static: isStatic = false }: FlangeBlueprintProps) {
  const animation = isStatic
    ? { initial: false as const }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 } };

  return (
    <m.svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.9}
      aria-hidden="true"
      className={className}
      {...animation}
    >
      {/* Centre lines */}
      <m.path d="M0 200H400" style={centerLine} variants={fade} custom={0} />
      <m.path d="M200 0V400" style={centerLine} variants={fade} custom={0} />

      {/* Rim, shoulder and bolt circle */}
      <m.circle cx="200" cy="200" r="170" variants={draw} custom={1} />
      <m.circle cx="200" cy="200" r="128" variants={draw} custom={2} />
      <m.circle cx="200" cy="200" r="150" style={centerLine} variants={fade} custom={3} />

      {/* Keyed bore */}
      <m.path d="M190 277.4A78 78 0 1 1 210 277.4V290H190Z" variants={draw} custom={4} />

      {BOLT_HOLES.map((hole, k) => (
        <m.circle key={k} cx={hole.cx} cy={hole.cy} r="9" variants={draw} custom={5 + k * 0.25} />
      ))}

      {/* Overall-diameter dimension */}
      <m.path d="M30 196V14M370 196V14M30 24H370M30 24l8-3.5M30 24l8 3.5M370 24l-8-3.5M370 24l-8 3.5" variants={draw} custom={6} />
    </m.svg>
  );
}
