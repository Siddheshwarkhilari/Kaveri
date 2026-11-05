import { Link } from "wouter";
import { AnimatePresence, m, type Variants } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/data/heroSlides";
import WordReveal from "@/components/motion/WordReveal";
import { buttonVariants } from "@/components/ui/button";
import { ControlButton } from "@/components/ui/control-button";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const copyVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: ease.in } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
};

const actionVariants: Variants = { ...lineVariants, exit: copyVariants.exit };

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: ease.out } },
};

// Roomier on touch screens, where these buttons are the main way to change slide.
const controlClass = "h-11 w-11 sm:h-10 sm:w-10";

interface HeroPaletteProps {
  slides: HeroSlide[];
  active: number;
  playing: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

/**
 * The slim deck under the hero video: the active slide's copy in as few lines as the width
 * allows, then its call to action beside the slideshow controls. The controls stay mounted
 * across slides, so pressing one never loses keyboard focus.
 */
export default function HeroPalette({ slides, active, playing, onPrev, onNext, onTogglePlay }: HeroPaletteProps) {
  const slide = slides[active];
  const count = slides.length;

  return (
    <div className="relative isolate border-t border-white/10">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_160%_at_0%_0%,rgba(27,187,255,0.09),transparent_60%)]"
      />
      <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

      <div className="flex flex-col gap-4 px-5 pb-5 pt-6 [container-type:inline-size] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-6 lg:pb-6">
        <div aria-live={playing ? "off" : "polite"} aria-atomic="true" className="min-w-0 lg:flex-1">
          <span className="sr-only">
            Slide {active + 1} of {count}.
          </span>
          <AnimatePresence mode="wait">
            <m.div
              key={slide.id}
              variants={copyVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex min-w-0 flex-col gap-2 [@container(min-width:1240px)]:flex-row [@container(min-width:1240px)]:items-center [@container(min-width:1240px)]:gap-10"
            >
              {/* On wide frames the title and description share one line, split by a hairline. */}
              <div className="min-w-0 shrink-0">
                <m.p
                  variants={lineVariants}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-swoosh-300/80"
                >
                  {slide.eyebrow}
                </m.p>
                <h1
                  className="mt-1.5 font-display text-[1.625rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2rem] xl:text-[2.25rem]"
                  data-testid={`slide-title-${active}`}
                >
                  <WordReveal text={slide.title} variants={wordVariants} />
                </h1>
              </div>

              <m.p
                variants={lineVariants}
                className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-[15px] [@container(min-width:1240px)]:max-w-md [@container(min-width:1240px)]:border-l [@container(min-width:1240px)]:border-white/10 [@container(min-width:1240px)]:pl-10"
                data-testid={`slide-description-${active}`}
              >
                {slide.description}
              </m.p>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:shrink-0">
          {/* A set width keeps the controls still while the label changes from slide to slide. */}
          <div className="min-h-12 flex-1 sm:w-[12.5rem] sm:flex-none">
            <AnimatePresence mode="wait">
              <m.div key={slide.id} variants={actionVariants} initial="hidden" animate="visible" exit="exit">
                <Link
                  href={slide.cta.href}
                  className={cn(
                    buttonVariants({ variant: "brand", size: "xl" }),
                    "group w-full max-[399px]:px-3 max-[399px]:[&_svg]:hidden",
                  )}
                  data-testid={`button-slide-${active}`}
                >
                  {slide.cta.label}
                  <ArrowRight className="transition-transform duration-300 ease-precise group-hover:translate-x-1" />
                </Link>
              </m.div>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <div role="group" aria-label="Slideshow controls" className="flex shrink-0 items-center gap-1 sm:gap-2">
              <ControlButton
                label={`Previous slide: ${slides[(active - 1 + count) % count].label}`}
                onClick={onPrev}
                testId="button-prev-slide"
                className={controlClass}
              >
                <ChevronLeft />
              </ControlButton>
              <ControlButton
                label={playing ? "Pause slideshow" : "Play slideshow"}
                onClick={onTogglePlay}
                testId="button-toggle-playback"
                className={controlClass}
              >
                {playing ? <Pause /> : <Play className="translate-x-px" />}
              </ControlButton>
              <ControlButton
                label={`Next slide: ${slides[(active + 1) % count].label}`}
                onClick={onNext}
                testId="button-next-slide"
                className={controlClass}
              >
                <ChevronRight />
              </ControlButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
