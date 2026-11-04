import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { AnimatePresence } from "motion/react";
import CatalogueIntro from "@/components/products/CatalogueIntro";
import CatalogueSearch from "@/components/products/CatalogueSearch";
import ProductDetailModal from "@/components/products/ProductDetailModal";
import { EmptyResults, ProductGrid } from "@/components/products/ProductGrid";
import { catalogue, quickSearches, searchCatalogue } from "@/data/products";

interface Selection {
  id: string;
  direction: number;
}

export default function Products() {
  const search = useSearch();
  const [, navigate] = useLocation();

  // The search and the open product live in the URL (?q= and ?product=), so both can be
  // shared and both survive a round trip to the contact form and back.
  const [query, setQuery] = useState(() => new URLSearchParams(search).get("q") ?? "");
  const [selection, setSelection] = useState<Selection | null>(() => {
    const id = new URLSearchParams(search).get("product");
    return id && catalogue.some((item) => item.id === id) ? { id, direction: 1 } : null;
  });

  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => searchCatalogue(catalogue, deferredQuery), [deferredQuery]);
  const suggestions = useMemo(
    () => quickSearches.map((term) => ({ term, count: searchCatalogue(catalogue, term).length })),
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selection) params.set("product", selection.id);
    const queryString = params.toString();
    const next = `/products${queryString ? `?${queryString}` : ""}`;
    if (next !== `${window.location.pathname}${window.location.search}`) navigate(next, { replace: true });
  }, [query, selection, navigate]);

  // Previous/next browse the current search results (or the whole catalogue if the open
  // product isn't among them).
  const selected = selection ? catalogue.find((item) => item.id === selection.id) ?? null : null;
  const browseList = selected && results.includes(selected) ? results : catalogue;
  const position = selected ? browseList.indexOf(selected) : -1;

  const open = useCallback((id: string) => setSelection({ id, direction: 1 }), []);
  const navigateTo = useCallback((id: string, direction: number) => setSelection({ id, direction }), []);
  const close = useCallback(() => setSelection(null), []);

  return (
    <div className="bg-white">
      <CatalogueIntro total={catalogue.length} />

      <section
        aria-label="Catalogue"
        className="relative bg-steel-50 bg-[linear-gradient(to_bottom,#ffffff,#F5F7FA_8rem)]"
        data-testid="section-catalogue"
      >
        <div
          aria-hidden="true"
          className="bg-blueprint-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_12rem,#000_85%,transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
          <CatalogueSearch
            query={query}
            onQueryChange={setQuery}
            resultCount={results.length}
            total={catalogue.length}
            suggestions={suggestions}
          />
          <div className="mt-8 lg:mt-10">
            {results.length > 0 ? (
              <ProductGrid products={results} query={deferredQuery} onOpen={open} />
            ) : (
              <EmptyResults query={deferredQuery} suggestions={quickSearches.slice(0, 5)} onSearch={setQuery} />
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProductDetailModal
            key="product-detail"
            product={selected}
            previous={position > 0 ? browseList[position - 1] : null}
            next={position >= 0 && position < browseList.length - 1 ? browseList[position + 1] : null}
            direction={selection?.direction ?? 1}
            onNavigate={navigateTo}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
