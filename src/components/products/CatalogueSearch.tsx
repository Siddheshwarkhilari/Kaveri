import { useEffect, useRef } from "react";
import { m, useInView } from "motion/react";
import { ease } from "@/lib/motion";
import { Search, X } from "lucide-react";
import { useHeadroom } from "@/hooks/use-headroom";
import { cn } from "@/lib/utils";

interface CatalogueSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount: number;
  total: number;
  /** Search shortcuts with how many products each one finds. */
  suggestions: { term: string; count: number }[];
}

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: ease.out },
});

/**
 * Catalogue search: a capsule that sticks to the top while browsing (dropping below the
 * navbar whenever the navbar is showing), with search shortcuts underneath. Press "/" to focus it.
 * Renders as a fragment so the sticky bar's parent is the whole catalogue column.
 */
export default function CatalogueSearch({ query, onQueryChange, resultCount, total, suggestions }: CatalogueSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navHidden = useHeadroom();
  const stuck = !useInView(sentinelRef, { initial: true });
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || isTypingTarget(event.target)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      <m.div
        {...enter(0.25)}
        className={cn(
          "sticky z-30 transition-[top] duration-500 ease-precise",
          navHidden ? "top-3 sm:top-4" : "top-[96px] sm:top-[100px] lg:top-[104px]",
        )}
      >
        <div
          role="search"
          className={cn(
            "flex items-center gap-2 rounded-2xl bg-white/90 p-2 ring-1 ring-steel-200 backdrop-blur-xl transition-shadow duration-500",
            stuck ? "shadow-[0_22px_44px_-24px_rgba(10,19,36,0.4)]" : "shadow-sm",
          )}
        >
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="group relative min-w-0 flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-steel-400 transition-colors duration-300 group-focus-within:text-kaveri-600"
            />
            <input
              ref={inputRef}
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape" && hasQuery) onQueryChange("");
              }}
              placeholder="Search hinges, locks, brackets…"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              className="h-12 w-full rounded-xl bg-steel-50 pl-11 pr-12 text-[15px] text-ink-950 ring-1 ring-inset ring-transparent transition-[background-color,box-shadow] duration-300 placeholder:text-steel-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(18,81,192,0.12)] focus:outline-none focus:ring-kaveri-400"
              data-testid="input-search-products"
            />
            {hasQuery ? (
              <button
                type="button"
                onClick={() => {
                  onQueryChange("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                data-testid="button-clear-search"
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-steel-500 transition-colors hover:bg-steel-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd
                aria-hidden="true"
                className="absolute right-3 top-1/2 hidden h-6 min-w-6 -translate-y-1/2 place-items-center rounded-md bg-white px-1.5 font-mono text-[11px] text-steel-500 ring-1 ring-steel-200 sm:grid"
              >
                /
              </kbd>
            )}
          </div>
          <p
            aria-live="polite"
            className="hidden shrink-0 px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500 sm:block"
            data-testid="text-result-count"
          >
            <span className="text-ink-900">{resultCount}</span> / {total} products
          </p>
        </div>
      </m.div>

      <m.div {...enter(0.35)} className="mt-4 flex items-center gap-3">
        <p className="hidden shrink-0 font-mono text-[10.5px] uppercase tracking-[0.18em] text-steel-500 md:block">Quick search</p>
        <ul className="-mx-6 flex min-w-0 flex-1 gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {suggestions.map(({ term, count }) => {
            const active = query.trim().toLowerCase() === term.toLowerCase();
            return (
              <li key={term} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onQueryChange(active ? "" : term)}
                  aria-pressed={active}
                  data-testid={`chip-search-${term.toLowerCase()}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-inset transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500",
                    active
                      ? "bg-kaveri-600 text-white ring-kaveri-600"
                      : "bg-white text-ink-800 ring-steel-200 hover:bg-kaveri-50 hover:text-kaveri-800 hover:ring-kaveri-200",
                  )}
                >
                  {term}
                  <span className={cn("font-mono text-[10.5px]", active ? "text-white/70" : "text-steel-400")}>{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </m.div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500 sm:hidden" aria-hidden="true">
        <span className="text-ink-900">{resultCount}</span> / {total} products
      </p>
    </>
  );
}
