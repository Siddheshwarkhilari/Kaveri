import { AnimatePresence, m } from "motion/react";
import { SearchX } from "lucide-react";
import type { CatalogueProduct } from "@/data/products";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ease } from "@/lib/motion";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: CatalogueProduct[];
  query: string;
  onOpen: (id: string) => void;
}

/** The catalogue grid. Cards re-flow smoothly as searches add or remove products. */
export function ProductGrid({ products, query, onOpen }: ProductGridProps) {
  const threeColumns = useMediaQuery("(min-width: 1024px)");
  const twoColumns = useMediaQuery("(min-width: 560px)");
  const columns = threeColumns ? 3 : twoColumns ? 2 : 1;

  return (
    // popLayout lifts exiting cards out of the flow, so the list must be positioned.
    <ul className="relative grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 lg:grid-cols-3 lg:gap-6" data-testid="grid-products">
      <AnimatePresence mode="popLayout">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} column={i % columns} query={query} onOpen={onOpen} />
        ))}
      </AnimatePresence>
    </ul>
  );
}

interface EmptyResultsProps {
  query: string;
  suggestions: string[];
  onSearch: (query: string) => void;
}

/** Shown when a search finds nothing: says so plainly and offers ways back into the catalogue. */
export function EmptyResults({ query, suggestions, onSearch }: EmptyResultsProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="relative overflow-hidden rounded-[22px] border border-dashed border-steel-300 bg-white/70 px-6 py-14 text-center sm:px-10"
      data-testid="empty-results"
    >
      <div aria-hidden="true" className="bg-blueprint-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="relative">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink-950 text-swoosh-400 shadow-lg">
          <SearchX aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.01em] text-ink-950">
          No products match “{query.trim()}”
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-steel-600">
          Try a shorter or more general term, or start from one of these.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {suggestions.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSearch(term)}
              className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-800 ring-1 ring-inset ring-steel-200 transition-colors hover:bg-kaveri-50 hover:text-kaveri-800 hover:ring-kaveri-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500"
            >
              {term}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSearch("")}
          className="mt-6 text-sm font-semibold text-kaveri-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500"
          data-testid="button-show-all-products"
        >
          Show all products
        </button>
      </div>
    </m.div>
  );
}
