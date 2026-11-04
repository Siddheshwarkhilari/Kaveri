import { m, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import GalleryImage from "./GalleryImage";

const tileVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({ transition: { delayChildren: delay, staggerChildren: 0.14 } }),
};

// The frame opens upward like a shutter while the photo settles from a slight zoom.
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0% round 20px)" },
  visible: { clipPath: "inset(0% 0% 0% 0% round 20px)", transition: { duration: 1.05, ease: ease.out } },
};

const photoVariants: Variants = {
  hidden: { scale: 1.18 },
  visible: { scale: 1, transition: { duration: 1.5, ease: ease.out } },
};

const captionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

const cornerMarks = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

interface GalleryTileProps {
  photo: GalleryPhoto;
  /** Grid placement for this slot. */
  className?: string;
  /** Aspect ratios of the frame at each breakpoint. */
  frameClassName: string;
  sizes: string;
  /** Seconds to wait before revealing, so photos sharing a row arrive one after another. */
  delay: number;
  onOpen: (id: string) => void;
}

/**
 * A photo in the editorial grid with its caption set beneath it. Hovering lifts the frame,
 * eases the photo in and reveals a "View image" cue; the whole tile opens the viewer.
 */
export default function GalleryTile({ photo, className, frameClassName, sizes, delay, onOpen }: GalleryTileProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.li
      custom={delay}
      variants={tileVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      <button
        type="button"
        onClick={() => onOpen(photo.id)}
        aria-haspopup="dialog"
        aria-label={`View image: ${photo.title}`}
        data-testid={`tile-gallery-${photo.id}`}
        data-gallery-photo={photo.id}
        className="group block w-full rounded-[22px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 focus-visible:ring-offset-4 focus-visible:ring-offset-steel-50"
      >
        <span className="block transition-transform duration-500 ease-precise group-hover:-translate-y-1.5 motion-reduce:group-hover:translate-y-0">
          <m.span
            variants={frameVariants}
            className={cn(
              "relative block overflow-hidden rounded-[20px] bg-steel-200 shadow-[0_1px_2px_rgba(10,19,36,0.06),0_22px_44px_-30px_rgba(10,19,36,0.5)] ring-1 ring-ink-950/[0.06] transition-shadow duration-500 group-hover:shadow-[0_2px_4px_rgba(10,19,36,0.06),0_36px_64px_-32px_rgba(18,81,192,0.55)]",
              frameClassName,
            )}
          >
            <m.span variants={photoVariants} className="absolute inset-0">
              <span className="absolute inset-0 transition-transform [transition-duration:1100ms] ease-precise group-hover:scale-[1.05] motion-reduce:transform-none">
                <GalleryImage photo={photo} sizes={sizes} />
              </span>
            </m.span>

            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            {cornerMarks.map((position) => (
              <span
                key={position}
                aria-hidden="true"
                className={`absolute h-4 w-4 scale-125 border-white/80 opacity-0 transition duration-500 ease-precise group-hover:scale-100 group-hover:opacity-100 ${position}`}
              />
            ))}
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-900 opacity-0 shadow-lg backdrop-blur transition duration-500 ease-precise group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              <Maximize2 className="h-3.5 w-3.5 text-kaveri-600" />
              View image
            </span>
            {/* Touch screens have no hover, so they always get a small open cue. */}
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 hidden h-9 w-9 place-items-center rounded-full bg-ink-950/55 text-white ring-1 ring-white/20 backdrop-blur [@media(hover:none)]:grid"
            >
              <Maximize2 className="h-4 w-4" />
            </span>
          </m.span>
        </span>

        <m.span variants={captionVariants} className="mt-4 flex items-start justify-between gap-4 px-1">
          <span className="min-w-0">
            <span className="block font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-kaveri-700">
              {photo.title}
            </span>
            <span className="mt-1.5 block text-[14.5px] leading-relaxed text-steel-600" data-testid={`text-gallery-description-${photo.id}`}>
              {photo.description}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-steel-500 ring-1 ring-steel-200 transition duration-500 ease-precise group-hover:rotate-45 group-hover:bg-kaveri-600 group-hover:text-white group-hover:ring-kaveri-600 motion-reduce:group-hover:rotate-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </m.span>
      </button>
    </m.li>
  );
}
