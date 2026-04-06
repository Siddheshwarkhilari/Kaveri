import { useState } from "react";
import GalleryCard, { type GalleryItem } from "@/components/GalleryCard";
import GalleryModal from "@/components/GalleryModal";
import PageHeader from "@/components/PageHeader";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      image: "/gallery/photo-2.webp",
      description:
        "Team collaboration on the shop floor—coordination between programming, tooling, and quality checks.",
    },
    {
      id: "2",
      image: "/gallery/photo-1.webp",
      description: "Skilled operators focused on safe, repeatable machining and assembly sequences.",
    },
    {
      id: "3",
      image: "/gallery/photo-12.webp",
      description: "Leadership and planning aligned with production capacity and delivery commitments.",
    },
    {
      id: "4",
      image: "/gallery/photo-5.webp",
      description: "Hands-on workmanship with attention to tolerances and finish requirements.",
    },
    {
      id: "5",
      image: "/gallery/photo-6.webp",
      description: "Experienced team members contributing across fabrication and assembly stages.",
    },
    {
      id: "6",
      image: "/gallery/photo-8.webp",
      description: "Organised material flow and line balancing for steady output.",
    },
    {
      id: "7",
      image: "/gallery/photo-10.webp",
      description: "Assembly and fit-up of complex industrial components.",
    },
    {
      id: "8",
      image: "/gallery/photo-4.webp",
      description: "Machining operations with in-process inspection where the application demands it.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Gallery"
        subtitle="A look inside our facility—people, equipment, and the discipline behind each batch."
      />

      <section className="py-14 md:py-20 border-t border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Three cards per row on large screens; generous spacing between cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 sm:gap-x-12 sm:gap-y-14 lg:gap-x-16 lg:gap-y-16">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
