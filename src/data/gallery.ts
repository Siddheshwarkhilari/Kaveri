import type { LucideIcon } from "lucide-react";
import { Factory, Users } from "lucide-react";
import { galleryPlaceholders } from "./galleryPlaceholders";

export type GalleryCategoryId = "people" | "shop-floor";
export type GalleryFilterId = "all" | GalleryCategoryId;

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
  icon: LucideIcon;
}

export interface GalleryPhoto {
  /** The original file's name without its extension, e.g. "photo-4". */
  id: string;
  /** Short heading taken from the opening words of the caption. */
  title: string;
  /** The photo's caption, as originally published. */
  description: string;
  /** What the photo shows, for screen readers. */
  alt: string;
  category: GalleryCategoryId;
  /** object-position for cropped views, keeping the subject in frame. */
  focus: string;
  /** Group or panoramic shots that should take the larger slot when two photos share a row. */
  wide?: boolean;
  source: string;
  image: {
    thumb: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    placeholder: string;
    width: number;
    height: number;
  };
}

export const galleryCategories: GalleryCategory[] = [
  { id: "people", label: "People", icon: Users },
  { id: "shop-floor", label: "Shop floor", icon: Factory },
];

const photo = (
  file: string,
  details: Omit<GalleryPhoto, "id" | "source" | "image">,
  size: { width: number; height: number } = { width: 7008, height: 4672 },
): GalleryPhoto => {
  const id = file.replace(/\.\w+$/, "");
  return {
    id,
    ...details,
    source: `/gallery/${file}`,
    image: {
      thumb: `/optimized/gallery/${id}-320.jpg`,
      small: `/optimized/gallery/${id}-640.jpg`,
      medium: `/optimized/gallery/${id}-1024.jpg`,
      large: `/optimized/gallery/${id}-1600.jpg`,
      xlarge: `/optimized/gallery/${id}-2400.jpg`,
      placeholder: galleryPlaceholders[id],
      ...size,
    },
  };
};

export const gallerySrcSet = (item: GalleryPhoto) =>
  `${item.image.small} 640w, ${item.image.medium} 1024w, ${item.image.large} 1600w, ${item.image.xlarge} 2400w`;

/** The gallery in its original order, with each photo's original caption. */
export const galleryPhotos: GalleryPhoto[] = [
  photo("photo-2.webp", {
    title: "Team collaboration",
    description: "Team collaboration on the shop floor—coordination between programming, tooling, and quality checks.",
    alt: "The Kaveri GS Automech team standing in front of the plant entrance, beneath the company signboard",
    category: "people",
    focus: "52% 30%",
    wide: true,
  }),
  photo("photo-1.webp", {
    title: "Skilled operators",
    description: "Skilled operators focused on safe, repeatable machining and assembly sequences.",
    alt: "The team standing in a line on the shop floor",
    category: "people",
    focus: "50% 62%",
    wide: true,
  }),
  photo("photo-12.webp", {
    title: "Leadership & planning",
    description: "Leadership and planning aligned with production capacity and delivery commitments.",
    alt: "Two members of the leadership team standing side by side",
    category: "people",
    focus: "55% 30%",
  }),
  photo("photo-5.webp", {
    title: "Hands-on workmanship",
    description: "Hands-on workmanship with attention to tolerances and finish requirements.",
    alt: "An operator at the control panel of a CNC turning machine",
    category: "shop-floor",
    focus: "42% 40%",
  }),
  photo("photo-6.webp", {
    title: "Experienced team members",
    description: "Experienced team members contributing across fabrication and assembly stages.",
    alt: "An operator working at a lathe machine",
    category: "shop-floor",
    focus: "40% 30%",
  }),
  photo("photo-8.webp", {
    title: "Organised material flow",
    description: "Organised material flow and line balancing for steady output.",
    alt: "A pillar drilling machine beside racks of tooling and stacked machined parts",
    category: "shop-floor",
    focus: "45% 30%",
  }),
  photo("photo-10.webp", {
    title: "Assembly & fit-up",
    description: "Assembly and fit-up of complex industrial components.",
    alt: "Wide view of the shop floor with machines, workbenches and stacked machined parts",
    category: "shop-floor",
    focus: "50% 55%",
    wide: true,
  }),
  photo("photo-4.webp", {
    title: "Machining operations",
    description: "Machining operations with in-process inspection where the application demands it.",
    alt: "An operator working at a vertical machining centre",
    category: "shop-floor",
    focus: "55% 45%",
  }),
];

export const categoryOf = (id: GalleryCategoryId) => galleryCategories.find((category) => category.id === id)!;

export function filterGallery(photos: GalleryPhoto[], filter: GalleryFilterId) {
  return filter === "all" ? photos : photos.filter((item) => item.category === filter);
}

export const isGalleryFilter = (value: string | null): value is GalleryFilterId =>
  value === "all" || galleryCategories.some((category) => category.id === value);
