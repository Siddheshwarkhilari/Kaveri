import { Card } from "@/components/ui/card";

export interface GalleryItem {
  id: string;
  image: string;
  description: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group hover-elevate active-elevate-2 transition-all duration-300"
      onClick={onClick}
      data-testid={`card-gallery-${item.id}`}
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={item.image}
          alt={item.description}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%239CA3AF'%3EGallery Image%3C/text%3E%3C/svg%3E`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <p className="text-white text-sm p-4 line-clamp-2" data-testid={`text-gallery-description-${item.id}`}>
            {item.description}
          </p>
        </div>
      </div>
    </Card>
  );
}
