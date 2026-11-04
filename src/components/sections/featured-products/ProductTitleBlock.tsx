import { Link } from "wouter";
import { m, type Variants } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import WordReveal from "@/components/motion/WordReveal";
import { buttonVariants } from "@/components/ui/button";
import { ControlButton } from "@/components/ui/control-button";
import type { FeaturedProduct } from "@/data/featuredProducts";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

const contentVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.25, ease: ease.in } },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
};

const wordVariants: Variants = {
  hidden: { y: "110%", transition: { duration: 0.2 } },
  visible: { y: "0%", transition: { duration: 0.7, ease: ease.out } },
};

interface ProductTitleBlockProps {
  products: FeaturedProduct[];
  active: number;
  autoplay: boolean;
  running: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoplay: () => void;
}

/**
 * The dark "title block" — the box in the corner of an engineering drawing that names
 * the part. Every product's copy shares one grid cell, so the block keeps the height of
 * the longest entry and nothing below it moves when the slide changes.
 */
export default function ProductTitleBlock({
  products,
  active,
  autoplay,
  running,
  onPrev,
  onNext,
  onToggleAutoplay,
}: ProductTitleBlockProps) {

  return (
    <div className="relative isolate overflow-hidden rounded-[22px] bg-ink-950 text-white shadow-[0_40px_80px_-40px_rgba(5,11,23,0.8)] ring-1 ring-white/10">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(27,187,255,0.12),transparent_60%)]"
      />
      <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

      <div className="relative p-6 pt-7 sm:p-8 sm:pt-9">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <ControlButton label="Previous product" onClick={onPrev} testId="button-prev-featured">
              <ChevronLeft />
            </ControlButton>
            <ControlButton
              label={autoplay ? "Pause product slideshow" : "Play product slideshow"}
              onClick={onToggleAutoplay}
              testId="button-toggle-featured"
            >
              {autoplay ? <Pause /> : <Play className="translate-x-px" />}
            </ControlButton>
            <ControlButton label="Next product" onClick={onNext} testId="button-next-featured">
              <ChevronRight />
            </ControlButton>
          </div>
        </div>

        <div className="mt-7 grid" aria-live={running ? "off" : "polite"}>
          {products.map((product, i) => {
            const current = i === active;
            return (
              <m.div
                key={product.id}
                aria-hidden={!current}
                initial={false}
                animate={current ? "visible" : "hidden"}
                variants={contentVariants}
                className={cn("[grid-area:1/1]", !current && "pointer-events-none")}
              >
                <m.p
                  variants={itemVariants}
                  className="inline-flex items-center rounded-full bg-swoosh-400/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-swoosh-300 ring-1 ring-inset ring-swoosh-400/20"
                >
                  {product.category}
                </m.p>
                <h3
                  className="mt-4 font-display text-[1.75rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.1rem]"
                  data-testid={current ? "text-featured-name" : undefined}
                >
                  <WordReveal text={product.name} variants={wordVariants} />
                </h3>
                {product.tagline && (
                  <m.p variants={itemVariants} className="mt-3 text-[15px] font-medium text-white/85">
                    {product.tagline}
                  </m.p>
                )}
                <m.p
                  variants={itemVariants}
                  className={cn("text-[15px] leading-relaxed text-white/60", product.tagline ? "mt-1.5" : "mt-3")}
                >
                  {product.description}
                </m.p>

                <ol className="mt-6 border-t border-white/10">
                  {product.highlights.map((highlight, k) => (
                    <m.li key={highlight} variants={itemVariants} className="flex items-center gap-3 border-b border-white/10 py-3">
                      <span className="font-mono text-[11px] text-swoosh-400/80">{pad(k + 1)}</span>
                      <span className="text-[15px] font-medium text-white/90">{highlight}</span>
                      <span aria-hidden="true" className="mx-1 h-px flex-1 border-t border-dotted border-white/15" />
                      <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-swoosh-400/70" />
                    </m.li>
                  ))}
                </ol>
              </m.div>
            );
          })}
        </div>

        <div className="mt-7">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group w-full sm:w-auto")}
            data-testid="button-view-all-products"
          >
            View full catalogue
            <ArrowRight className="transition-transform duration-300 ease-precise group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
