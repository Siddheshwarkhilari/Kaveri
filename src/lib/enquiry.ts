import { enquiryTypeOf, type EnquiryTypeId } from "@/data/contact";
import { company } from "@/data/site";

export interface EnquiryValues {
  type: EnquiryTypeId;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export type EnquiryField = Exclude<keyof EnquiryValues, "type">;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const fieldId = (field: EnquiryField) => `enquiry-${field}`;

/**
 * Service that receives enquiries, set with VITE_ENQUIRY_ENDPOINT. The site is static and has
 * no backend of its own, so without one the form hands the enquiry to the visitor's email app.
 */
export const enquiryEndpoint = (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim() || null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s.-]+$/;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That doesn't look like an email address. Please check it.";
  if (phone && (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, "").length < 7)) {
    errors.phone = "Please enter a full phone number, or leave this blank.";
  }
  if (!values.message.trim()) errors.message = "Please tell us a little about what you need.";
  return errors;
}

/** The enquiry as plain text, for the email body and for copying. */
export function formatEnquiry(values: EnquiryValues): string {
  const details = [
    `Enquiry type: ${enquiryTypeOf(values.type).label}`,
    `Name: ${values.name.trim()}`,
    values.company.trim() && `Company: ${values.company.trim()}`,
    `Email: ${values.email.trim()}`,
    values.phone.trim() && `Phone: ${values.phone.trim()}`,
  ].filter(Boolean);
  return `${details.join("\n")}\n\n${values.message.trim()}`;
}

// Mail apps and operating systems can silently cut off or refuse longer mailto links.
const MAILTO_LIMIT = 1800;
const SHORTENED_NOTE = "\n\n[Shortened to fit an email link. Please paste your full enquiry here.]";

export interface EnquiryEmail {
  href: string;
  /** The message was too long for an email link, so the draft holds a shortened copy. */
  shortened: boolean;
}

/** A ready-to-send email draft addressed to both published company addresses. */
export function buildEnquiryEmail(values: EnquiryValues): EnquiryEmail {
  const sender = [values.name.trim(), values.company.trim()].filter(Boolean).join(", ");
  const subject = `${enquiryTypeOf(values.type).label}: ${sender}`;
  const toHref = (body: string) =>
    `${company.email.href}?cc=${encodeURIComponent(company.altEmail.display)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`;

  const full = formatEnquiry(values);
  if (toHref(full).length <= MAILTO_LIMIT) return { href: toHref(full), shortened: false };

  let kept = full;
  while (kept.length > 0 && toHref(kept + SHORTENED_NOTE).length > MAILTO_LIMIT) {
    // Never cut through a surrogate pair, which encodeURIComponent would reject.
    kept = kept.slice(0, -40).replace(/[\uD800-\uDBFF]$/, "");
  }
  return { href: toHref(kept + SHORTENED_NOTE), shortened: true };
}

/** Opens the draft in the visitor's email app, as a link click so the page itself is left alone. */
export function openEmailDraft(href: string) {
  const link = document.createElement("a");
  link.href = href;
  document.body.append(link);
  link.click();
  link.remove();
}

const SEND_TIMEOUT = 20_000;

/** Posts the enquiry to the configured service. Rejects unless the service confirms receipt. */
export async function sendEnquiry(endpoint: string, values: EnquiryValues): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), SEND_TIMEOUT);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        enquiryType: enquiryTypeOf(values.type).label,
        name: values.name.trim(),
        company: values.company.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Enquiry service responded with ${response.status}`);
  } finally {
    window.clearTimeout(timeout);
  }
}
