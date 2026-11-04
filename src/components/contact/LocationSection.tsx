import { useState } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight, Info, MapPin, Navigation } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import SectionHeading from "@/components/sections/SectionHeading";
import { company, directionsUrl, mapAreaName, mapEmbedUrl, mapsUrl } from "@/data/site";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import CopyButton from "./CopyButton";

const frameVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(10% 5% 10% 5% round 28px)" },
  visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", transition: { duration: 1.1, ease: ease.out } },
};

const panelVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.25, staggerChildren: 0.08 } },
};

/**
 * Where to find the plant: its full address and routes in a dark panel beside a live map.
 * The map outlines the surrounding locality rather than pinning the plant, because Google
 * Maps doesn't have the plant yet (see mapEmbedUrl), and the panel says so.
 */
export default function LocationSection() {
  const reduceMotion = useReducedMotion();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="location" aria-labelledby="contact-location-title" className="scroll-mt-24 bg-white py-20 lg:py-28" data-testid="section-contact-location">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <m.div
          variants={revealStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <SectionHeading id="contact-location-title" label="Location" title="Find us in Chakan" size="lg" className="lg:col-span-7" />
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-steel-600 lg:col-span-5 lg:pb-2">
            Planning a visit? Call ahead and we can help with directions for the final stretch.
          </m.p>
        </m.div>

        <m.div
          variants={frameVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid overflow-hidden rounded-[28px] bg-ink-950 shadow-[0_2px_4px_rgba(10,19,36,0.06),0_48px_90px_-48px_rgba(10,19,36,0.7)] ring-1 ring-ink-950/10 lg:mt-12 lg:grid-cols-[23rem_minmax(0,1fr)] xl:grid-cols-[26rem_minmax(0,1fr)]"
          data-testid="location-frame"
        >
          <m.div
            variants={panelVariants}
            className="relative isolate order-2 flex flex-col gap-7 p-6 text-white sm:p-8 lg:order-1 lg:p-9"
          >
            <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-80" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(90%_55%_at_0%_0%,rgba(27,187,255,0.14),transparent_65%)]" />

            <m.div variants={fadeUp}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-kaveri-600 text-white shadow-[0_14px_28px_-14px_rgba(18,81,192,0.9)]">
                <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-swoosh-300">{company.name}</p>
              <address className="mt-3 font-display text-[1.1rem] font-semibold not-italic leading-snug tracking-[-0.01em]" data-testid="text-location-address">
                {company.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </m.div>

            <m.div variants={fadeUp} className="flex flex-col gap-2.5">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group w-full")}
                data-testid="link-location-maps"
              >
                Open in Google Maps
                <ArrowUpRight className="transition-transform duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "glass", size: "xl" }), "group w-full transition-colors duration-300 hover:bg-white/[0.12]")}
                data-testid="link-location-directions"
              >
                <Navigation className="transition-transform duration-300 ease-precise group-hover:-rotate-12" />
                Directions to {mapAreaName}
              </a>
              <span className="flex items-center gap-1 text-[13.5px] text-white/60">
                <CopyButton text={company.address.join(" ")} what="address" tone="dark" testId="button-copy-location-address" className="-ml-2.5" />
                Copy the full address for your driver or maps app
              </span>
            </m.div>

            <m.p variants={fadeUp} className="mt-auto flex gap-2.5 border-t border-white/10 pt-5 text-[13.5px] leading-relaxed text-white/55" data-testid="text-location-note">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.8} />
              <span>
                The map outlines {mapAreaName}, the part of Chakan our plant is in. It doesn&rsquo;t mark the exact plot, so use the full address or call{" "}
                <a href={company.phone.href} className="font-medium text-white underline underline-offset-2 hover:text-swoosh-300">
                  {company.phone.display}
                </a>{" "}
                to find the gate.
              </span>
            </m.p>
          </m.div>

          <div className="group relative order-1 h-[20rem] overflow-hidden bg-ink-900 sm:h-[26rem] lg:order-2 lg:h-auto lg:min-h-[36rem]">
            {/* Shown until the map arrives, and if it can't load the panel's links still work. */}
            <div aria-hidden="true" className="bg-blueprint absolute inset-0 grid place-items-center">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">Map of {mapAreaName}, Chakan</span>
            </div>
            <iframe
              src={mapEmbedUrl}
              title={`Google map of ${mapAreaName}, Chakan, the area where the plant is located`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              onLoad={() => setMapLoaded(true)}
              className={cn(
                "absolute inset-0 h-full w-full border-0 transition-[opacity,filter] duration-700 [filter:saturate(0.72)_contrast(1.02)] group-hover:[filter:none] group-focus-within:[filter:none]",
                mapLoaded ? "opacity-100" : "opacity-0",
              )}
              data-testid="location-map"
            />
          </div>
        </m.div>
      </div>
    </section>
  );
}
