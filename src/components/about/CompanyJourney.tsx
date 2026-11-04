import { useCallback, useEffect, useRef, useState } from "react";
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import SectionHeading from "@/components/sections/SectionHeading";
import { about } from "@/data/about";
import { ease, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import BrochureCard from "./BrochureCard";

const milestoneReveal: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.out } },
};

/** A milestone counts as reached once its top passes this fraction of the viewport. */
const REACH_LINE = 0.6;

/**
 * "Establishment & growth": a vertical timeline that fills as the visitor scrolls,
 * lighting each milestone as it is reached, beside a sticky brochure card.
 */
export default function CompanyJourney() {
  const { label, title, milestones } = about.journey;
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [reached, setReached] = useState<boolean[]>(() => milestones.map(() => false));

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 70%", "end 60%"] });
  const railFill = useTransform(scrollYProgress, (value) => (reduceMotion ? 1 : value));

  const measure = useCallback(() => {
    const line = window.innerHeight * REACH_LINE;
    const next = itemRefs.current.map((item) => (item ? item.getBoundingClientRect().top < line : false));
    setReached((current) => (current.every((value, i) => value === next[i]) ? current : next));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", measure);
  useEffect(measure, [measure]);

  return (
    <section aria-labelledby="journey-title" className="relative overflow-hidden bg-steel-50" data-testid="section-journey">
      <div
        aria-hidden="true"
        className="bg-blueprint-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Heading and brochure stay in view while the timeline scrolls (on screens tall enough). */}
          <div className="flex flex-col gap-10 lg:col-span-5 lg:self-start lg:[@media(min-height:820px)]:sticky lg:[@media(min-height:820px)]:top-32">
            <m.div variants={revealStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <SectionHeading id="journey-title" label={label} title={title} size="lg" />
            </m.div>
            <BrochureCard className="hidden lg:block" />
          </div>

          <ol ref={timelineRef} className="relative lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
            <div aria-hidden="true" className="absolute bottom-6 left-[11px] top-5 w-px bg-steel-300">
              <m.div style={{ scaleY: railFill }} className="h-full w-full origin-top bg-gradient-to-b from-kaveri-600 to-swoosh-400" />
            </div>

            {milestones.map((milestone, i) => {
              const isReached = reduceMotion || reached[i];
              return (
                <li
                  key={milestone.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="relative pb-16 pl-12 last:pb-0 sm:pl-16"
                  data-reached={isReached || undefined}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-[11px] top-5 grid h-[18px] w-[18px] -translate-x-1/2 place-items-center rounded-full ring-2 transition-[background-color,box-shadow] duration-500",
                      isReached
                        ? "bg-kaveri-600 shadow-[0_0_0_7px_rgba(18,81,192,0.14)] ring-kaveri-600"
                        : "bg-white ring-steel-300",
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full transition-colors duration-500", isReached ? "bg-white" : "bg-steel-300")} />
                  </span>

                  <m.div variants={milestoneReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
                    <p
                      className={cn(
                        "font-display text-[3.25rem] font-bold leading-none tracking-[-0.045em] transition-colors duration-700 sm:text-[4.5rem]",
                        isReached ? "text-ink-950" : "text-transparent [-webkit-text-stroke:1px_#BAC4D2]",
                      )}
                    >
                      {milestone.when}
                    </p>

                    <article className="group relative mt-5 overflow-hidden rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(10,19,36,0.04),0_18px_40px_-28px_rgba(10,19,36,0.25)] ring-1 ring-steel-200 transition-[transform,box-shadow] duration-500 ease-precise hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(10,19,36,0.04),0_30px_56px_-30px_rgba(18,81,192,0.35)] hover:ring-kaveri-200 motion-reduce:hover:translate-y-0 sm:p-8">
                      <span
                        aria-hidden="true"
                        className="absolute left-6 right-6 top-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-kaveri-600 via-kaveri-400 to-swoosh-400 transition-transform duration-700 ease-precise group-hover:scale-x-100 sm:left-8 sm:right-8"
                      />
                      <p
                        className={cn(
                          "inline-flex rounded-[5px] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ring-1 ring-inset transition-colors duration-500",
                          isReached ? "bg-kaveri-50 text-kaveri-700 ring-kaveri-100" : "bg-steel-100 text-steel-500 ring-steel-200/70",
                        )}
                      >
                        {milestone.tag}
                      </p>
                      <h3 className="mt-4 font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950 sm:text-[1.5rem]">
                        {milestone.title}
                      </h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-steel-600 sm:text-base">{milestone.body}</p>
                    </article>
                  </m.div>
                </li>
              );
            })}
          </ol>

          <BrochureCard className="lg:hidden" />
        </div>
      </div>
    </section>
  );
}
