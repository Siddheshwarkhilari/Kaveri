import { useRef, type KeyboardEvent } from "react";
import { m, type Variants } from "motion/react";
import type { FeaturedProduct } from "@/data/featuredProducts";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const thumbReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.45 + i * 0.06, duration: 0.6, ease: ease.out } }),
};

interface ProductRailProps {
  products: FeaturedProduct[];
  active: number;
  autoplay: boolean;
  running: boolean;
  intervalMs: number;
  onSelect: (index: number) => void;
  onAutoplayEnd: () => void;
}

/**
 * Thumbnail pagination. The active thumb carries the autoplay timer as a progress bar;
 * the bar's own animation end advances the carousel, so pausing it pauses autoplay.
 */
export default function ProductRail({
  products,
  active,
  autoplay,
  running,
  intervalMs,
  onSelect,
  onAutoplayEnd,
}: ProductRailProps) {
  const count = products.length;
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const target = (active + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    onSelect(target);
    thumbRefs.current[target]?.focus();
  };

  return (
    <div role="group" aria-label="Choose a featured product" onKeyDown={onKeyDown} className="grid grid-cols-5 gap-2 sm:gap-3">
      {products.map((product, i) => {
        const current = i === active;
        return (
          <m.button
            key={product.id}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            custom={i}
            variants={thumbReveal}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show product ${i + 1} of ${count}: ${product.name}`}
            aria-current={current ? "true" : undefined}
            tabIndex={current ? 0 : -1}
            data-testid={`featured-indicator-${i}`}
            className="group relative rounded-xl bg-white p-1.5 text-left ring-1 ring-steel-200 transition-shadow duration-300 hover:ring-steel-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 sm:p-2"
          >
            {current && (
              <m.span
                layoutId="featured-rail-active"
                aria-hidden="true"
                className="absolute inset-0 rounded-xl shadow-[0_14px_28px_-16px_rgba(18,81,192,0.65)] ring-2 ring-kaveri-600"
                transition={{ duration: 0.5, ease: ease.out }}
              />
            )}
            <span className="relative block aspect-[3/2] overflow-hidden rounded-lg bg-steel-100">
              <img
                src={product.image.thumb}
                alt=""
                width={240}
                height={160}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={cn(
                  "h-full w-full object-cover transition duration-500 ease-precise group-hover:scale-105",
                  current ? "opacity-100" : "opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0",
                )}
              />
            </span>
            <span
              className={cn(
                "relative mt-2 hidden truncate px-0.5 text-[12.5px] font-semibold transition-colors sm:block",
                current ? "text-ink-950" : "text-steel-500 group-hover:text-ink-900",
              )}
            >
              {product.name}
            </span>
            <span aria-hidden="true" className="relative mx-0.5 mt-2 block h-[2px] overflow-hidden rounded-full bg-steel-200">
              {current &&
                (autoplay ? (
                  <span
                    key={active}
                    onAnimationEnd={onAutoplayEnd}
                    style={{ animationDuration: `${intervalMs}ms`, animationPlayState: running ? "running" : "paused" }}
                    className="block h-full origin-left animate-progress rounded-full bg-gradient-to-r from-kaveri-600 to-swoosh-400"
                  />
                ) : (
                  <span className="block h-full rounded-full bg-kaveri-600" />
                ))}
            </span>
          </m.button>
        );
      })}
    </div>
  );
}
