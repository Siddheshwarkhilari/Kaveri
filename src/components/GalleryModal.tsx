import { useEffect } from "react";
import { X } from "lucide-react";
import type { GalleryItem } from "./GalleryCard";

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

/**
 * Instagram-style post: fixed height budget (no inner scroll), image scales to fit the frame,
 * caption sits directly underneath — entire card is overflow-hidden.
 */
export default function GalleryModal({ item, onClose }: GalleryModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      data-testid="modal-gallery"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close gallery"
        className="absolute inset-0 bg-black/55 backdrop-blur-[6px] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Fixed height: flex splits space — image area grows, caption auto; nothing scrolls inside */}
      <div
        className="relative z-10 flex h-[min(88vh,820px)] max-h-[90vh] w-[min(100%,480px)] flex-col overflow-hidden rounded-xl bg-white shadow-[0_25px_80px_-12px_rgba(0,0,0,0.45)] ring-1 ring-neutral-200/80 animate-in fade-in zoom-in-95 duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-caption"
      >
        <div className="flex shrink-0 items-center justify-end border-b border-neutral-200 bg-white px-2 py-2">
          <button
            type="button"
            onClick={onClose}
            data-testid="button-close-gallery-modal"
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Middle: takes all remaining height; image scales inside — object-contain, fits container */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 items-center justify-center bg-neutral-100 p-3 sm:p-4">
            <img
              src={item.image}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="max-h-full max-w-full object-contain object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1080' height='1350' viewBox='0 0 1080 1350'%3E%3Crect width='1080' height='1350' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a3a3a3' font-family='system-ui' font-size='28'%3EPhoto%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>

          {/* Caption flush under the image — not in a scroll area */}
          <div
            id="gallery-modal-caption"
            className="shrink-0 border-t border-neutral-200 bg-white px-4 py-3 sm:px-5 sm:py-4"
          >
            <p
              className="text-[14px] sm:text-[15px] leading-relaxed text-neutral-800 [overflow-wrap:anywhere]"
              data-testid="text-gallery-modal-description"
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
