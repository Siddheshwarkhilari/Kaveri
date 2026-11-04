import { useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/sections/SectionHeading";
import { about } from "@/data/about";
import { photoSrcSet } from "@/lib/media";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Diagram node positions (percent of the square), in the same reading order as the 2×2 list. */
const NODES = [
  { x: 22, y: 22, label: "top" },
  { x: 78, y: 22, label: "top" },
  { x: 22, y: 78, label: "bottom" },
  { x: 78, y: 78, label: "bottom" },
] as const;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: 0.3 + i * 0.15, duration: 0.9, ease: ease.inOut }, opacity: { delay: 0.3 + i * 0.15, duration: 0.2 } },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: 0.2 + i * 0.15, duration: 0.6, ease: ease.out } }),
};

/**
 * Chakan, Pune: the location copy and its four stated advantages, an abstract
 * proximity diagram (not a map) linking them to the site, and the shop floor below.
 */
export default function LocationPanel() {
  const { label, title, body, advantages, photo, caption } = about.location;
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section
      aria-labelledby="location-title"
      className="bg-[linear-gradient(to_bottom,#F5F7FA_50%,#ffffff_50%)] p-3 sm:p-4"
      data-testid="section-location"
    >
      <div className="relative isolate overflow-hidden rounded-[22px] bg-ink-950 text-white ring-1 ring-ink-950/10 sm:rounded-[28px]">
        <div
          aria-hidden="true"
          className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,#000_30%,transparent_80%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_75%_30%,rgba(27,187,255,0.12),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgba(18,81,192,0.2),transparent_70%)]"
        />
        <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 sm:px-10 lg:px-12 lg:pt-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <m.div
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-6"
            >
              <SectionHeading id="location-title" label={label} title={title} size="lg" tone="dark" />
              <m.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                {body}
              </m.p>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {advantages.map(({ icon: Icon, title: name, body: detail }, i) => (
                  <m.li
                    key={name}
                    variants={fadeUp}
                    onPointerEnter={() => setActive(i)}
                    onPointerLeave={() => setActive(null)}
                    className={cn(
                      "group flex items-start gap-4 rounded-2xl p-4 ring-1 ring-inset transition-colors duration-300",
                      active === i ? "bg-white/[0.07] ring-swoosh-400/30" : "bg-white/[0.03] ring-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset transition-colors duration-300",
                        active === i ? "bg-kaveri-600 text-white ring-kaveri-500" : "bg-white/[0.06] text-swoosh-300 ring-white/10",
                      )}
                    >
                      <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[15px] font-semibold text-white">{name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/55">{detail}</span>
                    </span>
                  </m.li>
                ))}
              </ul>
            </m.div>

            <div className="lg:col-span-6">
              <ProximityDiagram labels={advantages.map((a) => a.short)} active={active} onActive={setActive} />
            </div>
          </div>
        </div>

        {/* The shop floor, framed as a wide strip at the foot of the panel */}
        <div ref={photoRef} className="relative mt-16 aspect-[16/10] overflow-hidden sm:aspect-[21/9] lg:mt-24">
          <m.img
            src={photo.large}
            srcSet={photoSrcSet(photo)}
            sizes="100vw"
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            style={{ y: photoY, scale: 1.18 }}
            className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ink-950 via-ink-950/50 to-transparent" />
          <p className="absolute bottom-4 left-4 rounded-full bg-ink-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 ring-1 ring-white/10 backdrop-blur sm:bottom-6 sm:left-6">
            {caption}
          </p>
        </div>
      </div>
    </section>
  );
}

interface ProximityDiagramProps {
  labels: string[];
  active: number | null;
  onActive: (index: number | null) => void;
}

/** Abstract hub-and-spoke diagram: the site at the centre, linked to each stated advantage. */
function ProximityDiagram({ labels, active, onActive }: ProximityDiagramProps) {
  const reduceMotion = useReducedMotion();
  const animation = reduceMotion
    ? { initial: false as const }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.4 } };

  return (
    <m.div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[30rem]" {...animation}>
      <svg viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full">
        {[70, 130, 190].map((r, i) => (
          <m.circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="3 6"
            variants={fadeIn}
            custom={i}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}
        <path d="M200 0V400M0 200H400" stroke="rgba(255,255,255,0.06)" />

        {NODES.map((node, i) => (
          <m.line
            key={i}
            x1="200"
            y1="200"
            x2={node.x * 4}
            y2={node.y * 4}
            variants={draw}
            custom={i}
            stroke={active === i ? "#1BBBFF" : "rgba(255,255,255,0.22)"}
            strokeWidth={active === i ? 1.6 : 1}
            className="transition-[stroke,stroke-width] duration-300"
          />
        ))}

        {NODES.map((node, i) => (
          <m.g key={i} variants={fadeIn} custom={i + 1} style={{ transformOrigin: `${node.x * 4}px ${node.y * 4}px` }}>
            <circle
              cx={node.x * 4}
              cy={node.y * 4}
              r={active === i ? 16 : 11}
              fill={active === i ? "rgba(27,187,255,0.15)" : "rgba(255,255,255,0.04)"}
              stroke={active === i ? "rgba(27,187,255,0.6)" : "rgba(255,255,255,0.18)"}
              className="transition-all duration-300"
            />
            <circle cx={node.x * 4} cy={node.y * 4} r="4" fill={active === i ? "#1BBBFF" : "rgba(255,255,255,0.7)"} />
          </m.g>
        ))}

        {/* Site marker, with a two-beat pulse when the diagram first appears */}
        {!reduceMotion && (
          <m.circle
            cx="200"
            cy="200"
            r="14"
            stroke="#1BBBFF"
            strokeWidth="1.5"
            style={{ transformOrigin: "200px 200px" }}
            variants={{
              hidden: { opacity: 0, scale: 1 },
              visible: { opacity: [0, 0.8, 0], scale: [1, 2.6, 3], transition: { delay: 0.9, duration: 1.8, repeat: 1, ease: "easeOut" } },
            }}
          />
        )}
        <circle cx="200" cy="200" r="22" fill="rgba(18,81,192,0.35)" stroke="rgba(27,187,255,0.5)" />
        <circle cx="200" cy="200" r="7" fill="#1BBBFF" />
      </svg>

      <div className="absolute left-1/2 top-1/2 mt-9 -translate-x-1/2 whitespace-nowrap text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white ring-1 ring-white/15">
          <MapPin className="h-3 w-3 text-swoosh-400" />
          Chakan, Pune
        </span>
      </div>

      {NODES.map((node, i) => (
        <div
          key={i}
          onPointerEnter={() => onActive(i)}
          onPointerLeave={() => onActive(null)}
          className={cn(
            "absolute -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ring-1 transition-colors duration-300",
            node.label === "top" ? "-translate-y-[calc(100%+1.25rem)]" : "translate-y-5",
            active === i ? "bg-swoosh-400/15 text-swoosh-300 ring-swoosh-400/40" : "bg-ink-900/80 text-white/60 ring-white/10",
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {labels[i]}
        </div>
      ))}
    </m.div>
  );
}
