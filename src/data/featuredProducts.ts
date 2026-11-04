export interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  /** Optional lead line that preceded the description in the original copy. */
  tagline?: string;
  description: string;
  highlights: string[];
  image: {
    /** Optimised copies (see scripts/optimize-images.ps1); originals live in /public/featured-products. */
    large: string;
    medium: string;
    thumb: string;
    width: number;
    height: number;
  };
}

const image = (slug: string) => ({
  large: `/optimized/featured/${slug}-1264.jpg`,
  medium: `/optimized/featured/${slug}-720.jpg`,
  thumb: `/optimized/featured/${slug}-240.jpg`,
  width: 1264,
  height: 842,
});

/**
 * Homepage featured products. Copy is carried over word for word from the previous
 * carousel, split into fields: "Category - X" entries became `category`, and a
 * "Lead - text" first line became `tagline` + `description`.
 */
export const featuredProducts: FeaturedProduct[] = [
  {
    id: "reefer-lockset-assembly",
    name: "Refer Lock-sets assembly",
    category: "Locksets",
    // TODO(content): this lead line and these highlights describe hinges / a pump, not a lockset — confirm with the client.
    tagline: "Heavy-Duty Hinges for Heavy Vehicles",
    description: "Robust and corrosion-resistant hinges designed for heavy vehicles like trucks and trailers.",
    highlights: ["High Pressure Output", "Energy Efficient", "Low Maintenance"],
    image: image("reefer-lockset-assembly"),
  },
  {
    id: "heavy-duty-hinges",
    name: "Heavy duty Hinges",
    category: "Hinges",
    tagline: "Heavy-Duty Hinges for Heavy Vehicles",
    description: "Robust and corrosion-resistant hinges designed for heavy vehicles like trucks and trailers.",
    highlights: ["EN8 Hardened", "Various Sizes", "Forged and Machined"],
    image: image("heavy-duty-hinges"),
  },
  {
    id: "special-lockset",
    name: "Special Lockset",
    category: "Airtight container locksets",
    description:
      "Premium quality stainless steel lockset designed for heavy industrial applications with superior corrosion resistance and durability with a sleek design",
    highlights: ["Various Sizes", "Corrosion Resistant", "Stainless Steel 316"],
    image: image("special-lockset"),
  },
  {
    id: "cable-tray-fitting",
    name: "Cable tray fitting",
    category: "Fasteners",
    description:
      "Cable tray fittings made from high-quality stainless steel, ideal for secure and organized cable management in industrial settings.",
    highlights: ["OEM approved", "316L Stainless Steel", "Various Sizes"],
    image: image("cable-tray-fitting"),
  },
  {
    id: "marine-grade-fasteners",
    name: "Marine Grade Fasteners",
    category: "Fasteners",
    description:
      "Designed for use in harsh marine environments, these fasteners offer superior corrosion resistance and durability.",
    highlights: ["Marine Grade", "316L Stainless Steel", "Various Sizes"],
    // TODO(content): this photo shows the machined crank part listed as "Crank Assembly" in the catalogue.
    image: image("marine-grade-fasteners"),
  },
];
