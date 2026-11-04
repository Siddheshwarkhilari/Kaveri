import { forwardRef } from "react";
import { m, type Variants } from "motion/react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { productSrcSet, type CatalogueProduct } from "@/data/products";
import { ease } from "@/lib/motion";
import HighlightMatch from "./HighlightMatch";

const CARD_SIZES = "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 560px) 46vw, 92vw";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (column: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: column * 0.07, duration: 0.7, ease: ease.out },
  }),
};

// The photo settles from a slight zoom as its card arrives.
const photoVariants: Variants = {
  hidden: { scale: 1.08 },
  visible: (column: number) => ({ scale: 1, transition: { delay: column * 0.07, duration: 1.1, ease: ease.out } }),
};

const cornerMarks = [
  "left-2.5 top-2.5 border-l border-t",
  "right-2.5 top-2.5 border-r border-t",
  "bottom-2.5 left-2.5 border-b border-l",
  "bottom-2.5 right-2.5 border-b border-r",
];

interface ProductCardProps {
  product: CatalogueProduct;
  /** Position within its row, used to stagger the entrance. */
  column: number;
  query: string;
  onOpen: (id: string) => void;
}

/**
 * Catalogue card: a studio plate holding the uncropped photo, the name and a short
 * description. The whole card is one button that opens the product's detail view.
 */
const ProductCard = forwardRef<HTMLLIElement, ProductCardProps>(function ProductCard({ product, column, query, onOpen }, ref) {
  return (
    <m.li
      ref={ref}
      layout="position"
      custom={column}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: ease.in } }}
      transition={{ layout: { duration: 0.45, ease: ease.out } }}
    >
      <button
        type="button"
        onClick={() => onOpen(product.id)}
        aria-haspopup="dialog"
        aria-label={`View details: ${product.name}`}
        data-testid={`card-product-${product.id}`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white text-left shadow-[0_1px_2px_rgba(10,19,36,0.04),0_16px_36px_-28px_rgba(10,19,36,0.35)] ring-1 ring-steel-200 transition-[transform,box-shadow] duration-500 ease-precise hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(10,19,36,0.04),0_32px_60px_-32px_rgba(18,81,192,0.45)] hover:ring-kaveri-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 motion-reduce:hover:translate-y-0"
      >
        <span className="relative m-2.5 mb-0 block aspect-[3/2] overflow-hidden rounded-[16px] bg-steel-100 ring-1 ring-inset ring-ink-950/[0.04]">
          <span className="absolute inset-0 transition-transform [transition-duration:900ms] ease-precise group-hover:scale-[1.06] motion-reduce:transform-none">
            <m.img
              custom={column}
              variants={photoVariants}
              src={product.image.medium}
              srcSet={productSrcSet(product)}
              sizes={CARD_SIZES}
              width={product.image.width}
              height={product.image.height}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </span>

          {/* Registration marks close in on hover */}
          {cornerMarks.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute h-3.5 w-3.5 scale-125 border-kaveri-600/60 opacity-0 transition duration-500 ease-precise group-hover:scale-100 group-hover:opacity-100 ${position}`}
            />
          ))}

          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-ink-950/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white opacity-0 shadow-lg ring-1 ring-white/10 backdrop-blur transition duration-500 ease-precise group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
          >
            <Maximize2 className="h-3 w-3" />
            View details
          </span>
        </span>

        <span className="flex flex-1 items-start justify-between gap-4 px-5 pb-6 pt-4">
          <span className="min-w-0">
            <span className="block font-display text-[1.12rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950" data-testid="text-product-name">
              <HighlightMatch text={product.name} query={query} />
            </span>
            <span className="mt-1.5 line-clamp-2 block text-[14px] leading-relaxed text-steel-600">
              <HighlightMatch text={product.description} query={query} />
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-steel-50 text-steel-500 ring-1 ring-steel-200 transition duration-500 ease-precise group-hover:rotate-45 group-hover:bg-kaveri-600 group-hover:text-white group-hover:ring-kaveri-600 motion-reduce:group-hover:rotate-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-kaveri-600 via-kaveri-400 to-swoosh-400 transition-transform duration-700 ease-precise group-hover:scale-x-100"
        />
      </button>
    </m.li>
  );
});

export default ProductCard;
