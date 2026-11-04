import { m, useReducedMotion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import FlangeBlueprint from "@/components/decor/FlangeBlueprint";
import SectionHeading from "@/components/sections/SectionHeading";
import { contactTopics } from "@/data/contact";
import { company } from "@/data/site";
import { useBusinessStatus } from "@/hooks/use-business-status";
import { fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const quickActionClass =
  "flex min-h-[4.25rem] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white text-[13px] font-medium text-ink-900 shadow-sm ring-1 ring-steel-200 transition-colors active:bg-kaveri-50";

/** Contact page opening: the title over a line drawing, what to get in touch about, and whether the team is in. */
export default function ContactIntro() {
  const reduceMotion = useReducedMotion();
  const { withinHours, detail } = useBusinessStatus();

  return (
    <section aria-labelledby="contact-title" className="relative overflow-hidden bg-white" data-testid="section-contact-intro">
      <div
        aria-hidden="true"
        className="bg-blueprint-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_80%_at_15%_40%,#000_15%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_70%_at_90%_20%,rgba(18,81,192,0.08),transparent_70%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 hidden h-[34rem] w-[34rem] text-kaveri-600/[0.14] lg:block xl:right-0">
        <FlangeBlueprint static={reduceMotion ?? false} className="h-full w-full" />
      </div>

      <m.div
        variants={revealStagger}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid max-w-7xl gap-8 px-6 pb-12 pt-4 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-10 lg:pb-14 lg:pt-8"
      >
        <div className="lg:col-span-7">
          <SectionHeading as="h1" id="contact-title" label="Get in touch" title="Contact" size="xl" />
          <m.p
            variants={fadeUp}
            className="mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full bg-white px-3.5 py-2 text-[13px] text-steel-600 shadow-sm ring-1 ring-steel-200"
            data-testid="text-business-status"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
              {withinHours && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50 [animation-iteration-count:3] motion-reduce:animate-none" />}
              <span className={cn("relative h-2 w-2 rounded-full", withinHours ? "bg-emerald-500" : "bg-steel-400")} />
            </span>
            <span>
              <span className="font-medium text-ink-900">{withinHours ? "Within working hours" : "Outside working hours"}</span>
              <span> · {detail}</span>
            </span>
          </m.p>
        </div>

        <div className="lg:col-span-5 lg:pb-1">
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-steel-600">
            Reach the team for quotations, technical questions, or visit planning. We respond to business enquiries on working days.
          </m.p>
          <m.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-2" aria-label="What you can contact us about">
            {contactTopics.map((topic) => (
              <li key={topic} className="rounded-full bg-kaveri-50 px-3 py-1.5 text-[13px] font-medium text-kaveri-800 ring-1 ring-inset ring-kaveri-100">
                {topic}
              </li>
            ))}
          </m.ul>
        </div>

        {/* On phones and tablets the direct routes come first, a thumb's reach away. */}
        <m.ul variants={fadeUp} className="grid grid-cols-3 gap-2 lg:hidden" aria-label="Quick contact">
          <li>
            <a href={company.phone.href} className={quickActionClass} data-testid="link-quick-call">
              <Phone aria-hidden="true" className="h-5 w-5 text-kaveri-600" strokeWidth={1.8} />
              Call
            </a>
          </li>
          <li>
            <a href={company.email.href} className={quickActionClass} data-testid="link-quick-email">
              <Mail aria-hidden="true" className="h-5 w-5 text-kaveri-600" strokeWidth={1.8} />
              Email
            </a>
          </li>
          <li>
            <a href="#location" className={quickActionClass} data-testid="link-quick-location">
              <MapPin aria-hidden="true" className="h-5 w-5 text-kaveri-600" strokeWidth={1.8} />
              Location
            </a>
          </li>
        </m.ul>
      </m.div>
    </section>
  );
}
