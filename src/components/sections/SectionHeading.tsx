import { m } from "motion/react";
import WordReveal from "@/components/motion/WordReveal";
import { fadeUp, lineGrow, riseWord } from "@/lib/motion";
import { cn } from "@/lib/utils";

const titleSizes = {
  display: "text-[3.4rem] sm:text-[5rem] lg:text-[6.25rem] xl:text-[7rem]",
  xl: "text-[3rem] sm:text-[4.25rem] lg:text-[5.25rem]",
  lg: "text-[2.6rem] sm:text-[3.5rem] lg:text-[4.25rem]",
};

const tones = {
  light: { label: "text-kaveri-700", rule: "bg-kaveri-500", title: "text-ink-950", stop: "bg-kaveri-600" },
  dark: { label: "text-swoosh-300", rule: "bg-swoosh-400", title: "text-white", stop: "bg-swoosh-400" },
};

interface SectionHeadingProps {
  /** Id for the heading, so the section can reference it with aria-labelledby. */
  id: string;
  label: string;
  title: string;
  size?: keyof typeof titleSizes;
  tone?: keyof typeof tones;
  /** Use "h1" when the heading is the page title. */
  as?: "h1" | "h2";
  className?: string;
}

/**
 * Section label with a drawn rule, then a display heading whose words rise in and
 * end on the brand's square full stop. Place it inside a parent motion element
 * using `revealStagger` so it animates as part of the section's cascade.
 */
export default function SectionHeading({
  id,
  label,
  title,
  size = "xl",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const colors = tones[tone];
  return (
    <div className={className}>
      <p className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]", colors.label)}>
        <m.span variants={lineGrow} aria-hidden="true" className={cn("h-px w-10 origin-left", colors.rule)} />
        <m.span variants={fadeUp}>{label}</m.span>
      </p>
      <Heading
        id={id}
        className={cn("mt-5 font-display font-bold leading-[0.98] tracking-[-0.035em]", colors.title, titleSizes[size])}
      >
        <WordReveal text={title} variants={riseWord} />
        <m.span
          variants={fadeUp}
          aria-hidden="true"
          className={cn("-ml-[0.16em] inline-block h-[0.15em] w-[0.15em] rounded-[2px] align-baseline", colors.stop)}
        />
      </Heading>
    </div>
  );
}
