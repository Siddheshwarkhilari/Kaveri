import { m } from "motion/react";
import { LayoutGrid } from "lucide-react";
import { galleryCategories, type GalleryFilterId } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface GalleryFiltersProps {
  active: GalleryFilterId;
  counts: Record<GalleryFilterId, number>;
  onChange: (filter: GalleryFilterId) => void;
}

const options = [{ id: "all" as const, label: "All", icon: LayoutGrid }, ...galleryCategories];

/** Segmented control for the gallery's collections; the highlight slides to the chosen one. */
export default function GalleryFilters({ active, counts, onChange }: GalleryFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-steel-500">Browse the collection</p>
      <div
        role="group"
        aria-label="Show photographs from"
        className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-steel-200"
        data-testid="gallery-filters"
      >
        {options.map(({ id, label, icon: Icon }) => {
          const selected = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={selected}
              data-testid={`filter-gallery-${id}`}
              className={cn(
                "relative flex flex-auto items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 sm:flex-none sm:px-4",
                selected ? "text-white" : "text-ink-800 hover:text-kaveri-700",
              )}
            >
              {selected && (
                <m.span
                  layoutId="gallery-filter-highlight"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink-950 shadow-[0_8px_18px_-10px_rgba(10,19,36,0.6)]"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              <Icon aria-hidden="true" className={cn("relative h-4 w-4 max-[399px]:hidden", selected ? "text-swoosh-300" : "text-steel-400")} strokeWidth={1.8} />
              <span className="relative">{label}</span>
              <span className={cn("relative font-mono text-[10.5px]", selected ? "text-white/60" : "text-steel-400")}>{counts[id]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
