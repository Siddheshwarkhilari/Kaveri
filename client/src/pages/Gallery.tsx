import { useState } from "react";
import GalleryCard, { type GalleryItem } from "@/components/GalleryCard";
import GalleryModal from "@/components/GalleryModal";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // TODO: Replace with actual gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      image: "/gallery/photo-2.webp",
      description: "A snapshot of our dynamic team collaborating to deliver precision and quality in every project with cutting-edge technology."
    },
    {
      id: "2",
      image: "/gallery/photo-1.webp",
      description: "Focused, skilled, and dedicated—our team ensures smooth operations and flawless execution on the shop floor."
    },
    {
      id: "3",
      image: "/gallery/photo-12.webp",
      description: "Our director sets the strategic direction, blending experience and innovation to guide the company forward."
    },
    {
      id: "4",
      image: "/gallery/photo-5.webp",
      description: "Every cut, every component—our skilled workers make sure accuracy and quality come first."
    },
    {
      id: "5",
      image: "/gallery/photo-6.webp",
      description: "Dedicated craftsmanship and attention to detail define the work of our valued team members."
    },
    {
      id: "6",
      image: "/gallery/photo-8.webp",
      description: "Streamlined production line for efficient manufacturing"
    },
    {
      id: "7",
      image: "/gallery/photo-10.webp",
      description: "Assembly process for complex industrial components carried out on the shop floor."
    },
    {
      id: "8",
      image: "/gallery/photo-4.webp",
      description: "Precision machining of components on the shop floor."
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">MANUFACTURING GALLERY</h1>
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
