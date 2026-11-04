import type { PointerEvent } from "react";
import type { Pillar } from "@/data/whoWeAre";
import { cn } from "@/lib/utils";

/** Each pillar's icon gets its own small gesture on hover. */
const iconGesture = [
  "group-hover:rotate-[60deg]",
  "group-hover:-rotate-[16deg]",
  "group-hover:-translate-y-0.5 group-hover:scale-110",
];

interface PillarCardProps {
  pillar: Pillar;
  index: number;
  className?: string;
  onHoverChange: (hovering: boolean) => void;
}

/**
 * One of the three "Who we are" pillars: an oversized outline index, a machined icon
 * tile, the copy, and a strip of technical tags. A soft spotlight follows the pointer.
 */
export default function PillarCard({ pillar, index, className, onHoverChange }: PillarCardProps) {
  const Icon = pillar.icon;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onHoverChange(true);
      }}
      onPointerLeave={() => onHoverChange(false)}
      onPointerMove={onPointerMove}
      data-testid={`pillar-${pillar.id}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-[0_1px_2px_rgba(10,19,36,0.04),0_18px_40px_-28px_rgba(10,19,36,0.25)] ring-1 ring-steel-200 transition-[transform,box-shadow] duration-500 ease-precise hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(10,19,36,0.04),0_32px_60px_-30px_rgba(18,81,192,0.38)] hover:ring-kaveri-200 motion-reduce:hover:translate-y-0 lg:p-8",
        className,
      )}
    >
      {/* Pointer spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,0%),rgba(18,81,192,0.07),transparent_65%)]"
      />
      {/* Graph-paper corner that slides a notch on hover */}
      <div
        aria-hidden="true"
        className="bg-blueprint-light pointer-events-none absolute right-0 top-0 h-44 w-44 transition-[background-position] duration-700 ease-precise [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] group-hover:[background-position:16px_16px]"
      />
      {/* Accent edge that runs out from where the drop-line meets the card */}
      <div
        aria-hidden="true"
        className="absolute left-7 right-7 top-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-kaveri-600 via-kaveri-400 to-swoosh-400 transition-transform duration-700 ease-precise group-hover:scale-x-100 lg:left-8 lg:right-8"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-5 select-none font-display text-[7.5rem] font-bold leading-none tracking-tighter text-transparent transition-[transform,-webkit-text-stroke-color] duration-700 ease-precise [-webkit-text-stroke:1px_#D9DFE8] group-hover:-translate-x-1.5 group-hover:[-webkit-text-stroke-color:#85AEF1]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-xl bg-ink-950 text-swoosh-400 ring-1 ring-ink-900 transition-colors duration-500 ease-precise group-hover:bg-kaveri-600 group-hover:text-white">
        <span aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60" />
        <Icon
          aria-hidden="true"
          strokeWidth={1.6}
          className={cn(
            "relative h-6 w-6 transition-transform duration-700 ease-precise motion-reduce:transform-none",
            iconGesture[index % iconGesture.length],
          )}
        />
      </div>

      <h3 className="relative mt-8 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950">
        {pillar.title}
      </h3>
      <p className="relative mt-3 text-[15px] leading-relaxed text-steel-600">{pillar.description}</p>

      <div className="relative mt-auto pt-8">
        <ul className="flex flex-wrap gap-1.5 border-t border-dashed border-steel-200 pt-4">
          {pillar.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[5px] bg-steel-100 px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-steel-500 ring-1 ring-inset ring-steel-200/70 transition-colors duration-500 group-hover:bg-kaveri-50 group-hover:text-kaveri-700 group-hover:ring-kaveri-100"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
