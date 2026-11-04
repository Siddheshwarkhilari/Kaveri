import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { m, useInView, useReducedMotion, type Variants } from "motion/react";
import SectionHeading from "@/components/sections/SectionHeading";
import { featuredProducts } from "@/data/featuredProducts";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import ProductPlate, { PLATE_SIZES, plateSrcSet } from "./ProductPlate";
import ProductRail from "./ProductRail";
import ProductTitleBlock from "./ProductTitleBlock";

const AUTOPLAY_MS = 7000;

/** The glow behind the plate drifts to a new spot for each product. */
const glowShift = ["0%", "28%", "12%", "40%", "20%"];

const boardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: ease.out } },
};

const plateReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0% 0% 0% round 16px)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { delay: 0.1, duration: 1, ease: ease.out },
    // Release the clip so the plate's shadow and corner marks show once revealed.
    transitionEnd: { clipPath: "none" },
  },
};

const blockReveal: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.9, ease: ease.out } },
};

/**
 * Homepage featured products, laid out like a drawing sheet: the product print on a
 * graph-paper board, a dark title block with its details, and a thumbnail rail.
 */
export default function FeaturedProducts() {
  const products = featuredProducts;
  const count = products.length;
  const reduceMotion = useReducedMotion() ?? false;

  const [[active, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const inView = useInView(showcaseRef, { amount: 0.35 });
  const nearView = useInView(sectionRef, { once: true, margin: "600px 0px" });

  const running = autoplay && inView && pageVisible && !hovering && !keyboardFocus;
  const product = products[active];

  const next = useCallback(() => setSlide(([current]) => [(current + 1) % count, 1]), [count]);
  const prev = useCallback(() => setSlide(([current]) => [(current - 1 + count) % count, -1]), [count]);
  const goTo = useCallback(
    (index: number) => setSlide(([current]) => (index === current ? [current, 1] : [index, index > current ? 1 : -1])),
    [],
  );

  useEffect(() => {
    if (reduceMotion) setAutoplay(false);
  }, [reduceMotion]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Warm the cache with every product photo before the section arrives, so slides never flash.
  useEffect(() => {
    if (!nearView) return;
    for (const item of products) {
      const preload = new Image();
      preload.sizes = PLATE_SIZES;
      preload.srcset = plateSrcSet(item);
    }
  }, [nearView, products]);

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.target.matches(":focus-visible")) setKeyboardFocus(true);
  };
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-title"
      className="relative overflow-hidden bg-white bg-[linear-gradient(to_bottom,#F5F7FA,#ffffff_10rem)]"
      data-testid="section-featured-products"
    >
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:px-10 lg:pb-32 lg:pt-28">
        <m.div
          variants={revealStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <SectionHeading id="featured-title" label="Highlights" title="Featured products" size="lg" className="lg:col-span-7" />
          <m.p variants={fadeUp} className="text-lg leading-relaxed text-steel-600 lg:col-span-5 lg:pb-2">
            A short selection of assemblies and components we regularly supply. See the full catalogue on the products
            page.
          </m.p>
        </m.div>

        <m.div
          ref={showcaseRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHovering(true);
          }}
          onPointerLeave={() => setHovering(false)}
          onPointerDown={(event) => {
            // A touch means the visitor has taken over; leave them in control.
            if (event.pointerType === "touch") setAutoplay(false);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          className="mt-12 grid grid-cols-1 sm:mt-14 lg:mt-16 lg:grid-cols-12"
        >
          {/* Drawing board */}
          <m.div
            aria-hidden="true"
            variants={boardReveal}
            className="relative col-span-full row-start-1 overflow-hidden rounded-[22px] bg-steel-50 ring-1 ring-steel-200/80 sm:rounded-[28px]"
          >
            <div className="bg-blueprint-light absolute inset-0" />
            <m.div
              className="absolute left-[4%] top-1/2 h-[85%] w-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(18,81,192,0.16),transparent)] blur-2xl"
              animate={{ x: reduceMotion ? "0%" : glowShift[active % glowShift.length] }}
              transition={{ duration: 1.4, ease: ease.out }}
            />
          </m.div>

          <m.div
            variants={plateReveal}
            className="relative z-10 col-start-1 row-start-1 m-4 mb-14 sm:m-8 sm:mb-16 lg:col-end-8 lg:m-10 xl:col-end-9 xl:mr-6"
          >
            <ProductPlate product={product} direction={direction} onSwipe={(d) => (d > 0 ? next() : prev())} />
          </m.div>

          <m.div
            variants={blockReveal}
            className="relative z-20 row-start-2 mx-3 -mt-10 sm:mx-8 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-3 lg:mx-0 lg:mr-6 lg:mt-28 xl:col-start-9 xl:mr-8"
          >
            <ProductTitleBlock
              products={products}
              active={active}
              autoplay={autoplay}
              running={running}
              onPrev={prev}
              onNext={next}
              onToggleAutoplay={() => setAutoplay((value) => !value)}
            />
          </m.div>

          <div className="relative row-start-3 mt-6 lg:col-start-1 lg:col-end-8 lg:row-start-2 lg:mt-6 lg:pr-6 xl:col-end-9">
            <ProductRail
              products={products}
              active={active}
              autoplay={autoplay}
              running={running}
              intervalMs={AUTOPLAY_MS}
              onSelect={goTo}
              onAutoplayEnd={next}
            />
          </div>
        </m.div>
      </div>
    </section>
  );
}
