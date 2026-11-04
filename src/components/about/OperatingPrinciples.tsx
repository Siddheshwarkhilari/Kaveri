import { m, type Variants } from "motion/react";
import FramedPhoto from "@/components/media/FramedPhoto";
import SectionHeading from "@/components/sections/SectionHeading";
import { about } from "@/data/about";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

/** Each principle's icon gets its own small gesture on hover. */
const iconGesture = [
  "group-hover:-rotate-[20deg]",
  "group-hover:-translate-y-0.5",
  "group-hover:rotate-[12deg]",
  "group-hover:scale-110",
];

/** "How we work": the operational approach as four principles beside a shop-floor photo. */
export default function OperatingPrinciples() {
  const { label, title, lead, principles, photo, caption } = about.approach;

  return (
    <section aria-labelledby="approach-title" className="relative overflow-hidden bg-white" data-testid="section-approach">
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <FramedPhoto
              photo={photo}
              sizes="(min-width: 1024px) 40vw, 92vw"
              frameClassName="aspect-[4/3] lg:aspect-[4/5]"
              focus="38% 50%"
              caption={caption}
              reveal="left"
            />
          </div>

          <m.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-7"
          >
            <SectionHeading id="approach-title" label={label} title={title} size="lg" />
            <m.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-600">
              {lead}
            </m.p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {principles.map(({ icon: Icon, title: name, body }, i) => (
                <m.div key={name} variants={cardReveal}>
                  <article
                    className="group relative h-full overflow-hidden rounded-2xl bg-steel-50 p-6 ring-1 ring-steel-200 transition-[transform,box-shadow,background-color] duration-500 ease-precise hover:-translate-y-1 hover:bg-white hover:shadow-[0_2px_4px_rgba(10,19,36,0.04),0_28px_50px_-30px_rgba(18,81,192,0.35)] hover:ring-kaveri-200 motion-reduce:hover:translate-y-0"
                    data-testid={`principle-${i}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-6 right-6 top-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-kaveri-600 via-kaveri-400 to-swoosh-400 transition-transform duration-700 ease-precise group-hover:scale-x-100"
                    />
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-kaveri-600 ring-1 ring-steel-200 transition-colors duration-500 group-hover:bg-kaveri-600 group-hover:text-white group-hover:ring-kaveri-600">
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.7}
                        className={cn("h-5 w-5 transition-transform duration-500 ease-precise motion-reduce:transform-none", iconGesture[i % iconGesture.length])}
                      />
                    </span>
                    <h3 className="mt-5 font-display text-[1.1rem] font-semibold leading-snug text-ink-950">{name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-steel-600">{body}</p>
                  </article>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
