import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { photoSrcSet, type Photo } from "@/lib/media";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const revealFrom = {
  left: "inset(0% 100% 0% 0% round 18px)",
  right: "inset(0% 0% 0% 100% round 18px)",
  bottom: "inset(100% 0% 0% 0% round 18px)",
};

const cornerTones = { light: "border-ink-900/25", dark: "border-white/25" };

const cornerMarks = [
  "-left-3 -top-3 border-l border-t",
  "-right-3 -top-3 border-r border-t",
  "-bottom-3 -left-3 border-b border-l",
  "-bottom-3 -right-3 border-b border-r",
];

interface FramedPhotoProps {
  photo: Photo;
  sizes: string;
  /** Aspect ratio of the frame, e.g. "aspect-[3/2]". The photo covers it. */
  frameClassName: string;
  className?: string;
  caption?: string;
  reveal?: keyof typeof revealFrom;
  tone?: keyof typeof cornerTones;
  /** Image focal point when the frame crops it, e.g. "50% 40%". */
  focus?: string;
  eager?: boolean;
}

/**
 * A real company photograph mounted like a print: registration marks at the corners,
 * a wipe-in reveal, a gentle scroll parallax inside the frame and a slow zoom on hover.
 */
export default function FramedPhoto({
  photo,
  sizes,
  frameClassName,
  className,
  caption,
  reveal = "bottom",
  tone = "light",
  focus = "50% 50%",
  eager = false,
}: FramedPhotoProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    // The in-view trigger sits on the unclipped figure: a fully clipped element never
    // counts as intersecting, so it could not trigger its own reveal.
    <m.figure
      ref={ref}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={cn("group relative", className)}
    >
      {cornerMarks.map((position) => (
        <span key={position} aria-hidden="true" className={cn("absolute h-4 w-4", cornerTones[tone], position)} />
      ))}
      <m.div
        className={cn(
          "relative overflow-hidden rounded-[18px] bg-steel-100 shadow-[0_34px_60px_-34px_rgba(10,19,36,0.5),0_10px_20px_-12px_rgba(10,19,36,0.14)] ring-1 ring-ink-950/[0.06]",
          frameClassName,
        )}
        variants={{
          hidden: { clipPath: revealFrom[reveal] },
          visible: {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            transition: { duration: 1.2, ease: ease.out },
            // Drop the clip once revealed so the frame's shadow isn't cut off.
            transitionEnd: { clipPath: "none" },
          },
        }}
      >
        <div className="absolute inset-0 transition-transform [transition-duration:1400ms] ease-precise group-hover:scale-[1.04] motion-reduce:transform-none">
          <m.img
            src={photo.large}
            srcSet={photoSrcSet(photo)}
            sizes={sizes}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            style={{ y, scale: 1.12, objectPosition: focus }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        {caption && (
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-800 shadow-sm ring-1 ring-ink-950/[0.06] backdrop-blur sm:bottom-4 sm:left-4">
            {caption}
          </figcaption>
        )}
      </m.div>
    </m.figure>
  );
}
