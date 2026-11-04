import { m, type Variants } from "motion/react";
import { Eye, Target, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/sections/SectionHeading";
import { about } from "@/data/about";
import { ease, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.15, duration: 0.85, ease: ease.out } }),
};

/** Mission and vision as two editorial statements: one on paper, one in Kaveri blue. */
export default function MissionVision() {
  const { label, title, mission, vision } = about.purpose;

  return (
    <section aria-labelledby="purpose-title" className="relative overflow-hidden bg-white" data-testid="section-purpose">
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <m.div variants={revealStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <SectionHeading id="purpose-title" label={label} title={title} size="lg" />
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-5 lg:grid-cols-2"
        >
          <PurposeStatement index={0} kind="Mission" icon={Target} text={mission} tone="paper" />
          <PurposeStatement index={1} kind="Vision" icon={Eye} text={vision} tone="brand" />
        </m.div>
      </div>
    </section>
  );
}

interface PurposeStatementProps {
  index: number;
  kind: string;
  icon: LucideIcon;
  text: string;
  tone: "paper" | "brand";
}

function PurposeStatement({ index, kind, icon: Icon, text, tone }: PurposeStatementProps) {
  const brand = tone === "brand";
  return (
    <m.div custom={index} variants={cardReveal}>
      <article
        className={cn(
          "group relative isolate flex h-full flex-col overflow-hidden rounded-[22px] p-8 ring-1 transition-[transform,box-shadow] duration-500 ease-precise hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:p-10",
          brand
            ? "bg-gradient-to-br from-kaveri-600 to-kaveri-900 text-white shadow-[0_40px_80px_-40px_rgba(18,81,192,0.7)] ring-kaveri-500/40"
            : "bg-steel-50 text-ink-950 ring-steel-200 hover:shadow-[0_30px_60px_-36px_rgba(10,19,36,0.35)]",
        )}
        data-testid={`statement-${kind.toLowerCase()}`}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 transition-[background-position] duration-1000 ease-precise group-hover:[background-position:16px_16px]",
            brand ? "bg-blueprint opacity-70" : "bg-blueprint-light [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]",
          )}
        />
        <div className="flex items-center justify-between gap-4">
          <p
            className={cn(
              "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]",
              brand ? "text-swoosh-300" : "text-kaveri-700",
            )}
          >
            <span aria-hidden="true" className={cn("h-px w-6", brand ? "bg-swoosh-400" : "bg-kaveri-500")} />
            {kind}
          </p>
          <span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-xl ring-1 transition-transform duration-500 ease-precise group-hover:rotate-[-8deg] group-hover:scale-105 motion-reduce:transform-none",
              brand ? "bg-white/10 text-white ring-white/20" : "bg-white text-kaveri-600 ring-steel-200",
            )}
          >
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
          </span>
        </div>
        <p
          className={cn(
            "mt-10 font-display text-[1.45rem] font-medium leading-[1.35] tracking-[-0.015em] sm:text-[1.7rem]",
            brand ? "text-white" : "text-ink-900",
          )}
        >
          {text}
        </p>
      </article>
    </m.div>
  );
}
