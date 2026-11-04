import { m } from "motion/react";
import { Boxes, MousePointerClick } from "lucide-react";
import SectionHeading from "@/components/sections/SectionHeading";
import { fadeUp, revealStagger } from "@/lib/motion";

interface CatalogueIntroProps {
  total: number;
}

/** Products page opening: a compact editorial title block leading into the catalogue. */
export default function CatalogueIntro({ total }: CatalogueIntroProps) {
  return (
    <section aria-labelledby="products-title" className="relative overflow-hidden bg-white" data-testid="section-catalogue-intro">
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
        <SectionHeading as="h1" id="products-title" label="Product catalogue" title="Products" size="xl" className="lg:col-span-7" />
        <div className="lg:col-span-5 lg:pb-3">
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-steel-600">
            Industrial hardware and fabricated parts—search by name or short description. Click a card for a larger photo
            and details.
          </m.p>
          <m.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
            <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink-800 shadow-sm ring-1 ring-steel-200">
              <Boxes aria-hidden="true" className="h-4 w-4 text-kaveri-600" strokeWidth={1.8} />
              {total} products
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink-800 shadow-sm ring-1 ring-steel-200">
              <MousePointerClick aria-hidden="true" className="h-4 w-4 text-kaveri-600" strokeWidth={1.8} />
              Open any part for details &amp; enquiry
            </li>
          </m.ul>
        </div>
      </m.div>
    </section>
  );
}
