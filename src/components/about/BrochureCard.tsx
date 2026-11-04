import type { PointerEvent } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowDown, ExternalLink, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { about } from "@/data/about";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface BrochureCardProps {
  className?: string;
}

/**
 * The company brochure as a physical document: the real cover with its inner pages
 * fanned behind it, tilting towards the pointer. Downloads the actual PDF.
 */
export default function BrochureCard({ className }: BrochureCardProps) {
  const { title, description, href, fileName, meta, pages } = about.brochure;
  const [cover, ...innerPages] = pages;
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    tiltX.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: ease.out }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[22px] bg-ink-950 p-6 text-white shadow-[0_40px_80px_-40px_rgba(5,11,23,0.75)] ring-1 ring-white/10 sm:p-7",
        className,
      )}
      data-testid="card-brochure"
    >
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_15%_10%,rgba(27,187,255,0.14),transparent_65%)]"
      />
      <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

      {/* The wide gap leaves room for the pages fanning out on hover. */}
      <div className="relative flex flex-col gap-8 pt-2 sm:flex-row sm:items-start sm:gap-12">
        {/* Document stack */}
        <div aria-hidden="true" className="relative mx-auto h-[206px] w-[150px] shrink-0 [perspective:1100px] sm:mx-0">
          <m.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
            {innerPages
              .slice()
              .reverse()
              .map((page, i) => (
                <img
                  key={page}
                  src={page}
                  alt=""
                  width={480}
                  height={660}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "absolute inset-0 h-full w-full rounded-md object-cover shadow-lg ring-1 ring-black/20 transition-transform duration-700 ease-precise motion-reduce:transition-none",
                    i === 0
                      ? "translate-x-2.5 rotate-[6deg] group-hover:translate-x-5 group-hover:rotate-[9deg]"
                      : "translate-x-1 rotate-[3deg] group-hover:translate-x-2.5 group-hover:rotate-[4.5deg]",
                  )}
                />
              ))}
            <div className="absolute inset-0 overflow-hidden rounded-md shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/15 transition-transform duration-700 ease-precise group-hover:-translate-y-1 motion-reduce:transform-none">
              <img
                src={cover}
                alt=""
                width={720}
                height={990}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] transition-transform [transition-duration:1400ms] ease-precise group-hover:translate-x-full motion-reduce:hidden" />
            </div>
          </m.div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-swoosh-300">
            <FileText aria-hidden="true" className="h-3.5 w-3.5" />
            Download
          </p>
          <h3 className="mt-3 font-display text-[1.6rem] font-bold leading-tight tracking-[-0.02em]">{title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/60">{description}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {meta.map((item) => (
              <li
                key={item}
                className="rounded-[5px] bg-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 ring-1 ring-inset ring-white/10"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={href}
              download={fileName}
              className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group/download w-full")}
              data-testid="button-download-brochure"
            >
              <span className="relative grid h-4 w-4 place-items-center overflow-hidden">
                <ArrowDown className="transition-transform duration-500 ease-precise group-hover/download:translate-y-5" />
                <ArrowDown className="absolute -translate-y-5 transition-transform duration-500 ease-precise group-hover/download:translate-y-0" />
              </span>
              Download brochure
            </a>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "glass" }), "group/view min-h-11 w-full rounded-xl")}
              data-testid="link-view-brochure"
            >
              View PDF
              <ExternalLink className="transition-transform duration-300 ease-precise group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </m.div>
  );
}
