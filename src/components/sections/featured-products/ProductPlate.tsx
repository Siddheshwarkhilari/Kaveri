import type { PointerEvent } from "react";
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring, type PanInfo, type Variants } from "motion/react";
import type { FeaturedProduct } from "@/data/featuredProducts";
import { swipeDirection } from "@/lib/gestures";
import { ease } from "@/lib/motion";

export const PLATE_SIZES = "(min-width: 1280px) 640px, (min-width: 1024px) 56vw, 92vw";
export const plateSrcSet = (product: FeaturedProduct) => `${product.image.medium} 720w, ${product.image.large} 1264w`;

/** Incoming photos wipe in from the travel direction; outgoing ones ease back the other way. */
const imageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: `${direction * 6}%`,
    scale: 1.06,
    clipPath: direction > 0 ? "inset(0% 0% 0% 35%)" : "inset(0% 35% 0% 0%)",
  }),
  center: {
    opacity: 1,
    x: "0%",
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.95, ease: ease.out, opacity: { duration: 0.45, ease: ease.out } },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: `${direction * -5}%`,
    scale: 0.97,
    transition: { duration: 0.55, ease: ease.inOut },
  }),
};

const cornerMarks = [
  "-left-3 -top-3 border-l border-t",
  "-right-3 -top-3 border-r border-t",
  "-bottom-3 -left-3 border-b border-l",
  "-bottom-3 -right-3 border-b border-r",
];

interface ProductPlateProps {
  product: FeaturedProduct;
  direction: number;
  onSwipe: (direction: -1 | 1) => void;
}

/**
 * The product photo, mounted like a print on the drawing board: uncropped 3:2 plate,
 * registration marks at the corners, pointer parallax and a slow zoom on hover.
 */
export default function ProductPlate({ product, direction, onSwipe }: ProductPlateProps) {
  const reduceMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 140, damping: 22, mass: 0.6 });
  const y = useSpring(offsetY, { stiffness: 140, damping: 22, mass: 0.6 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set(((event.clientX - rect.left) / rect.width - 0.5) * -14);
    offsetY.set(((event.clientY - rect.top) / rect.height - 0.5) * -10);
  };

  const onPanEnd = (_event: globalThis.PointerEvent, info: PanInfo) => {
    const swipe = swipeDirection(info);
    if (swipe !== 0) onSwipe(swipe);
  };

  return (
    <m.div
      onPanEnd={onPanEnd}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        offsetX.set(0);
        offsetY.set(0);
      }}
      style={{ x, y }}
      className="group relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      {cornerMarks.map((position) => (
        <span key={position} aria-hidden="true" className={`absolute h-4 w-4 border-ink-900/25 ${position}`} />
      ))}

      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-steel-100 shadow-[0_34px_60px_-32px_rgba(10,19,36,0.5),0_10px_20px_-12px_rgba(10,19,36,0.14)] ring-1 ring-ink-950/[0.06]">
        <div className="absolute inset-0 transition-transform [transition-duration:1200ms] ease-precise group-hover:scale-[1.045] motion-reduce:transform-none">
          <AnimatePresence initial={false} custom={direction}>
            <m.img
              key={product.id}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              src={product.image.large}
              srcSet={plateSrcSet(product)}
              sizes={PLATE_SIZES}
              width={product.image.width}
              height={product.image.height}
              alt={product.name}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
              data-testid="featured-plate-image"
            />
          </AnimatePresence>
        </div>

        {/* A soft light sweep crosses the print on hover. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.45)_50%,transparent_65%)] opacity-70 transition-transform [transition-duration:1400ms] ease-precise group-hover:translate-x-full motion-reduce:hidden"
        />
      </div>
    </m.div>
  );
}
