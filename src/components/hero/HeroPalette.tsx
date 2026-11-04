import { useRef, type KeyboardEvent, type MutableRefObject, type RefObject } from "react";
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

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: ease.out } },
};

interface HeroPaletteProps {
  slides: HeroSlide[];
  active: number;
  playing: boolean;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  progressRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
  timeRef: RefObject<HTMLSpanElement>;
}

/**
 * The slim control deck under the hero video: a slide timeline along the seam,
 * then the active slide's copy and call to action in as few lines as the width allows.
 */
export default function HeroPalette({
  slides,
  active,
  playing,
  onSelect,
  onPrev,
  onNext,
  onTogglePlay,
  progressRefs,
  timeRef,
}: HeroPaletteProps) {
  const slide = slides[active];
  const count = slides.length;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const playLabel = playing ? "Pause slideshow" : "Play slideshow";

  const onTabsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const target = (active + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    onSelect(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div className="relative isolate border-t border-white/10">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_160%_at_0%_0%,rgba(27,187,255,0.09),transparent_60%)]"
      />
      <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

      <div className="px-5 [container-type:inline-size] lg:px-6">
        {count > 1 && (
          <div className="flex items-center gap-3 pt-3 sm:pt-4">
            <div
              role="group"
              aria-label="Choose slide"
              onKeyDown={onTabsKeyDown}
              className="grid flex-1 grid-cols-3 gap-2 sm:gap-3"
            >
              {slides.map((s, i) => {
                const current = i === active;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-label={`Slide ${i + 1} of ${count}: ${s.label}`}
                    aria-current={current ? "true" : undefined}
                    tabIndex={current ? 0 : -1}
                    data-testid={`indicator-${i}`}
                    className={cn(
                      "group min-w-0 rounded-lg py-2.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 sm:rounded-xl sm:px-3.5 sm:pb-2.5 sm:pt-2 sm:ring-1 sm:ring-inset",
                      current
                        ? "sm:bg-white/[0.07] sm:ring-white/15"
                        : "sm:ring-white/[0.07] sm:hover:bg-white/[0.04] sm:hover:ring-white/15",
                    )}
                  >
                    <span
                      className={cn(
                        "hidden truncate text-[13px] font-medium transition-colors sm:block",
                        current ? "text-white" : "text-white/50 group-hover:text-white/80",
                      )}
                    >
                      {s.label}
                    </span>
                    <span aria-hidden="true" className="block h-[3px] overflow-hidden rounded-full bg-white/15 sm:mt-2 sm:bg-white/10">
                      <span
                        ref={(el) => {
                          progressRefs.current[i] = el;
                        }}
                        className="block h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-swoosh-500 to-swoosh-300"
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <span
              ref={timeRef}
              aria-hidden="true"
              className="hidden w-[6.5rem] shrink-0 text-center font-mono text-[11px] tabular-nums tracking-[0.12em] text-white/45 xl:block"
            >
              00:00 / 00:00
            </span>

            <div className="flex shrink-0 items-center gap-2">
              <ControlButton label="Previous slide" onClick={onPrev} testId="button-prev-slide" className="hidden sm:grid">
                <ChevronLeft />
              </ControlButton>
              <ControlButton label={playLabel} onClick={onTogglePlay} testId="button-toggle-playback">
                {playing ? <Pause /> : <Play className="translate-x-px" />}
              </ControlButton>
              <ControlButton label="Next slide" onClick={onNext} testId="button-next-slide" className="hidden sm:grid">
                <ChevronRight />
              </ControlButton>
            </div>
          </div>
        )}

        <div aria-live={playing ? "off" : "polite"} aria-atomic="true" className="pb-5 pt-3 sm:pt-4 lg:pb-6">
          <AnimatePresence mode="wait">
            <m.div
              key={slide.id}
              variants={copyVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
            >
              {/* On wide frames the title and description share one line, split by a hairline. */}
              <div className="flex min-w-0 flex-col gap-2 [@container(min-width:1240px)]:flex-row [@container(min-width:1240px)]:items-center [@container(min-width:1240px)]:gap-10">
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
              </div>

              <m.div variants={lineVariants} className="lg:shrink-0">
                <Link
                  href={slide.cta.href}
                  className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group")}
                  data-testid={`button-slide-${active}`}
                >
                  {slide.cta.label}
                  <ArrowRight className="transition-transform duration-300 ease-precise group-hover:translate-x-1" />
                </Link>
              </m.div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
