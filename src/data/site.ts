export interface NavLink {
  path: string;
  label: string;
  /** Suffix for data-testid attributes. */
  testId: string;
}

export const navLinks: NavLink[] = [
  { path: "/", label: "Home", testId: "home" },
  { path: "/about", label: "About", testId: "about" },
  { path: "/products", label: "Products", testId: "products" },
  { path: "/gallery", label: "Gallery", testId: "gallery" },
  { path: "/contact", label: "Contact", testId: "contact" },
];

export const quoteLink = { path: "/contact", label: "Request a quote" };

/** Company details as published in the site footer. */
export const company = {
  name: "Kaveri GS Automech",
  tagline: "CNC · VMC · Toolroom",
  summary:
    "Industrial hardware and fabricated parts. We serve OEM and tier suppliers who need clear specs, reliable quality, and on-time delivery.",
  location: "Chakan, Pune · India",
  phone: { display: "+91 9356561166", href: "tel:+919356561166" },
  email: { display: "info@kaverigsautomech.com", href: "mailto:info@kaverigsautomech.com" },
  /** Second published address: listed in the company brochure and on the Contact page. */
  altEmail: { display: "kaveri.gs01@gmail.com", href: "mailto:kaveri.gs01@gmail.com" },
  address: [
    "Plot No. 1, Gate No. 483, Mahalaxmi Industrial Street,",
    "Near Bhangare West, Mahalunge-Varude Road,",
    "Chakan, Pune - 410501, India",
  ],
  brochure: { href: "/brochure/company-brochure.pdf", fileName: "Kaveri-GS-Automech-Brochure.pdf" },
};

/** Google Maps search for the published address. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Kaveri GS Automech, ${company.address.join(" ")}`,
)}`;

/** Partner logos (optimised copies of /public/partner_logos). */
export const partnerLogos = [1, 2, 3, 4].map((n) => ({
  src: `/optimized/partners/partner-logo-${n}-256.jpg`,
  label: `Partner logo ${n}`,
}));

/**
 * Google Maps has no listing for the plant yet: embedding the full address pins a different
 * business and directions to it fail. The map and directions therefore use the surrounding
 * locality, which Google outlines without placing a marker. Once the plant is on Google Maps,
 * point these at its listing and remove the note in LocationSection.
 */
const mapArea = "Mahalunge, Chakan, Pune, Maharashtra 410501";
export const mapAreaName = "Mahalunge";
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapArea)}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapArea)}`;

export function isActivePath(location: string, path: string): boolean {
  return path === "/" ? location === "/" : location === path || location.startsWith(`${path}/`);
}
