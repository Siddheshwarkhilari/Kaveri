import type { MouseEvent } from "react";
import { m, useReducedMotion } from "motion/react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import FlangeBlueprint from "@/components/decor/FlangeBlueprint";
import SectionHeading from "@/components/sections/SectionHeading";
import { company } from "@/data/site";
import { fieldId } from "@/lib/enquiry";
import { fadeUp, revealStagger } from "@/lib/motion";

const buttonClass =
  "group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-2xl px-6 text-[15px] font-semibold transition duration-300 ease-precise hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kaveri-700 active:translate-y-0 motion-reduce:hover:translate-y-0 [&_svg]:h-[18px] [&_svg]:w-[18px]";
const glassClass = "bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur hover:bg-white/[0.18]";

/** Closing invitation in brand blue: the three ways to take the next step. */
export default function ContactCta() {
  const reduceMotion = useReducedMotion();

  // Jump back to the form with the first field ready to type in.
  const goToForm = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("enquiry")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    document.getElementById(fieldId("name"))?.focus({ preventScroll: true });
  };

  return (
    <section aria-labelledby="contact-cta-title" className="bg-white px-3 pb-3 sm:px-4 sm:pb-4" data-testid="section-contact-cta">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-gradient-to-br from-kaveri-800 via-kaveri-700 to-kaveri-600 text-white ring-1 ring-kaveri-900/10 sm:rounded-[28px]">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,#000,transparent_85%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_85%_20%,rgba(27,187,255,0.28),transparent_70%)]" />
        <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-24 -z-10 h-[32rem] w-[32rem] text-white/[0.16] sm:-right-10 lg:-bottom-28 lg:right-10 lg:h-[34rem] lg:w-[34rem]">
          <FlangeBlueprint static={reduceMotion ?? false} className="h-full w-full" />
        </div>

        <m.div
          variants={revealStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24"
        >
          <SectionHeading
            id="contact-cta-title"
            label="Next step"
            title="Let's discuss your next manufacturing requirement"
            size="lg"
            tone="dark"
            className="max-w-4xl"
          />
          <m.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Reach out for quotations, technical discussions and product-related enquiries.
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={company.phone.href}
              className={`${buttonClass} bg-white text-kaveri-800 shadow-[0_18px_36px_-18px_rgba(5,11,23,0.7)] hover:bg-kaveri-50`}
              data-testid="link-cta-call"
            >
              <Phone aria-hidden="true" className="transition-transform duration-300 ease-precise group-hover:-rotate-12" />
              Call now
            </a>
            <a href={company.email.href} className={`${buttonClass} ${glassClass}`} data-testid="link-cta-email">
              <Mail aria-hidden="true" className="transition-transform duration-300 ease-precise group-hover:-translate-y-0.5" />
              Send an email
            </a>
            <a href="#enquiry" onClick={goToForm} className={`${buttonClass} ${glassClass}`} data-testid="link-cta-enquiry">
              Request an enquiry
              <ArrowUp aria-hidden="true" className="transition-transform duration-300 ease-precise group-hover:-translate-y-0.5" />
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
