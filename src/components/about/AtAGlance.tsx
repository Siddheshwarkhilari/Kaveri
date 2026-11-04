import { m, type Variants } from "motion/react";
import CountUp from "@/components/motion/CountUp";
import SectionHeading from "@/components/sections/SectionHeading";
import { about } from "@/data/about";
import { ease, revealStagger } from "@/lib/motion";

const statReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: ease.out } }),
};

const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({ scaleX: 1, transition: { delay: 0.3 + i * 0.12, duration: 1.6, ease: ease.out } }),
};

/** "At a glance": the three published figures as oversized numerals that count up once. */
export default function AtAGlance() {
  const { label, title, stats } = about.glance;

  return (
    <section aria-labelledby="glance-title" className="bg-white px-3 sm:px-4" data-testid="section-glance">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-ink-950 text-white ring-1 ring-ink-950/10 sm:rounded-[28px]">
        <div
          aria-hidden="true"
          className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,#000_30%,transparent_80%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_50%_120%,rgba(18,81,192,0.35),transparent_70%)]"
        />
        <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          <m.div variants={revealStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <SectionHeading id="glance-title" label={label} title={title} size="lg" tone="dark" />
          </m.div>

          <m.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 grid border-y border-white/10 lg:grid-cols-3"
          >
            {stats.map((stat, i) => (
              <m.li
                key={stat.label}
                custom={i}
                variants={statReveal}
                className="group relative border-white/10 py-10 transition-colors duration-500 [&:not(:first-child)]:border-t lg:px-10 lg:py-14 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-t-0"
                data-testid={`stat-${i}`}
              >
                <m.span
                  aria-hidden="true"
                  custom={i}
                  variants={lineDraw}
                  className="absolute left-0 top-0 h-[2px] w-24 origin-left bg-gradient-to-r from-kaveri-500 to-swoosh-400 lg:left-10 lg:group-first:left-0"
                />
                <p className="font-display text-[5.5rem] font-bold leading-[0.85] tracking-[-0.05em] sm:text-[7rem] xl:text-[8.25rem]">
                  <CountUp
                    value={stat.value}
                    duration={1.6 + i * 0.25}
                    suffix={<span className="ml-1 text-swoosh-400">{stat.suffix}</span>}
                    className="transition-transform duration-500 ease-precise group-hover:-translate-y-1 motion-reduce:transform-none"
                    numberClassName="bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent"
                  />
                </p>
                <p className="mt-6 text-base font-medium text-white/85 sm:text-lg">{stat.label}</p>
                {stat.note && (
                  <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">({stat.note})</p>
                )}
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
