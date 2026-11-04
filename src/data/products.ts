export interface CatalogueProduct {
  /** Unique id, taken from the photo's file name (each photo belongs to one product). */
  id: string;
  name: string;
  description: string;
  /** Original photo in /public/products. */
  source: string;
  image: { small: string; medium: string; large: string; width: number; height: number };
}

const product = (file: string, name: string, description: string): CatalogueProduct => {
  const id = file.replace(/\.\w+$/, "");
  return {
    id,
    name,
    description,
    source: `/products/${file}`,
    image: {
      small: `/optimized/products/${id}-480.jpg`,
      medium: `/optimized/products/${id}-800.jpg`,
      large: `/optimized/products/${id}-1264.jpg`,
      width: 1264,
      height: 842,
    },
  };
};

export const productSrcSet = (p: CatalogueProduct) =>
  `${p.image.small} 480w, ${p.image.medium} 800w, ${p.image.large} 1264w`;

/**
 * The product catalogue, in its original order with its original wording. The old list
 * repeated "Hinge" (product-9) three times and "Tube Guide" (product-7) twice with
 * identical details; each now appears once.
 */
export const catalogue: CatalogueProduct[] = [
  product("product-1.png", "Heavy-Duty Stainless Steel Hinge", "Built for tough industrial use, offering strength and corrosion resistance."),
  product("product-2.png", "Customized Flange", "Ensures smooth motion and low friction in high-speed mechanical systems."),
  product("product-5.png", "Door Hinge Assembly", "Built for tough industrial use, offering strength and corrosion resistance."),
  product("product-17.png", "Crank Assembly", "Precision-engineered component for robotics"),
  product("product-22.png", "Tie Rod", "Advanced actuator for industrial automation"),
  product("product-9.jpg", "Hinge", "Durable hinges for industrial applications"),
  product("product-3.png", "Customized Panel Locks", "Tailored locking solutions for various industrial applications."),
  product("product-12.webp", "Clevis-End Actuator Rod", "High-efficiency sensor integration"),
  product("product-4.png", "High tensile Fasteners", "High-strength fasteners for industrial applications"),
  product("product-6.png", "Panel Locks", "Secure locking solutions for industrial panels"),
  product("product-27.png", "Industrial Fastener Set", "Complete set of high-strength bolts, nuts, and washers"),
  product("product-8.png", "Door Lock Handle", "Ergonomic handles designed for industrial door locks"),
  product("product-10.png", "Handle holder", "Robust holders for secure handle mounting"),
  product("product-11.png", "Refer Lock Set", "Secure locking solutions for refrigeration units"),
  product("product-7.png", "Tube Guide", "Precision-engineered tube guides for smooth operation"),
  product("product-13.png", "Keeper", "Durable keepers for secure panel locking"),
  product("product-14.png", "Cam & Keeper", "Integrated cam and keeper solutions for secure locking"),
  product("product-30.png", "Clevise", "Heavy-duty clevis for secure connections"),
  product("product-16.png", "Hinges", "Durable hinges for industrial applications"),
  product("product-18.png", "Hinge", "Durable hinges for industrial applications"),
  product("product-19.png", "U bolt", "Heavy-duty U bolts for secure fastening"),
  product("product-21.png", "U bolt", "Precision-engineered U bolts for secure fastening"),
  product("product-23.png", "Panel Mount Bushing", "Custom part for advanced automation"),
  product("product-25.png", "Container refer lock set", "Secure locking solutions for refrigeration units"),
  product("product-31.png", "Lift-off hinge", "Durable hinges for industrial applications"),
  product("product-15.png", "Handle", "Ergonomic handles for easy operation"),
  product("product-29.png", "Cable Tray", "High-efficiency cable management solutions"),
  product("product-32.png", "Door Hinge", "Durable door hinges for industrial applications"),
  product("product-33.png", "U Bracket", "Heavy-duty U brackets for secure mounting"),
  product("product-34.png", "Canopy Locks", "Secure locking solutions for refrigeration units"),
  product("product-38.png", "Locks", "Secure locking solutions for refrigeration units"),
  product("product-36.png", "Bracket", "Precision-engineered component for robotics"),
  product("product-37.png", "Mounting flange", "Advanced actuator for industrial automation"),
];

/**
 * Search shortcuts. These are just words that already occur in product names — not
 * categories — and each simply runs that search.
 */
export const quickSearches = ["Hinge", "Lock", "Handle", "Bolt", "Fastener", "Bracket", "Flange", "Keeper", "Rod"];

/** The catalogue's existing search: a case-insensitive match on name or description. */
export function searchCatalogue(products: CatalogueProduct[], query: string): CatalogueProduct[] {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter(
    (item) => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
  );
}
