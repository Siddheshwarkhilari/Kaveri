import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import FramedPhoto from "@/components/media/FramedPhoto";
import SectionHeading from "@/components/sections/SectionHeading";
import { about } from "@/data/about";
import { ease, fadeUp, revealStagger } from "@/lib/motion";

const factVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

const dimensionLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: ease.inOut } },
};

/**
 * About page opening: an oversized page title with the company introduction and key
 * facts, set against a real photograph of the plant entrance.
 */
export default function AboutIntro() {
  const { label, title, company, lead, facts, photo, caption } = about.intro;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-white bg-[linear-gradient(to_bottom,#ffffff_55%,#F5F7FA)]"
      data-testid="section-about-intro"
    >
      <m.div
        aria-hidden="true"
        style={{ y: gridY }}
        className="bg-blueprint-light pointer-events-none absolute inset-x-0 -top-24 h-[140%] [mask-image:radial-gradient(ellipse_60%_55%_at_20%_35%,#000_20%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_85%_30%,rgba(18,81,192,0.09),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28 lg:pt-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <m.div variants={revealStagger} initial="hidden" animate="visible" className="lg:col-span-6">
            <SectionHeading as="h1" id="about-title" label={label} title={title} size="display" />

            {/* A dimension line under the title, drawn like a callout on a drawing. */}
            <m.div
              aria-hidden="true"
              variants={dimensionLine}
              className="mt-6 flex max-w-md origin-left items-center gap-2 text-kaveri-500/60"
            >
              <span className="h-3 w-px bg-current" />
              <span className="h-px flex-1 bg-current" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400">Chakan · Pune</span>
              <span className="h-px w-8 bg-current" />
              <span className="h-3 w-px bg-current" />
            </m.div>

            <m.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-relaxed text-steel-600 sm:text-xl">
              <span className="font-medium text-ink-900">{company}</span> {lead}
            </m.p>

            <m.ul variants={revealStagger} className="mt-10 flex flex-wrap gap-2.5">
              {facts.map(({ icon: Icon, label: fact }) => (
                <m.li
                  key={fact}
                  variants={factVariants}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink-800 shadow-sm ring-1 ring-steel-200"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-kaveri-600" strokeWidth={1.8} />
                  {fact}
                </m.li>
              ))}
            </m.ul>
          </m.div>

          <div className="lg:col-span-6">
            <FramedPhoto
              photo={photo}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw"
              frameClassName="aspect-[3/2]"
              caption={caption}
              reveal="right"
              eager
            />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="bg-ruler-light absolute inset-x-0 bottom-0 h-2 opacity-60" />
    </section>
  );
}
