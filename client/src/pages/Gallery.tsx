import { useState } from "react";
import GalleryCard, { type GalleryItem } from "@/components/GalleryCard";
import GalleryModal from "@/components/GalleryModal";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // TODO: Replace with actual gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      image: "/gallery/gallery1.jpg",
      description: "State-of-the-art manufacturing facility with advanced CNC machines"
    },
    {
      id: "2",
      image: "/gallery/gallery2.jpg",
      description: "Quality control department ensuring precision in every component"
    },
    {
      id: "3",
      image: "/gallery/gallery3.jpg",
      description: "Modern warehouse with systematic inventory management"
    },
    {
      id: "4",
      image: "/gallery/gallery4.jpg",
      description: "Skilled technicians operating precision machinery"
    },
    {
      id: "5",
      image: "/gallery/gallery5.jpg",
      description: "Assembly line for cable tray fitting production"
    },
    {
      id: "6",
      image: "/gallery/gallery6.jpg",
      description: "Finished products ready for quality inspection"
    },
    {
      id: "7",
      image: "/gallery/gallery7.jpg",
      description: "Research and development laboratory for product innovation"
    },
    {
      id: "8",
      image: "/gallery/gallery8.jpg",
      description: "Packaging department ensuring safe product delivery"
    },
    {
      id: "9",
      image: "/gallery/gallery9.jpg",
      description: "Team collaboration and production planning session"
    },
    {
      id: "10",
      image: "/gallery/gallery10.jpg",
      description: "Loading dock with organized shipping operations"
    },
    {
      id: "11",
      image: "/gallery/gallery11.jpg",
      description: "Advanced welding station for heavy-duty components"
    },
    {
      id: "12",
      image: "/gallery/gallery12.jpg",
      description: "Material testing laboratory ensuring product standards"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Manufacturing Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Take a visual tour of our manufacturing facilities, processes, and the quality that goes into every product
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
