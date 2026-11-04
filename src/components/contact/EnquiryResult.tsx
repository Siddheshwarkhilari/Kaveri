import { useEffect, useRef } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeft, Check, Copy, Mail, PencilLine } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { enquiryTypeOf } from "@/data/contact";
import { company } from "@/data/site";
import { useCopy } from "@/hooks/use-copy";
import { buildEnquiryEmail, formatEnquiry, type EnquiryValues } from "@/lib/enquiry";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const panelVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
};

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[14.5px] font-medium text-ink-900 ring-1 ring-inset ring-steel-200 transition-colors duration-300 hover:bg-kaveri-50 hover:text-kaveri-800 hover:ring-kaveri-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500";

interface EnquiryResultProps {
  kind: "sent" | "handedOff";
  values: EnquiryValues;
  /** Back to the form, keeping what was typed. */
  onEdit: () => void;
  /** Start a new enquiry with an empty form. */
  onReset: () => void;
}

/**
 * What happens after the form. "sent" appears only once the enquiry service has confirmed
 * receipt. "handedOff" says plainly that nothing has reached the company yet: the visitor
 * still has to press Send in their email app.
 */
export default function EnquiryResult({ kind, values, onEdit, onReset }: EnquiryResultProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const { state: copyState, copy } = useCopy();
  const type = enquiryTypeOf(values.type);
  const email = buildEnquiryEmail(values);
  const sent = kind === "sent";

  // The panel is shorter than the form it replaces, so bring its start back into view.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    const card = document.getElementById("enquiry");
    if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, when the panel appears
  }, []);

  return (
    <m.div variants={panelVariants} initial="hidden" animate="visible" className="p-6 sm:p-10" data-testid={`enquiry-result-${kind}`}>
      <m.span
        variants={lineVariants}
        className={cn(
          "grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg",
          sent ? "bg-emerald-600" : "bg-ink-950 text-swoosh-300",
        )}
      >
        {sent ? <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2.4} /> : <Mail aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />}
      </m.span>

      <m.h3
        ref={headingRef}
        tabIndex={-1}
        variants={lineVariants}
        className="mt-6 font-display text-[1.9rem] font-bold leading-[1.08] tracking-[-0.025em] text-ink-950 outline-none sm:text-[2.3rem]"
        data-testid="text-enquiry-result-title"
      >
        {sent ? "Enquiry sent" : "One last step: press Send"}
      </m.h3>

      <m.p variants={lineVariants} className="mt-3 max-w-xl text-[16px] leading-relaxed text-steel-600">
        {sent
          ? `Thank you, ${values.name.trim()}. We respond to business enquiries on working days.`
          : `Your email app should now be open with this enquiry addressed to ${company.email.display}. Nothing reaches us until you press Send there.`}
      </m.p>

      {!sent && email.shortened && (
        <m.p
          variants={lineVariants}
          className="mt-4 max-w-xl rounded-xl bg-amber-50 px-4 py-3 text-[14px] leading-relaxed text-amber-900 ring-1 ring-inset ring-amber-200"
          data-testid="text-enquiry-shortened"
        >
          Your message is too long for an email link, so the draft holds a shortened copy. Use Copy enquiry and paste the full text into the email.
        </m.p>
      )}

      <m.dl variants={lineVariants} className="mt-6 grid gap-x-6 gap-y-3 rounded-2xl bg-steel-50 p-5 ring-1 ring-inset ring-steel-200 sm:grid-cols-[auto_minmax(0,1fr)]">
        <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-steel-500 sm:pt-0.5">Type</dt>
        <dd className="-mt-2 text-[14.5px] text-ink-900 sm:mt-0">{type.label}</dd>
        <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-steel-500 sm:pt-0.5">From</dt>
        <dd className="-mt-2 break-words text-[14.5px] text-ink-900 sm:mt-0">
          {[values.name.trim(), values.company.trim(), values.email.trim()].filter(Boolean).join(" · ")}
        </dd>
        <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-steel-500 sm:pt-0.5">Message</dt>
        <dd className="-mt-2 line-clamp-3 whitespace-pre-line break-words text-[14.5px] leading-relaxed text-ink-900 sm:mt-0">{values.message.trim()}</dd>
      </m.dl>

      {sent ? (
        <m.div variants={lineVariants} className="mt-7">
          <button type="button" onClick={onReset} className={secondaryButton} data-testid="button-new-enquiry">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Send another enquiry
          </button>
        </m.div>
      ) : (
        <>
          <m.div variants={lineVariants} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a href={email.href} className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group")} data-testid="link-open-email-again">
              <Mail className="transition-transform duration-300 ease-precise group-hover:-rotate-6" />
              Open email again
            </a>
            <button type="button" onClick={() => copy(formatEnquiry(values))} className={secondaryButton} data-testid="button-copy-enquiry">
              {copyState === "copied" ? <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              {copyState === "copied" ? "Copied" : copyState === "failed" ? "Couldn't copy" : "Copy enquiry"}
            </button>
            <button type="button" onClick={onEdit} className={secondaryButton} data-testid="button-edit-enquiry">
              <PencilLine aria-hidden="true" className="h-4 w-4" />
              Edit enquiry
            </button>
          </m.div>
          <m.p variants={lineVariants} className="mt-5 max-w-xl text-[14px] leading-relaxed text-steel-500">
            Email app didn&rsquo;t open? Copy your enquiry and send it to{" "}
            <a href={company.email.href} className="font-medium text-kaveri-700 underline-offset-4 hover:underline">
              {company.email.display}
            </a>
            , or call{" "}
            <a href={company.phone.href} className="font-medium text-kaveri-700 underline-offset-4 hover:underline">
              {company.phone.display}
            </a>
            .
          </m.p>
          <span role="status" className="sr-only">
            {copyState === "copied" ? "Enquiry copied" : copyState === "failed" ? "Could not copy the enquiry" : ""}
          </span>
        </>
      )}
    </m.div>
  );
}
