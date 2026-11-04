import { m, useReducedMotion, type Variants } from "motion/react";
import { categoryOf, type GalleryCategoryId, type GalleryPhoto } from "@/data/gallery";
import { ease, fadeUp } from "@/lib/motion";
import FeaturePhoto from "./FeaturePhoto";
import GalleryTile from "./GalleryTile";

/**
 * Splits a run of photos into rows of two and three, ending on a pair where possible and
 * never leaving a photo alone unless it is the only one: 4 → [2, 2], 5 → [3, 2], 7 → [2, 3, 2].
 */
export function partitionRows(count: number): number[] {
  const rows: number[] = [];
  let remaining = count;
  let size = 2;
  while (remaining > 0) {
    if (remaining === 1 && rows.length > 0) {
      if (rows[0] === 2) rows[0] = 3;
      else rows.splice(0, 1, 2, 2);
      break;
    }
    const take = Math.min(size, remaining);
    rows.unshift(take);
    remaining -= take;
    size = size === 2 ? 3 : 2;
  }
  return rows;
}

interface Slot {
  photo: GalleryPhoto;
  className: string;
  frameClassName: string;
  sizes: string;
  delay: number;
}

// Pairs share a row at the same frame height: 7 columns at 19:10 beside 5 columns at 4:3.
const pairLarge = {
  className: "lg:col-span-7",
  frameClassName: "aspect-[3/2] sm:aspect-[4/3] lg:aspect-[19/10]",
  sizes: "(min-width: 1280px) 700px, (min-width: 1024px) 56vw, (min-width: 640px) 46vw, 92vw",
};
const pairSmall = {
  className: "lg:col-span-5",
  frameClassName: "aspect-[3/2] sm:aspect-[4/3]",
  sizes: "(min-width: 1280px) 500px, (min-width: 1024px) 40vw, (min-width: 640px) 46vw, 92vw",
};
const trioLead = {
  className: "sm:col-span-2 lg:col-span-4",
  frameClassName: "aspect-[3/2] sm:aspect-[2/1] lg:aspect-[4/3]",
  sizes: "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 92vw",
};
const trioOther = {
  className: "lg:col-span-4",
  frameClassName: "aspect-[3/2] sm:aspect-[4/3]",
  sizes: "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw",
};
const single = {
  className: "col-span-full",
  frameClassName: "aspect-[3/2] sm:aspect-[2/1] lg:aspect-[21/9]",
  sizes: "(min-width: 1280px) 1200px, 92vw",
};

/**
 * Lays the photos after a collection's feature into rows, alternating which side the larger
 * photo of a pair takes (`offset` shifts the alternation, so collections don't all start alike).
 */
function layoutSlots(photos: GalleryPhoto[], offset: number): Slot[] {
  const slots: Slot[] = [];
  let start = 0;
  let pairs = offset;
  for (const size of partitionRows(photos.length)) {
    const row = photos.slice(start, start + size);
    start += size;
    if (size === 1) {
      slots.push({ photo: row[0], ...single, delay: 0 });
    } else if (size === 3) {
      row.forEach((photo, i) => slots.push({ photo, ...(i === 0 ? trioLead : trioOther), delay: i * 0.1 }));
    } else {
      const [first, second] = row;
      // Group and panoramic shots get the larger slot; otherwise the sides alternate.
      const largeSecond = !first.wide && (second.wide || pairs % 2 === 1);
      slots.push({ photo: first, ...(largeSecond ? pairSmall : pairLarge), delay: 0 });
      slots.push({ photo: second, ...(largeSecond ? pairLarge : pairSmall), delay: 0.12 });
      pairs += 1;
    }
  }
  return slots;
}

const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: ease.out } },
};

interface ChapterProps {
  category: GalleryCategoryId;
  photos: GalleryPhoto[];
  index: number;
  onOpen: (id: string) => void;
}

/** One collection: a heading, its feature photo, then the rest in editorial rows. */
function Chapter({ category, photos, index, onOpen }: ChapterProps) {
  const reduceMotion = useReducedMotion();
  const { label, icon: Icon } = categoryOf(category);
  const [feature, ...rest] = photos;
  const headingId = `gallery-chapter-${category}`;

  return (
    <section aria-labelledby={headingId} data-testid={`chapter-gallery-${category}`}>
      <m.header
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.08 }}
        className="relative flex items-end justify-between gap-6 pb-4"
      >
        <m.div variants={fadeUp} className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-kaveri-600 shadow-sm ring-1 ring-steel-200">
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
          </span>
          <h2 id={headingId} className="font-display text-[1.75rem] font-bold tracking-[-0.025em] text-ink-950 sm:text-[2rem]">
            {label}
          </h2>
        </m.div>
        <m.p variants={fadeUp} className="pb-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-steel-500">
          {photos.length} {photos.length === 1 ? "photograph" : "photographs"}
        </m.p>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-steel-200" />
        <m.span
          aria-hidden="true"
          variants={ruleVariants}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-kaveri-600 via-kaveri-400/60 to-transparent"
        />
      </m.header>

      <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
        <FeaturePhoto photo={feature} flip={index % 2 === 1} priority={index === 0} onOpen={onOpen} />
        {layoutSlots(rest, index).map(({ photo, ...slot }) => (
          <GalleryTile key={photo.id} photo={photo} {...slot} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  );
}

interface GalleryCollectionProps {
  photos: GalleryPhoto[];
  onOpen: (id: string) => void;
}

/** The gallery grouped into its collections, in the order each first appears. */
export default function GalleryCollection({ photos, onOpen }: GalleryCollectionProps) {
  const chapters = new Map<GalleryCategoryId, GalleryPhoto[]>();
  for (const photo of photos) chapters.set(photo.category, [...(chapters.get(photo.category) ?? []), photo]);

  return (
    <div className="space-y-20 lg:space-y-28" data-testid="gallery-collection">
      {Array.from(chapters, ([category, items], index) => (
        <Chapter key={category} category={category} photos={items} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
}
