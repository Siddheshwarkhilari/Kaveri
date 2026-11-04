import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { AnimatePresence, m, useReducedMotion, type PanInfo, type Variants } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Mail, Phone, X, ZoomIn } from "lucide-react";
import WordReveal from "@/components/motion/WordReveal";
import { buttonVariants } from "@/components/ui/button";
import { ControlButton } from "@/components/ui/control-button";
import { about } from "@/data/about";
import { productSrcSet, type CatalogueProduct } from "@/data/products";
import { company } from "@/data/site";
import { useDialog } from "@/hooks/use-dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { swipeDirection } from "@/lib/gestures";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const imageVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: `${direction * 8}%`, scale: 1.04 }),
  center: { opacity: 1, x: "0%", scale: 1, transition: { duration: 0.7, ease: ease.out } },
  exit: (direction: number) => ({ opacity: 0, x: `${direction * -6}%`, scale: 0.98, transition: { duration: 0.35, ease: ease.in } }),
};

const infoVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: ease.in } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: ease.out } },
};

const cornerMarks = [
  "-left-3 -top-3 border-l border-t",
  "-right-3 -top-3 border-r border-t",
  "-bottom-3 -left-3 border-b border-l",
  "-bottom-3 -right-3 border-b border-r",
];

interface ProductDetailModalProps {
  product: CatalogueProduct;
  previous: CatalogueProduct | null;
  next: CatalogueProduct | null;
  direction: number;
  onNavigate: (id: string, direction: 1 | -1) => void;
  onClose: () => void;
}

/**
 * Product detail view: a large studio presentation of the photo (with zoom) beside a
 * dark information panel, previous/next browsing and an enquiry that carries the
 * product's name to the contact form. Full-screen sheet on phones.
 */
export default function ProductDetailModal({ product, previous, next, direction, onNavigate, onClose }: ProductDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const sheet = !useMediaQuery("(min-width: 640px)");
  useDialog(dialogRef, onClose);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && next) onNavigate(next.id, 1);
      if (event.key === "ArrowLeft" && previous) onNavigate(previous.id, -1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [next, previous, onNavigate]);

  const enquiryHref = `/contact?product=${encodeURIComponent(product.name)}`;
  const emailHref = `${company.email.href}?subject=${encodeURIComponent(`Product enquiry: ${product.name}`)}`;

  return createPortal(
    <div className="fixed inset-0 z-[60]" data-testid="modal-product">
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center sm:items-center sm:p-6 lg:p-10">
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-dialog-title"
          aria-describedby="product-dialog-description"
          tabIndex={-1}
          initial={sheet ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 16 }}
          animate={sheet ? { y: "0%" } : { opacity: 1, scale: 1, y: 0 }}
          exit={
            sheet
              ? { y: "100%", transition: { duration: 0.32, ease: ease.in } }
              : { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.22, ease: ease.in } }
          }
          transition={{ duration: 0.5, ease: ease.out }}
          className="pointer-events-auto relative flex h-[100dvh] w-full flex-col overflow-hidden bg-ink-950 outline-none sm:h-auto sm:max-h-[min(92vh,860px)] sm:max-w-3xl sm:rounded-[28px] sm:shadow-[0_60px_120px_-40px_rgba(5,11,23,0.8)] sm:ring-1 sm:ring-white/10 lg:h-[min(86vh,740px)] lg:max-w-6xl lg:flex-row"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            data-autofocus
            data-testid="button-close-modal"
            className="absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full bg-ink-950/75 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 sm:right-4 sm:top-4"
          >
            <X className="h-5 w-5" />
          </button>

          <ProductVisual
            product={product}
            direction={direction}
            onSwipe={(swipe) => {
              if (swipe > 0 && next) onNavigate(next.id, 1);
              if (swipe < 0 && previous) onNavigate(previous.id, -1);
            }}
          />

          {/* Information panel */}
          <div className="relative isolate flex min-h-0 flex-1 flex-col text-white lg:w-[43%] lg:flex-none">
            <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-70" />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_100%_0%,rgba(27,187,255,0.12),transparent_60%)]"
            />

            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-3.5 lg:px-8 lg:pr-20 lg:pt-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">Product details</p>
              <div className="flex items-center gap-2">
                <ControlButton
                  label={previous ? `Previous product: ${previous.name}` : "No previous product"}
                  onClick={() => previous && onNavigate(previous.id, -1)}
                  disabled={!previous}
                  testId="button-prev-product"
                >
                  <ChevronLeft />
                </ControlButton>
                <ControlButton
                  label={next ? `Next product: ${next.name}` : "No next product"}
                  onClick={() => next && onNavigate(next.id, 1)}
                  disabled={!next}
                  testId="button-next-product"
                >
                  <ChevronRight />
                </ControlButton>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7 [scrollbar-color:rgba(255,255,255,0.18)_transparent] [scrollbar-width:thin] lg:px-8 lg:py-9">
              <AnimatePresence mode="wait" initial>
                <m.div key={product.id} variants={infoVariants} initial="hidden" animate="visible" exit="exit">
                  <m.p variants={itemVariants} className="font-mono text-[11px] uppercase tracking-[0.18em] text-swoosh-300">
                    {company.name} · Catalogue
                  </m.p>
                  <h2
                    id="product-dialog-title"
                    className="mt-4 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[2.4rem]"
                    data-testid="text-modal-product-name"
                  >
                    <WordReveal text={product.name} variants={wordVariants} />
                  </h2>
                  <m.p
                    variants={itemVariants}
                    id="product-dialog-description"
                    className="mt-4 text-[17px] leading-relaxed text-white/70"
                    data-testid="text-modal-product-description"
                  >
                    {product.description}
                  </m.p>

                  <m.div variants={itemVariants} className="mt-8 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-inset ring-white/10">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">How we supply</p>
                    <ul className="mt-4 space-y-3">
                      {about.approach.principles.map(({ icon: Icon, title }) => (
                        <li key={title} className="flex items-center gap-3 text-[14.5px] text-white/85">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-swoosh-300 ring-1 ring-inset ring-white/10">
                            <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                          </span>
                          {title}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                </m.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 bg-ink-950/90 px-6 py-5 backdrop-blur lg:px-8">
              <p className="text-[13.5px] text-white/55">Interested in this part? Send an enquiry with its name already filled in.</p>
              <div className="mt-3.5 flex gap-2.5">
                <Link
                  href={enquiryHref}
                  className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group flex-1")}
                  data-testid="button-enquire-product"
                >
                  <span>
                    Enquire<span className="max-[419px]:sr-only"> about this product</span>
                  </span>
                  <ArrowRight className="transition-transform duration-300 ease-precise group-hover:translate-x-1" />
                </Link>
                <a
                  href={emailHref}
                  className={cn(buttonVariants({ variant: "glass", size: "xl" }), "group")}
                  data-testid="link-email-enquiry"
                >
                  <Mail className="transition-transform duration-300 ease-precise group-hover:-rotate-12" />
                  Email
                </a>
              </div>
              <a
                href={company.phone.href}
                className="mt-3 inline-flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                Or call {company.phone.display}
              </a>
            </div>
          </div>
        </m.div>
      </div>
    </div>,
    document.body,
  );
}

interface ProductVisualProps {
  product: CatalogueProduct;
  direction: number;
  onSwipe: (direction: -1 | 1) => void;
}

/**
 * The photo on a graph-paper stage. With a mouse, hovering magnifies the part under the
 * pointer; on touch, a tap toggles the same zoom and a swipe moves between products.
 */
function ProductVisual({ product, direction, onSwipe }: ProductVisualProps) {
  const reduceMotion = useReducedMotion();
  const zoomRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef("mouse");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => setZoomed(false), [product.id]);

  const aimZoom = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = zoomRef.current;
    if (!target) return;
    const rect = event.currentTarget.getBoundingClientRect();
    target.style.transformOrigin = `${((event.clientX - rect.left) / rect.width) * 100}% ${((event.clientY - rect.top) / rect.height) * 100}%`;
  };

  const onPanEnd = (_event: PointerEvent, info: PanInfo) => {
    if (zoomed) return;
    const swipe = swipeDirection(info);
    if (swipe !== 0) onSwipe(swipe);
  };

  return (
    <div className="relative shrink-0 overflow-hidden bg-steel-50 lg:flex lg:w-[57%] lg:flex-none lg:items-center">
      <div aria-hidden="true" className="bg-blueprint-light absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_55%,rgba(18,81,192,0.12),transparent_70%)]"
      />

      <div className="relative w-full px-6 pb-7 pt-16 sm:px-10 sm:pb-8 sm:pt-14 lg:p-12">
        {/* Between phone and desktop the stacked layout caps the photo so the details keep room. */}
        <div className="relative sm:mx-auto sm:max-w-[26rem] lg:max-w-none">
          {cornerMarks.map((position) => (
            <span key={position} aria-hidden="true" className={`absolute hidden h-4 w-4 border-ink-900/25 lg:block ${position}`} />
          ))}
          <m.div
            onPanEnd={onPanEnd}
            onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
              pointerType.current = event.pointerType;
            }}
            onPointerEnter={(event: ReactPointerEvent<HTMLDivElement>) => {
              if (event.pointerType === "mouse" && !reduceMotion) setZoomed(true);
            }}
            onPointerMove={aimZoom}
            onPointerLeave={() => setZoomed(false)}
            onClick={(event) => {
              // Mice zoom on hover; touch and pen toggle the zoom with a tap.
              if (pointerType.current === "mouse") return;
              aimZoom(event);
              setZoomed((value) => !value);
            }}
            initial={reduceMotion ? false : { clipPath: "inset(100% 0% 0% 0% round 16px)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.9, ease: ease.out }}
            className={cn(
              "relative aspect-[3/2] touch-pan-y select-none overflow-hidden rounded-2xl bg-steel-100 shadow-[0_34px_60px_-32px_rgba(10,19,36,0.55),0_10px_20px_-12px_rgba(10,19,36,0.14)] ring-1 ring-ink-950/[0.06]",
              zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
            )}
            data-testid="modal-product-visual"
          >
            <div
              ref={zoomRef}
              className={cn("absolute inset-0 transition-transform duration-300 ease-out", zoomed && "scale-[1.9]")}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <m.img
                  key={product.id}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={product.image.large}
                  srcSet={productSrcSet(product)}
                  sizes="(min-width: 1024px) 640px, (min-width: 640px) 720px, 100vw"
                  width={product.image.width}
                  height={product.image.height}
                  alt={product.name}
                  draggable={false}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain"
                  data-testid="modal-product-image"
                />
              </AnimatePresence>
            </div>

            <span
              aria-hidden="true"
              className={cn(
                "absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-800 shadow-sm ring-1 ring-ink-950/[0.06] backdrop-blur transition-opacity duration-300",
                zoomed && "opacity-0",
              )}
            >
              <ZoomIn className="h-3 w-3 text-kaveri-600" />
              <span className="[@media(hover:none)]:hidden">Hover to zoom</span>
              <span className="hidden [@media(hover:none)]:inline">Tap to zoom</span>
            </span>
          </m.div>
        </div>
      </div>
    </div>
  );
}
