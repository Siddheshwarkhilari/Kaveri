import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "./GalleryCard";

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function GalleryModal({ item, onClose }: GalleryModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-gallery"
    >
      <div 
        className="bg-background rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-end z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-gallery-modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
            <img
              src={item.image}
              alt={item.description}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239CA3AF'%3EGallery Image%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
          <p className="text-muted-foreground leading-relaxed text-center" data-testid="text-gallery-modal-description">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
