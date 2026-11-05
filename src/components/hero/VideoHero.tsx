import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion, type PanInfo } from "motion/react";
import type { HeroSlide } from "@/data/heroSlides";
import { swipeDirection } from "@/lib/gestures";
import { duration, ease } from "@/lib/motion";
import HeroPalette from "./HeroPalette";

/** Respect reduced-motion and data-saver preferences before the first play. */
function canAutoplay(): boolean {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface VideoHeroProps {
  slides: HeroSlide[];
}

/**
 * Video hero. Videos play in a wide stage sized to fit the first screen, and the copy and
 * controls for the active slide render in a slim palette directly underneath.
 * Only the active video plays; the next one is fetched once the current one can play.
 */
export default function VideoHero({ slides }: VideoHeroProps) {
  const count = slides.length;
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(canAutoplay);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState<boolean[]>(() => slides.map(() => false));
  const [failed, setFailed] = useState<boolean[]>(() => slides.map(() => false));
  const [requested, setRequested] = useState<ReadonlySet<number>>(() => new Set([0]));

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const shouldPlay = playing && inView && pageVisible;

  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  const request = useCallback((index: number) => {
    setRequested((current) => (current.has(index) ? current : new Set(current).add(index)));
  }, []);

  const markReady = (index: number) =>
    setReady((current) => (current[index] ? current : current.map((v, i) => (i === index ? true : v))));
  const markFailed = (index: number) =>
    setFailed((current) => (current[index] ? current : current.map((v, i) => (i === index ? true : v))));

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  // Load the active video now; warm up the next one once the active one can play.
  useEffect(() => {
    request(active);
  }, [active, request]);

  useEffect(() => {
    if (ready[active] && count > 1) request((active + 1) % count);
  }, [active, ready, count, request]);

  // Every slide starts its video from the beginning.
  useEffect(() => {
    const video = videoRefs.current[active];
    if (video && video.readyState > 0) video.currentTime = 0;
  }, [active]);

  // Only the active video ever plays.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && shouldPlay) {
        video.play().catch((error: unknown) => {
          // Autoplay blocked (for example in low-power mode): fall back to paused.
          if (error instanceof DOMException && error.name === "NotAllowedError") setPlaying(false);
        });
      } else {
        video.pause();
      }
    });
  }, [active, shouldPlay, requested]);

  // Pause when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onPanEnd = (_event: PointerEvent, info: PanInfo) => {
    const direction = swipeDirection(info);
    if (count < 2 || direction === 0) return;
    if (direction > 0) next();
    else prev();
  };

  const status = failed[active] ? "failed" : ready[active] ? "ready" : "loading";

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Kaveri GS Automech highlights"
      className="bg-white p-3 sm:p-4"
      data-testid="hero"
    >
      {/* On phones the navbar pills sit in the frame's top band; from md up they float over the video. */}
      <div className="max-w-hero relative mx-auto flex flex-col overflow-hidden rounded-[20px] bg-ink-950 pt-[88px] shadow-[0_40px_90px_-50px_rgba(5,11,23,0.7)] ring-1 ring-ink-950/10 sm:rounded-[28px] md:pt-0">
        {/*
          The footage's own 16:9 shape on phones and tablets; a wide letterbox from lg up. The height cap
          leaves room for the palette on the first screen. Where this trims the video, it keeps the middle,
          where the part sits, so the part clears the palette. The mostly empty top is what gets hidden.
        */}
        <m.div
          onPanEnd={onPanEnd}
          className="relative aspect-video max-h-[calc(100svh-7rem)] w-full touch-pan-y select-none overflow-hidden bg-ink-900 bg-blueprint lg:aspect-[21/9]"
        >
          {slides.map((slide, i) => {
            const visible = i === active && (ready[i] || Boolean(slide.video.poster));
            return (
              <m.div
                key={slide.id}
                aria-hidden="true"
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.8, ease: ease.out }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={requested.has(i) ? slide.video.src : undefined}
                  poster={slide.video.poster}
                  preload={requested.has(i) ? "auto" : "none"}
                  muted
                  playsInline
                  loop={count === 1}
                  tabIndex={-1}
                  className="h-full w-full object-cover object-[50%_50%]"
                  onLoadedData={() => markReady(i)}
                  onError={() => markFailed(i)}
                  onEnded={() => {
                    if (i === active && count > 1) next();
                  }}
                />
              </m.div>
            );
          })}

          <AnimatePresence>
            {status !== "ready" && (
              <m.div
                key={status}
                className="absolute inset-0 grid place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: status === "loading" ? 0.4 : 0, duration: duration.ui } }}
                exit={{ opacity: 0, transition: { duration: duration.ui } }}
              >
                <div className="flex items-center gap-3 rounded-full bg-ink-950/60 px-4 py-2 ring-1 ring-white/10 backdrop-blur-md">
                  {status === "loading" && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-swoosh-400" />
                  )}
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                    {status === "loading" ? "Loading footage" : "Footage unavailable"}
                  </span>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>

        <HeroPalette
          slides={slides}
          active={active}
          playing={playing}
          onPrev={prev}
          onNext={next}
          onTogglePlay={() => setPlaying((p) => !p)}
        />
      </div>
    </section>
  );
}
