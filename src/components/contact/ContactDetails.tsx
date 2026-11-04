import type { ReactNode } from "react";
import { m } from "motion/react";
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { businessHours, weekDays } from "@/data/contact";
import { company, mapsUrl } from "@/data/site";
import { useBusinessStatus } from "@/hooks/use-business-status";
import { useHeadroom } from "@/hooks/use-headroom";
import { fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import CopyButton from "./CopyButton";

const fullAddress = company.address.join(" ");

interface DetailCardProps {
  icon: LucideIcon;
  /** Motion for the icon when the card is hovered. */
  iconClassName?: string;
  label: string;
  children: ReactNode;
}

/** A contact block: an icon that fills on hover, an accent that draws down the edge, a slight lift. */
function DetailCard({ icon: Icon, iconClassName, label, children }: DetailCardProps) {
  return (
    <m.li
      variants={fadeUp}
      className="group relative flex gap-3 overflow-hidden rounded-[22px] bg-white p-5 shadow-[0_1px_2px_rgba(10,19,36,0.04),0_16px_36px_-28px_rgba(10,19,36,0.35)] ring-1 ring-steel-200 transition-[box-shadow,transform] duration-500 ease-precise hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(10,19,36,0.04),0_28px_52px_-32px_rgba(18,81,192,0.5)] hover:ring-kaveri-200 motion-reduce:hover:translate-y-0 sm:p-6 lg:gap-4"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-5 left-0 w-[3px] origin-top scale-y-0 rounded-r-full bg-gradient-to-b from-kaveri-600 to-swoosh-400 transition-transform duration-500 ease-precise group-hover:scale-y-100 group-focus-within:scale-y-100"
      />
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-kaveri-50 text-kaveri-700 lg:h-12 lg:w-12 ring-1 ring-inset ring-kaveri-100 transition-colors duration-300 group-hover:bg-kaveri-600 group-hover:text-white group-hover:ring-kaveri-600">
        <Icon aria-hidden="true" className={cn("h-5 w-5 transition-transform duration-500 ease-precise motion-reduce:transform-none", iconClassName)} strokeWidth={1.7} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-mono text-[10.5px] font-normal uppercase tracking-[0.18em] text-steel-500">{label}</h3>
        {children}
      </div>
    </m.li>
  );
}

/** The usual working week at a glance, with today marked and the status worked out in India's time. */
function HoursCard() {
  const { dayIndex, withinHours, detail } = useBusinessStatus();

  return (
    <m.li
      variants={fadeUp}
      className="relative isolate flex flex-col overflow-hidden rounded-[22px] bg-ink-950 p-5 text-white shadow-[0_28px_52px_-32px_rgba(10,19,36,0.8)] ring-1 ring-ink-950/10 sm:p-6"
    >
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-80" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(27,187,255,0.14),transparent_65%)]" />

      <div className="flex gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-swoosh-300 ring-1 ring-inset ring-white/10">
          <Clock aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <div className="min-w-0" data-testid="text-business-hours">
          <h3 className="font-mono text-[10.5px] font-normal uppercase tracking-[0.18em] text-white/50">{businessHours.label}</h3>
          <p className="mt-1.5 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em]">{businessHours.time}</p>
          <p className="mt-0.5 text-[14px] text-white/70">{businessHours.openDays}</p>
          <p className="text-[14px] text-white/45">{businessHours.closedDay}: closed</p>
        </div>
      </div>

      <ol aria-hidden="true" className="mt-5 grid grid-cols-7 gap-1.5">
        {weekDays.map((day, i) => (
          <li key={day.name} className="text-center">
            <span
              className={cn(
                "block h-8 rounded-md",
                !day.open && "border border-dashed border-white/20",
                day.open && (i === dayIndex ? "bg-swoosh-400" : "bg-white/[0.12]"),
                !day.open && i === dayIndex && "border-swoosh-400",
              )}
            />
            <span className={cn("mt-1.5 block font-mono text-[10px]", i === dayIndex ? "text-swoosh-300" : "text-white/45")}>{day.short}</span>
          </li>
        ))}
      </ol>

      <p className="mt-auto flex items-center gap-2 pt-4 text-[13px] text-white/70">
        <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full", withinHours ? "bg-emerald-400" : "bg-white/35")} />
        <span>
          <span className="font-medium text-white">{withinHours ? "Within working hours" : "Outside working hours"}</span> · {detail}
        </span>
      </p>
    </m.li>
  );
}

/**
 * Every direct route to the company, each one a working link. On wide screens the column stays
 * in view beside the longer form, dropping below the navbar whenever the navbar is showing.
 */
export default function ContactDetails() {
  const navHidden = useHeadroom();

  return (
    <section
      aria-labelledby="direct-details-title"
      className={cn("flex flex-col transition-[top] duration-500 ease-precise lg:sticky", navHidden ? "lg:top-6" : "lg:top-[104px]")}
      data-testid="section-direct-details"
    >
      <h2 id="direct-details-title" className="flex items-center gap-3 font-mono text-[11px] font-normal uppercase tracking-[0.22em] text-kaveri-700">
        <span aria-hidden="true" className="h-px w-8 bg-kaveri-500" />
        Direct details
      </h2>

      <m.ul
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
      >
        <DetailCard icon={Phone} iconClassName="group-hover:-rotate-12" label="Phone">
          <div className="mt-1.5 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <a
                href={company.phone.href}
                className="block font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950 transition-colors duration-300 after:absolute after:inset-0 hover:text-kaveri-700 focus-visible:outline-none focus-visible:after:rounded-[22px] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-kaveri-500"
                data-testid="text-contact-phone"
              >
                {company.phone.display}
              </a>
              <span aria-hidden="true" className="mt-1 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-kaveri-700">
                Call now
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-precise group-hover:translate-x-1" />
              </span>
            </div>
            <CopyButton text={company.phone.display} what="phone number" testId="button-copy-phone" className="-mr-1 -mt-1" />
          </div>
        </DetailCard>

        <DetailCard icon={Mail} iconClassName="group-hover:-translate-y-0.5" label="Email">
          <ul className="mt-1 space-y-0.5" data-testid="text-contact-email">
            {[company.email, company.altEmail].map((email) => (
              <li key={email.display} className="flex items-center justify-between gap-2">
                <a
                  href={email.href}
                  className="min-h-10 min-w-0 flex-1 py-2 text-[14px] font-medium leading-snug [overflow-wrap:anywhere] lg:text-[15px] text-ink-950 underline-offset-4 transition-colors duration-300 hover:text-kaveri-700 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500"
                >
                  {email.display.split("@")[0]}
                  <wbr />@{email.display.split("@")[1]}
                </a>
                <CopyButton text={email.display} what={`email address ${email.display}`} className="-mr-1" />
              </li>
            ))}
          </ul>
        </DetailCard>

        <DetailCard icon={MapPin} iconClassName="group-hover:-translate-y-0.5" label="Address">
          <address className="mt-1.5 text-[15px] not-italic leading-relaxed text-ink-900" data-testid="text-contact-address">
            {company.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-2 flex items-center justify-between gap-2">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 text-[13.5px] font-medium text-kaveri-700 underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500"
              data-testid="link-open-maps"
            >
              Open in Maps
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <CopyButton text={fullAddress} what="address" testId="button-copy-address" className="-mr-1" />
          </div>
        </DetailCard>

        <HoursCard />
      </m.ul>
    </section>
  );
}
