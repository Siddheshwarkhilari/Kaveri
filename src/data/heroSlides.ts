export interface HeroSlide {
  id: string;
  /** Short label on the slide selector. */
  label: string;
  /** Small technical line above the title. */
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  video: {
    /** Path under /public — case-sensitive in production. */
    src: string;
    /** Optional still shown until the video can play. */
    poster?: string;
  };
}

/**
 * Homepage hero slides. Each entry pairs one video with the copy shown in the
 * palette under it. Reorder entries, or point `video.src` at any file in
 * /public/videos, to remap videos and content freely.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "range",
    label: "Product range",
    eyebrow: "Hinges · Locksets · Fasteners",
    title: "Quality hardware solutions",
    description:
      "Manufacturing components for industrial applications with consistent quality and dependable delivery.",
    cta: { label: "Explore products", href: "/products" },
    video: { src: "/videos/video1.mp4" },
  },
  {
    id: "precision",
    label: "CNC machining",
    eyebrow: "CNC · VMC · In-process inspection",
    title: "Precision engineering",
    description:
      "Modern equipment and experienced teams focused on tolerances, repeatability, and traceability.",
    cta: { label: "View gallery", href: "/gallery" },
    video: { src: "/videos/video2.mp4" },
  },
  {
    id: "partners",
    label: "Built to drawing",
    eyebrow: "Prototype to batch production",
    title: "Partners in production",
    description:
      "From prototypes to batch runs, we align with your drawings, timelines, and quality expectations.",
    cta: { label: "About us", href: "/about" },
    video: { src: "/videos/video3.mp4" },
  },
];
