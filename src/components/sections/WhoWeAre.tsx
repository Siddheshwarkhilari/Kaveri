import { useRef, useState } from "react";
import { Link } from "wouter";
import { m, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import FlangeBlueprint from "@/components/decor/FlangeBlueprint";
import PillarCard from "@/components/sections/PillarCard";
import SectionHeading from "@/components/sections/SectionHeading";
import { whoWeAre } from "@/data/whoWeAre";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const railVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { scaleX: { duration: 1.2, ease: ease.inOut }, opacity: { duration: 0.3 } },
  },
};

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (step) => ({ scale: 1, opacity: 1, transition: { delay: 0.25 + step * 0.22, duration: 0.45, ease: ease.out } }),
};

const dropVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: (step) => ({ scaleY: 1, transition: { delay: 0.35 + step * 0.22, duration: 0.55, ease: ease.out } }),
};

const cardTiming = (step: number) => ({ delay: 0.5 + step * 0.22, duration: 0.9, ease: ease.out });

/** Wide screens: each pillar arrives differently — a rise, a horizontal wipe, a settling scale. */
const desktopCardVariants: Variants[] = [
  {
    hidden: { opacity: 0, y: 56 },
    visible: (step) => ({ opacity: 1, y: 0, transition: cardTiming(step) }),
  },
  {
    hidden: { opacity: 0, x: -24, clipPath: "inset(0% 100% 0% 0% round 16px)" },
    visible: (step) => ({
      opacity: 1,
      x: 0,
      clipPath: "inset(0% 0% 0% 0% round 16px)",
      transition: cardTiming(step),
      // Drop the clip once revealed so hover shadows aren't cut off.
      transitionEnd: { clipPath: "none" },
    }),
  },
  {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (step) => ({ opacity: 1, scale: 1, transition: cardTiming(step) }),
  },
];

/** Stacked layouts reveal each card as it scrolls into view. */
const stackedCardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.8, ease: ease.out } },
};

// Wide screens hang the cards from the datum rail at stepped depths.
const stepOffset = ["lg:pt-10", "lg:pt-24", "lg:pt-[9.5rem]"];
const dropHeight = ["lg:h-10", "lg:h-24", "lg:h-[9.5rem]"];

/**
 * Homepage "Who we are": an editorial intro, then the three pillars hanging from a
 * datum rail like dimension leaders on a drawing, over graph paper and a flange outline.
 */
export default function WhoWeAre() {
  const { label, title, company, description, link, pillars } = whoWeAre;
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [hovered, setHovered] = useState<number | null>(null);

  // Scroll-linked drift for the flange drawing; nothing runs while the page is still.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const decorY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [90, -90]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-14, 10]);

  // Stacked layouts: the side rail fills as the visitor scrolls through the pillars.
  const { scrollYProgress: cardsProgress } = useScroll({ target: cardsRef, offset: ["start 80%", "end 60%"] });
  const railFill = useTransform(cardsProgress, (value) => (reduceMotion ? 1 : value));

  const desktopTrigger = isDesktop
    ? { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 } }
    : {};
  const columnTrigger = isDesktop
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.35 } };

  return (
    <section
      aria-labelledby="who-we-are-title"
      className="overflow-hidden bg-steel-50 bg-[linear-gradient(to_bottom,#ffffff,#F5F7FA_14rem)]"
      data-testid="section-who-we-are"
    >
      <div ref={sectionRef} className="relative pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-blueprint-light absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_25%,transparent_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(38%_45%_at_88%_18%,rgba(18,81,192,0.08),transparent_70%)]" />
          <m.div
            style={{ y: decorY, rotate: decorRotate }}
            className="absolute -right-40 top-6 h-[22rem] w-[22rem] sm:-right-28 sm:h-[28rem] sm:w-[28rem] lg:-right-28 lg:-top-8 lg:h-[40rem] lg:w-[40rem]"
          >
            {/* Hovering a pillar turns the flange a few degrees — the backdrop answers the card. */}
            <m.div
              className={cn(
                "h-full w-full transition-colors duration-700",
                hovered === null ? "text-ink-900/[0.08]" : "text-kaveri-700/[0.13]",
              )}
              animate={{ rotate: reduceMotion || hovered === null ? 0 : (hovered + 1) * 7 }}
              transition={{ duration: 1.2, ease: ease.out }}
            >
              <FlangeBlueprint static={reduceMotion} className="h-full w-full" />
            </m.div>
          </m.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <m.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
          >
            <SectionHeading id="who-we-are-title" label={label} title={title} className="lg:col-span-7" />

            <div className="lg:col-span-5 lg:pb-3">
              <m.p variants={fadeUp} className="text-lg leading-relaxed text-steel-600 lg:text-[1.2rem]">
                <span className="font-medium text-ink-900">{company}</span> {description}
              </m.p>
              <m.div variants={fadeUp} className="mt-6">
                <Link
                  href={link.href}
                  data-testid="link-who-we-are-about"
                  className="group inline-flex items-center gap-2 rounded-md text-sm font-semibold text-kaveri-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 focus-visible:ring-offset-4 focus-visible:ring-offset-steel-50"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-precise group-hover:scale-x-100" />
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-precise group-hover:translate-x-1" />
                </Link>
              </m.div>
            </div>
          </m.div>

          <m.div ref={cardsRef} {...desktopTrigger} className="relative mt-16 sm:mt-20 lg:mt-24">
            {/* Datum rail (wide screens) */}
            <m.div aria-hidden="true" variants={railVariants} className="absolute inset-x-0 top-0 hidden origin-left lg:block">
              <div className="h-px bg-steel-300" />
              <div className="bg-ruler-light h-2 opacity-70" />
            </m.div>

            {/* Progress rail (stacked layouts) */}
            <div aria-hidden="true" className="absolute bottom-6 left-[11px] top-2 w-px bg-steel-300/80 lg:hidden">
              <m.div style={{ scaleY: railFill }} className="h-full w-full origin-top bg-gradient-to-b from-kaveri-600 to-swoosh-400" />
            </div>

            <div className="grid gap-8 md:max-w-3xl lg:max-w-none lg:grid-cols-3 lg:gap-6 xl:gap-8">
              {pillars.map((pillar, i) => {
                const step = isDesktop ? i : 0;
                const active = hovered === i;
                return (
                  <m.div key={pillar.id} {...columnTrigger} className={cn("relative pl-10 lg:pl-0", stepOffset[i])}>
                    <m.span
                      aria-hidden="true"
                      custom={step}
                      variants={nodeVariants}
                      className={cn(
                        "absolute left-[7px] top-[50px] z-10 h-[9px] w-[9px] rounded-full bg-white ring-2 ring-kaveri-600 transition-[background-color,box-shadow] duration-300 lg:-top-1 lg:left-[28px]",
                        active && "bg-kaveri-600 shadow-[0_0_0_6px_rgba(18,81,192,0.15)]",
                      )}
                    />
                    <m.span
                      aria-hidden="true"
                      custom={step}
                      variants={dropVariants}
                      className={cn(
                        "absolute left-8 top-0 hidden w-px origin-top transition-colors duration-300 lg:block",
                        dropHeight[i],
                        active ? "bg-kaveri-500" : "bg-steel-300",
                      )}
                    />
                    <m.div
                      custom={step}
                      variants={isDesktop && !reduceMotion ? desktopCardVariants[i] : stackedCardVariants}
                    >
                      <PillarCard
                        pillar={pillar}
                        index={i}
                        className="lg:min-h-[24rem]"
                        onHoverChange={(hovering) => setHovered(hovering ? i : null)}
                      />
                    </m.div>
                  </m.div>
                );
              })}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
