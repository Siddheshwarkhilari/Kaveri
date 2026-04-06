export interface GalleryItem {
  id: string;
  image: string;
  description: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

function shortCaption(text: string, maxChars = 120): string {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  const cut = t.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

/** Card shows image + short caption; full text in lightbox. */
export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const preview = shortCaption(item.description);

  return (
    <article className="flex flex-col h-full min-w-0">
      <button
        type="button"
        onClick={onClick}
        data-testid={`card-gallery-${item.id}`}
        className="group flex flex-col h-full w-full text-left border-2 border-slate-300 bg-white rounded-none p-3 sm:p-4 cursor-pointer transition-all duration-300 ease-out hover:border-slate-800 hover:shadow-[0_20px_50px_-18px_rgba(15,23,42,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
      >
        <div className="aspect-[4/3] w-full bg-slate-100 border border-slate-200/90 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='14' fill='%2394a3b8'%3EPhoto%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>
        <p
          className="mt-3 text-sm text-slate-600 leading-snug line-clamp-3 group-hover:text-slate-900 transition-colors"
          data-testid={`text-gallery-description-${item.id}`}
        >
          {preview}
        </p>
      </button>
    </article>
  );
}
