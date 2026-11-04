import {
  Building2,
  Calendar,
  Factory,
  Layers,
  MapPin,
  PackageCheck,
  PencilRuler,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Photo } from "@/lib/media";

const photo = (slug: string, alt: string): Photo => ({
  large: `/optimized/about/${slug}-1600.jpg`,
  medium: `/optimized/about/${slug}-900.jpg`,
  width: 1600,
  height: 1067,
  alt,
});

/**
 * About page copy. Every statement is carried over from the previous About page;
 * only the presentation changed (facts pulled out into milestones, chips and cards).
 */
export const about = {
  intro: {
    label: "About Kaveri GS Automech",
    title: "About us",
    company: "Kaveri GS Automech",
    lead: "is a manufacturing-led company in Chakan, Pune, focused on hardware, fabricated parts, and dependable delivery for industrial buyers.",
    facts: [
      { icon: Calendar, label: "Founded 2016" },
      { icon: Building2, label: "Private limited since 2021" },
      { icon: MapPin, label: "Chakan, Pune" },
    ] satisfies { icon: LucideIcon; label: string }[],
    photo: photo("plant-entrance-team", "The Kaveri GS Automech team outside the plant entrance in Chakan, Pune"),
    caption: "Plant entrance · Chakan, Pune",
  },

  journey: {
    label: "Our journey",
    title: "Establishment & growth",
    milestones: [
      {
        id: "founded",
        when: "2016",
        tag: "Partnership firm",
        title: "Founded as a partnership firm",
        body: "The company began with an emphasis on measurable quality and clear process discipline.",
      },
      {
        id: "private-limited",
        when: "2021",
        tag: "Private limited",
        title: "Moved to a private limited structure",
        body: "The restructure brought formal systems and clearer accountability to the business.",
      },
      {
        id: "today",
        when: "Today",
        tag: "Present day",
        title: "Room to scale, with control of the shop floor",
        body: "That structure gives room to scale capacity without losing control of the shop floor.",
      },
    ],
  },

  brochure: {
    title: "Company brochure",
    description:
      "PDF overview of capabilities, typical product families, and contact details. Use it for internal sharing or vendor onboarding.",
    href: "/brochure/company-brochure.pdf",
    fileName: "Kaveri-GS-Automech-Brochure.pdf",
    meta: ["PDF", "4 pages", "394 KB"],
    pages: ["/optimized/brochure/page-1.jpg", "/optimized/brochure/page-2.jpg", "/optimized/brochure/page-3.jpg"],
  },

  location: {
    label: "Location",
    title: "Chakan, Pune",
    body: "The Chakan location places us close to automotive and general engineering supply chains, with access to skilled labour, tooling suppliers, and road links for timely despatches across western India.",
    advantages: [
      { icon: Factory, short: "Supply chains", title: "Supply chains", body: "Close to automotive and general engineering supply chains." },
      { icon: Users, short: "Skilled labour", title: "Skilled labour", body: "Access to skilled labour." },
      { icon: Wrench, short: "Tooling suppliers", title: "Tooling suppliers", body: "Access to tooling suppliers." },
      { icon: Truck, short: "Road links", title: "Road links", body: "Road links for timely despatches across western India." },
    ] satisfies { icon: LucideIcon; short: string; title: string; body: string }[],
    photo: photo("shop-floor", "Machines on the Kaveri GS Automech shop floor"),
    caption: "Shop floor · Chakan",
  },

  approach: {
    label: "Operational approach",
    title: "How we work",
    lead: "We support both custom one-off requirements and repeatable batch work from customer drawings. Parts are checked against agreed criteria before packing, so what ships matches what was approved.",
    principles: [
      { icon: Wrench, title: "Custom one-off requirements", body: "Individual parts made to a customer's specific requirement." },
      { icon: Layers, title: "Repeatable batch work", body: "Batch production that can be repeated to the same standard." },
      { icon: PencilRuler, title: "Built from customer drawings", body: "Work is executed from the customer's own drawings." },
      { icon: PackageCheck, title: "Checked before packing", body: "Parts are checked against agreed criteria, so what ships matches what was approved." },
    ] satisfies { icon: LucideIcon; title: string; body: string }[],
    photo: photo("cnc-operator", "An operator programming a CNC turning centre at Kaveri GS Automech"),
    caption: "CNC turning · Chakan",
  },

  glance: {
    label: "Kaveri GS Automech",
    title: "At a glance",
    stats: [
      { value: 10, suffix: "+", label: "Years in operation" },
      { value: 50, suffix: "+", label: "Active customer relationships" },
      { value: 100, suffix: "+", label: "Product lines dispatched", note: "Cumulative" },
    ],
  },

  purpose: {
    label: "Purpose",
    title: "Mission & vision",
    mission:
      "Deliver manufacturing solutions that meet print, schedule, and cost expectations—while improving methods and tooling so repeat orders stay efficient and predictable.",
    vision:
      "Be a preferred hardware partner for OEMs and Tier suppliers who value transparent communication, documented quality, and consistent delivery from a single Pune-area source.",
  },
};
