import { Cog, DraftingCompass, ShieldCheck, type LucideIcon } from "lucide-react";

export interface Pillar {
  id: string;
  title: string;
  description: string;
  /** Short technical tags, lifted from the description itself. */
  tags: string[];
  icon: LucideIcon;
}

export const whoWeAre = {
  label: "Overview",
  title: "Who we are",
  company: "Kaveri GS Automech",
  description:
    "supplies hardware and fabricated parts for industrial customers. We combine disciplined shop-floor practices with clear communication—so specifications are met and deliveries stay predictable.",
  link: { label: "More about us", href: "/about" },
  pillars: [
    {
      id: "manufacturing",
      title: "Controlled manufacturing",
      description: "Equipment and workflows geared toward repeatability, inspection, and clean documentation.",
      tags: ["Repeatability", "Inspection", "Documentation"],
      icon: Cog,
    },
    {
      id: "support",
      title: "Application-driven support",
      description: "We work from your drawings and constraints—material, finish, load, and environment—before we cut metal.",
      tags: ["Material", "Finish", "Load", "Environment"],
      icon: DraftingCompass,
    },
    {
      id: "reliability",
      title: "Long-term reliability",
      description: "Parts are checked against agreed criteria so what leaves the plant matches what you approved on paper.",
      tags: ["Agreed criteria", "Checked", "As approved"],
      icon: ShieldCheck,
    },
  ] satisfies Pillar[],
};
