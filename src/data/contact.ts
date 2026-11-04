import type { LucideIcon } from "lucide-react";
import { DraftingCompass, Handshake, MessageCircle, MessagesSquare, Package } from "lucide-react";

export type EnquiryTypeId = "product" | "custom" | "technical" | "collaboration" | "general";

export interface EnquiryType {
  id: EnquiryTypeId;
  label: string;
  icon: LucideIcon;
  /** What to include in the message for this kind of enquiry. */
  hint: string;
}

/** Ways to approach the company. These sort enquiries; they are not a list of services. */
export const enquiryTypes: EnquiryType[] = [
  { id: "product", label: "Product enquiry", icon: Package, hint: "Tell us the part name or code, the quantity and when you need it." },
  { id: "custom", label: "Custom manufacturing", icon: DraftingCompass, hint: "Describe the part, material and quantity, and mention if you have a drawing." },
  { id: "technical", label: "Technical discussion", icon: MessagesSquare, hint: "Tell us about the part or process you would like to discuss." },
  { id: "collaboration", label: "Business collaboration", icon: Handshake, hint: "Tell us about your company and what you have in mind." },
  { id: "general", label: "General enquiry", icon: MessageCircle, hint: "Tell us how we can help." },
];

export const enquiryTypeOf = (id: EnquiryTypeId) => enquiryTypes.find((type) => type.id === id)!;

/** Topics named in the page introduction. */
export const contactTopics = ["Industrial enquiries", "Quotations", "Technical discussions", "Business collaborations"];

export const businessHours = {
  label: "Hours (IST)",
  openDays: "Monday–Saturday",
  time: "9:00 – 18:00",
  closedDay: "Sunday",
  opensAt: "9:00",
  closesAt: "18:00",
  openMinute: 9 * 60,
  closeMinute: 18 * 60,
};

/** Monday first. Only Sunday is closed. */
export const weekDays = [
  { short: "M", name: "Monday", open: true },
  { short: "T", name: "Tuesday", open: true },
  { short: "W", name: "Wednesday", open: true },
  { short: "T", name: "Thursday", open: true },
  { short: "F", name: "Friday", open: true },
  { short: "S", name: "Saturday", open: true },
  { short: "S", name: "Sunday", open: false },
];
