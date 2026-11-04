import { m, type Variants } from "motion/react";
import { Images, MapPin, Maximize2 } from "lucide-react";
import SectionHeading from "@/components/sections/SectionHeading";
import { company } from "@/data/site";
import { ease, fadeUp, revealStagger } from "@/lib/motion";

// Viewfinder brackets that close in on the title like a camera finding focus.
const bracket: Variants = {
  hidden: { opacity: 0, scale: 1.35 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: ease.out } },
};

const brackets = [
  "left-0 top-0 border-l border-t origin-top-left",
  "right-0 top-0 border-r border-t origin-top-right",
  "bottom-0 left-0 border-b border-l origin-bottom-left",
  "bottom-0 right-0 border-b border-r origin-bottom-right",
];

const chip =
  "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink-800 shadow-sm ring-1 ring-steel-200";

interface GalleryIntroProps {
  total: number;
}

/** Gallery opening: the page title framed by viewfinder marks, with the collection at a glance. */
export default function GalleryIntro({ total }: GalleryIntroProps) {
  return (
    <section aria-labelledby="gallery-title" className="relative overflow-hidden bg-white" data-testid="section-gallery-intro">
      <div
        aria-hidden="true"
        className="bg-blueprint-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_80%_at_15%_40%,#000_15%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_70%_at_90%_20%,rgba(18,81,192,0.08),transparent_70%)]"
      />

      <m.div
        variants={revealStagger}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid max-w-7xl gap-8 px-6 pb-12 pt-4 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-10 lg:pb-14 lg:pt-8"
      >
        <div className="relative lg:col-span-7">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-4 -bottom-4 -top-4 hidden sm:block">
            {brackets.map((position) => (
              <m.span key={position} variants={bracket} className={`absolute h-5 w-5 border-kaveri-500/45 ${position}`} />
            ))}
            <m.span
              variants={fadeUp}
              className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-kaveri-500/40 motion-reduce:animate-none [animation-iteration-count:3]" />
                <span className="relative h-2 w-2 rounded-full bg-kaveri-500" />
              </span>
              {company.name}
            </m.span>
          </div>
          <SectionHeading as="h1" id="gallery-title" label="Photo gallery" title="Gallery" size="xl" />
        </div>

        <div className="lg:col-span-5 lg:pb-3">
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-steel-600">
            A look inside our facility—people, equipment, and the discipline behind each batch.
          </m.p>
          <m.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
            <li className={chip}>
              <Images aria-hidden="true" className="h-4 w-4 text-kaveri-600" strokeWidth={1.8} />
              {total} photographs
            </li>
            <li className={chip}>
              <MapPin aria-hidden="true" className="h-4 w-4 text-kaveri-600" strokeWidth={1.8} />
              {company.location}
            </li>
            <li className={chip}>
              <Maximize2 aria-hidden="true" className="h-4 w-4 text-kaveri-600" strokeWidth={1.8} />
              Open any photo full screen
            </li>
          </m.ul>
        </div>
      </m.div>
    </section>
  );
}
