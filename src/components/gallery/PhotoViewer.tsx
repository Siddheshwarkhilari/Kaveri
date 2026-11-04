import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m, useReducedMotion, type PanInfo, type Variants } from "motion/react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import WordReveal from "@/components/motion/WordReveal";
import { ControlButton } from "@/components/ui/control-button";
import { categoryOf, gallerySrcSet, type GalleryPhoto } from "@/data/gallery";
import { company } from "@/data/site";
import { useDialog } from "@/hooks/use-dialog";
import { swipeDirection } from "@/lib/gestures";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import GalleryImage from "./GalleryImage";

const VIEWER_SIZES = "(min-width: 1280px) calc(100vw - 540px), (min-width: 1024px) calc(100vw - 440px), 100vw";
const ZOOM = 2.2;
// While zoomed the photo is drawn at more than twice its size, so ask for the sharpest copy.
const ZOOMED_SIZES = `${ZOOM * 100}vw`;

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: `${direction * 6}%`, scale: 0.98 }),
  center: { opacity: 1, x: "0%", scale: 1, transition: { duration: 0.6, ease: ease.out } },
  exit: (direction: number) => ({ opacity: 0, x: `${direction * -5}%`, scale: 0.98, transition: { duration: 0.3, ease: ease.in } }),
};

const counterVariants: Variants = {
  enter: (direction: number) => ({ y: direction >= 0 ? "100%" : "-100%" }),
  center: { y: "0%", transition: { duration: 0.45, ease: ease.out } },
  exit: (direction: number) => ({ y: direction >= 0 ? "-100%" : "100%", transition: { duration: 0.3, ease: ease.in } }),
};

const infoVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: ease.in } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.65, ease: ease.out } },
};

const pad = (value: number) => String(value).padStart(2, "0");

interface PhotoViewerProps {
  /** The photos being browsed: the active collection, in gallery order. */
  photos: GalleryPhoto[];
  index: number;
  direction: number;
  onNavigate: (id: string, direction: number) => void;
  onClose: () => void;
}

/**
 * Full-screen photo viewer: the photo as large as the screen allows on a dark stage, with
 * its caption, position in the collection, thumbnails, previous/next (buttons, arrow keys
 * or swipe) and a click-to-zoom loupe. Swipe down or press Escape to close.
 */
export default function PhotoViewer({ photos, index, direction, onNavigate, onClose }: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const zoomedRef = useRef(zoomed);
  zoomedRef.current = zoomed;
  const photo = photos[index];
  const photoIdRef = useRef(photo.id);
  photoIdRef.current = photo.id;
  const previous = index > 0 ? photos[index - 1] : null;
  const next = index < photos.length - 1 ? photos[index + 1] : null;
  const { label: categoryLabel, icon: CategoryIcon } = categoryOf(photo.category);

  // Escape steps out of the zoom first; closing hands focus to the photo last viewed.
  useDialog(dialogRef, () => (zoomedRef.current ? setZoomed(false) : onClose()), {
    returnFocusTo: () => document.querySelector<HTMLElement>(`[data-gallery-photo="${photoIdRef.current}"]`),
  });

  useEffect(() => setZoomed(false), [photo.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const go = (target: GalleryPhoto | null | undefined, step: number) => {
        if (!target || target.id === photo.id) return;
        event.preventDefault();
        onNavigate(target.id, step);
      };
      if (event.key === "ArrowRight") go(next, 1);
      if (event.key === "ArrowLeft") go(previous, -1);
      if (event.key === "Home") go(photos[0], -1);
      if (event.key === "End") go(photos[photos.length - 1], 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [photo.id, photos, next, previous, onNavigate]);

  // Fetch the neighbours ahead of time so browsing feels instant.
  useEffect(() => {
    for (const neighbour of [previous, next]) {
      if (!neighbour) continue;
      const image = new Image();
      image.sizes = VIEWER_SIZES;
      image.srcset = gallerySrcSet(neighbour);
    }
  }, [previous, next]);

  const goPrevious = () => previous && onNavigate(previous.id, -1);
  const goNext = () => next && onNavigate(next.id, 1);

  return createPortal(
    <div className="fixed inset-0 z-[60]" data-testid="modal-gallery">
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 flex sm:p-4 lg:p-6 xl:p-8">
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-viewer-title"
          aria-describedby="gallery-viewer-description"
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.25, ease: ease.in } }}
          transition={{ duration: 0.5, ease: ease.out }}
          className="pointer-events-auto relative mx-auto flex h-[100dvh] w-full max-w-[1680px] flex-col overflow-hidden bg-ink-950 text-white outline-none sm:h-full sm:rounded-[28px] sm:shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)] sm:ring-1 sm:ring-white/10 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[auto_minmax(0,1fr)_auto] xl:grid-cols-[minmax(0,1fr)_380px]"
        >
          {/* The information column's surface on wide screens */}
          <div aria-hidden="true" className="relative isolate hidden border-l border-white/10 bg-ink-900/40 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:block">
            <div className="bg-blueprint absolute inset-0 -z-10 opacity-70" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_45%_at_100%_0%,rgba(27,187,255,0.12),transparent_65%)]" />
          </div>

          {/* Top bar: position, collection, zoom and close */}
          <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:col-start-2 lg:row-start-1 lg:border-b lg:border-white/10 lg:px-7 lg:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <p className="shrink-0 whitespace-nowrap font-mono text-[12px] tracking-[0.14em] text-white/45" data-testid="text-viewer-counter">
                <span className="sr-only">Photo </span>
                <span className="relative inline-flex overflow-hidden align-bottom text-white">
                  <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                    <m.span key={index} custom={direction} variants={counterVariants} initial="enter" animate="center" exit="exit" className="inline-block">
                      {pad(index + 1)}
                    </m.span>
                  </AnimatePresence>
                </span>
                <span aria-hidden="true"> / </span>
                <span className="sr-only"> of </span>
                {pad(photos.length)}
              </p>
              <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-swoosh-300 ring-1 ring-inset ring-white/10">
                <CategoryIcon aria-hidden="true" className="h-3 w-3 shrink-0" strokeWidth={1.8} />
                {categoryLabel}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <ControlButton
                label={zoomed ? "Zoom out" : "Zoom in"}
                onClick={() => setZoomed((value) => !value)}
                testId="button-viewer-zoom"
                className={cn("sm:h-11 sm:w-11", zoomed && "bg-white/10 text-white")}
              >
                {zoomed ? <ZoomOut /> : <ZoomIn />}
              </ControlButton>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close viewer"
                data-autofocus
                data-testid="button-close-gallery-modal"
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-950 transition duration-300 ease-precise hover:rotate-90 hover:bg-swoosh-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 motion-reduce:hover:rotate-0 sm:h-11 sm:w-11"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <ViewerStage
            photo={photo}
            direction={direction}
            zoomed={zoomed}
            onZoomChange={setZoomed}
            onSwipe={(swipe) => (swipe > 0 ? goNext() : goPrevious())}
            onClose={onClose}
          >
            <StageArrow side="left" label={previous ? `Previous photo: ${previous.title}` : "No previous photo"} disabled={!previous} onClick={goPrevious} />
            <StageArrow side="right" label={next ? `Next photo: ${next.title}` : "No next photo"} disabled={!next} onClick={goNext} />
          </ViewerStage>

          {/* Caption */}
          <div className="relative max-h-[30vh] min-h-0 overflow-y-auto overscroll-contain px-4 pb-1 pt-4 [scrollbar-color:rgba(255,255,255,0.18)_transparent] [scrollbar-width:thin] sm:px-6 lg:col-start-2 lg:row-start-2 lg:max-h-none lg:px-7 lg:py-8">
            <AnimatePresence mode="wait">
              <m.div key={photo.id} variants={infoVariants} initial="hidden" animate="visible" exit="exit">
                <m.p variants={itemVariants} className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 lg:block">
                  {company.name} · Gallery
                </m.p>
                <h2
                  id="gallery-viewer-title"
                  className="font-display text-[1.55rem] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[1.9rem] lg:mt-4 lg:text-[2.3rem]"
                  data-testid="text-viewer-title"
                >
                  <WordReveal text={photo.title} variants={wordVariants} />
                </h2>
                <m.p
                  variants={itemVariants}
                  id="gallery-viewer-description"
                  className="mt-2.5 text-[15px] leading-relaxed text-white/70 sm:text-[16px] lg:mt-4 lg:text-[17px]"
                  data-testid="text-gallery-modal-description"
                >
                  {photo.description}
                </m.p>
              </m.div>
            </AnimatePresence>
            <p className="sr-only" aria-live="polite">
              Photo {index + 1} of {photos.length}: {photo.title}
            </p>
          </div>

          {/* Thumbnails and browsing */}
          <div className="relative px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-5 lg:col-start-2 lg:row-start-3 lg:border-t lg:border-white/10 lg:px-7 lg:py-6">
            <div className="flex items-center gap-3">
              <ControlButton
                label={previous ? `Previous photo: ${previous.title}` : "No previous photo"}
                onClick={goPrevious}
                disabled={!previous}
                testId="button-prev-photo"
                className="shrink-0 lg:hidden"
              >
                <ChevronLeft />
              </ControlButton>
              <Thumbnails photos={photos} index={index} onSelect={(i) => onNavigate(photos[i].id, i > index ? 1 : -1)} />
              <ControlButton
                label={next ? `Next photo: ${next.title}` : "No next photo"}
                onClick={goNext}
                disabled={!next}
                testId="button-next-photo"
                className="shrink-0 lg:hidden"
              >
                <ChevronRight />
              </ControlButton>
            </div>
            <p aria-hidden="true" className="mt-5 hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/35 lg:flex">
              <kbd className="grid h-6 min-w-6 place-items-center rounded-md bg-white/[0.06] px-1.5 text-white/60 ring-1 ring-white/10">←</kbd>
              <kbd className="grid h-6 min-w-6 place-items-center rounded-md bg-white/[0.06] px-1.5 text-white/60 ring-1 ring-white/10">→</kbd>
              Browse
              <kbd className="ml-3 grid h-6 place-items-center rounded-md bg-white/[0.06] px-1.5 text-white/60 ring-1 ring-white/10">Esc</kbd>
              Close
            </p>
          </div>
        </m.div>
      </div>
    </div>,
    document.body,
  );
}

interface ViewerStageProps {
  photo: GalleryPhoto;
  direction: number;
  zoomed: boolean;
  onZoomChange: (zoomed: boolean) => void;
  onSwipe: (direction: -1 | 1) => void;
  onClose: () => void;
  children: ReactNode;
}

/**
 * The dark stage. The photo is fitted whole (sized from its aspect ratio with container
 * units, so the frame hugs the picture). Click or tap to zoom where you point, move to look
 * around, swipe sideways to browse or down to close; a click on the empty stage closes.
 */
function ViewerStage({ photo, direction, zoomed, onZoomChange, onSwipe, onClose, children }: ViewerStageProps) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef("mouse");
  const panned = useRef(false);
  const aimed = useRef(false);
  const ratio = photo.image.width / photo.image.height;

  // While a photo slides out its replacement is already mounted, so the zoom layer is
  // looked up from the photo being pointed at rather than kept in a single ref.
  const aim = (event: ReactMouseEvent<HTMLElement>) => {
    const layer = event.currentTarget.querySelector<HTMLElement>("[data-zoom-layer]");
    if (!layer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    layer.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    aimed.current = true;
  };

  // Zooming from the toolbar (or the keyboard) magnifies the centre.
  useEffect(() => {
    if (zoomed && !aimed.current) {
      const layers = stageRef.current?.querySelectorAll<HTMLElement>("[data-zoom-layer]");
      layers?.[layers.length - 1]?.style.setProperty("transform-origin", "50% 50%");
    }
    aimed.current = false;
  }, [zoomed]);

  const onPanEnd = (_event: PointerEvent, info: PanInfo) => {
    if (zoomed) return;
    const { x, y } = info.offset;
    if (y > 110 && y > Math.abs(x) * 1.2) return onClose();
    const swipe = swipeDirection(info);
    if (swipe !== 0) onSwipe(swipe);
  };

  return (
    <div className="relative min-h-0 flex-1 lg:col-start-1 lg:row-span-3 lg:row-start-1">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(27,187,255,0.06),transparent_70%)]" />
      <m.div
        ref={stageRef}
        onPanStart={() => {
          panned.current = true;
        }}
        onPanEnd={onPanEnd}
        onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
          pointerType.current = event.pointerType;
          panned.current = false;
        }}
        onClick={(event) => {
          // A click on the bare stage (with a mouse) closes, like clicking outside a dialog.
          const onPhoto = (event.target as HTMLElement).closest("[data-viewer-photo]");
          if (!onPhoto && !panned.current && pointerType.current === "mouse") onClose();
        }}
        className="absolute inset-0 touch-none px-3 pb-3 sm:px-6 sm:pb-6 lg:p-8 xl:p-12"
        data-testid="viewer-stage"
      >
        <div className="relative h-full w-full [container-type:size]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <m.div
              key={photo.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              data-viewer-photo
              onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
                if (zoomed && event.pointerType === "mouse") aim(event);
              }}
              onClick={(event) => {
                if (panned.current) return;
                if (!zoomed) aim(event);
                onZoomChange(!zoomed);
              }}
              className={cn(
                "absolute inset-0 m-auto overflow-hidden rounded-xl bg-ink-900 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:rounded-2xl",
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
              )}
              style={{ width: `min(100cqw, ${ratio * 100}cqh)`, height: `min(100cqh, ${100 / ratio}cqw)` }}
              data-testid="viewer-photo"
            >
              <div
                data-zoom-layer
                className={cn("absolute inset-0 transition-transform ease-precise", reduceMotion ? "duration-0" : "duration-500")}
                style={{ transform: zoomed ? `scale(${ZOOM})` : undefined }}
              >
                <GalleryImage photo={photo} sizes={zoomed ? ZOOMED_SIZES : VIEWER_SIZES} priority />
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 ring-1 ring-white/10 backdrop-blur transition-opacity duration-300 sm:bottom-8 lg:bottom-12",
            zoomed && "opacity-0",
          )}
        >
          <ZoomIn className="h-3 w-3 text-swoosh-300" />
          <span className="[@media(hover:none)]:hidden">Click to zoom</span>
          <span className="hidden [@media(hover:none)]:inline">Tap to zoom · Swipe to browse</span>
        </span>
      </m.div>
      {children}
    </div>
  );
}

interface StageArrowProps {
  side: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
}

/** Large previous/next buttons at the stage's edges on wide screens. */
function StageArrow({ side, label, disabled, onClick }: StageArrowProps) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      data-testid={side === "left" ? "button-stage-prev-photo" : "button-stage-next-photo"}
      className={cn(
        "group absolute top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-white ring-1 ring-white/15 backdrop-blur-md transition duration-300 ease-precise hover:bg-white hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 disabled:pointer-events-none disabled:opacity-0 lg:grid",
        side === "left" ? "left-5" : "right-5",
      )}
    >
      <Icon
        className={cn(
          "h-6 w-6 transition-transform duration-300 ease-precise",
          side === "left" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
      />
    </button>
  );
}

interface ThumbnailsProps {
  photos: GalleryPhoto[];
  index: number;
  onSelect: (index: number) => void;
}

/** Every photo in the collection: a strip on small screens, a grid in the side panel. */
function Thumbnails({ photos, index, onSelect }: ThumbnailsProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the current photo's thumbnail in view within the strip.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.children[index] as HTMLElement | undefined;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2, behavior: "smooth" });
  }, [index]);

  return (
    <ul
      ref={listRef}
      aria-label="All photos in this collection"
      className="relative -my-1 flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] lg:my-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:py-0 [&::-webkit-scrollbar]:hidden"
      data-testid="viewer-thumbnails"
    >
      {photos.map((item, i) => {
        const active = i === index;
        return (
          <li key={item.id} className="shrink-0 px-0.5 first:pl-1 last:pr-1 lg:p-0">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show photo ${i + 1}: ${item.title}`}
              aria-current={active ? "true" : undefined}
              data-testid={`thumb-gallery-${item.id}`}
              className={cn(
                "relative block aspect-[3/2] w-16 overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 sm:w-20 lg:w-full",
                active ? "opacity-100" : "opacity-45 hover:opacity-90",
              )}
            >
              <img
                src={item.image.thumb}
                alt=""
                width={320}
                height={213}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover"
                style={{ objectPosition: item.focus }}
              />
              {active && (
                <m.span
                  layoutId="viewer-thumbnail-active"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg ring-2 ring-inset ring-swoosh-400"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
