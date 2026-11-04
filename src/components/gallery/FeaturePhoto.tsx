import { m, useReducedMotion, type Variants } from "motion/react";
import { Maximize2 } from "lucide-react";
import { categoryOf, type GalleryPhoto } from "@/data/gallery";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import GalleryImage from "./GalleryImage";

const featureVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// The photo opens sideways towards the caption panel, whose lines then follow in.
const photoFrameVariants: Variants = {
  hidden: (flip: boolean) => ({ clipPath: flip ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }),
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: ease.out } },
};

const photoVariants: Variants = {
  hidden: { scale: 1.15 },
  visible: { scale: 1, transition: { duration: 1.6, ease: ease.out } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: ease.out } },
};

interface FeaturePhotoProps {
  photo: GalleryPhoto;
  /** Puts the photo on the right on wide screens, alternating between collections. */
  flip: boolean;
  priority?: boolean;
  onOpen: (id: string) => void;
}

/** The photo that opens a collection: a large frame beside a dark caption panel. */
export default function FeaturePhoto({ photo, flip, priority, onOpen }: FeaturePhotoProps) {
  const reduceMotion = useReducedMotion();
  const { label, icon: Icon } = categoryOf(photo.category);

  return (
    <m.li
      variants={featureVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="col-span-full"
    >
      <button
        type="button"
        onClick={() => onOpen(photo.id)}
        aria-haspopup="dialog"
        aria-label={`View image: ${photo.title}`}
        data-testid={`feature-gallery-${photo.id}`}
        data-gallery-photo={photo.id}
        className="group relative grid w-full overflow-hidden rounded-[28px] bg-ink-950 text-left shadow-[0_2px_4px_rgba(10,19,36,0.06),0_48px_90px_-48px_rgba(10,19,36,0.7)] ring-1 ring-ink-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 focus-visible:ring-offset-4 focus-visible:ring-offset-steel-50 lg:grid-cols-12"
      >
        <m.span
          custom={flip}
          variants={photoFrameVariants}
          className={cn("relative block aspect-[4/3] overflow-hidden sm:aspect-[3/2] lg:col-span-7 xl:col-span-8", flip && "lg:order-2")}
        >
          <m.span variants={photoVariants} className="absolute inset-0">
            <span className="absolute inset-0 transition-transform [transition-duration:1400ms] ease-precise group-hover:scale-[1.04] motion-reduce:transform-none">
              <GalleryImage photo={photo} sizes="(min-width: 1280px) 800px, (min-width: 1024px) 58vw, 100vw" priority={priority} />
            </span>
          </m.span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 hidden h-9 w-9 place-items-center rounded-full bg-ink-950/55 text-white ring-1 ring-white/20 backdrop-blur [@media(hover:none)]:grid"
          >
            <Maximize2 className="h-4 w-4" />
          </span>
        </m.span>

        <span className="relative isolate flex min-w-0 flex-col justify-between gap-6 p-6 text-white sm:gap-8 sm:p-8 lg:col-span-5 lg:p-9 xl:col-span-4 xl:p-10">
          <span aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-80" />
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -z-10 transition-opacity duration-700 group-hover:opacity-100",
              "bg-[radial-gradient(90%_60%_at_100%_0%,rgba(27,187,255,0.16),transparent_65%)] opacity-70",
            )}
          />

          <m.span variants={lineVariants} className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-swoosh-300 ring-1 ring-inset ring-white/10">
              <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
              {label}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">Featured</span>
          </m.span>

          <span className="block">
            <m.span
              variants={lineVariants}
              className="block break-words font-display text-[1.8rem] font-bold leading-[1.04] tracking-[-0.025em] sm:text-[2.4rem] lg:text-[2.15rem]"
            >
              {photo.title}
            </m.span>
            <m.span variants={lineVariants} className="mt-4 block text-[16px] leading-relaxed text-white/70 sm:text-[17px]" data-testid={`text-gallery-description-${photo.id}`}>
              {photo.description}
            </m.span>
          </span>

          <m.span variants={lineVariants} className="flex items-center gap-3 text-[14px] font-semibold text-white">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-kaveri-600 shadow-[0_12px_24px_-12px_rgba(18,81,192,0.9)] transition duration-500 ease-precise group-hover:scale-110 group-hover:bg-swoosh-400 group-hover:text-ink-950 motion-reduce:group-hover:scale-100">
              <Maximize2 aria-hidden="true" className="h-[18px] w-[18px]" />
            </span>
            <span className="relative">
              View full screen
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-swoosh-300 transition-transform duration-500 ease-precise group-hover:scale-x-100"
              />
            </span>
          </m.span>
        </span>
      </button>
    </m.li>
  );
}
