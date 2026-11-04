import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearch } from "wouter";
import { AnimatePresence, m, type Variants } from "motion/react";
import { ArrowRight, Building2, Check, CircleAlert, LoaderCircle, Mail, MessageSquareText, Package, Phone, UserRound } from "lucide-react";
import WordReveal from "@/components/motion/WordReveal";
import { company } from "@/data/site";
import type { EnquiryTypeId } from "@/data/contact";
import {
  buildEnquiryEmail,
  enquiryEndpoint,
  fieldId,
  openEmailDraft,
  sendEnquiry,
  validateEnquiry,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/enquiry";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import EnquiryResult from "./EnquiryResult";
import EnquiryTypeSelector from "./EnquiryTypeSelector";
import FormField from "./FormField";

type Status = "editing" | "sending" | "failed" | "sent" | "handedOff";

const FIELD_ORDER: EnquiryField[] = ["name", "company", "email", "phone", "message"];

const titleWord: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: ease.out } },
};

interface FormSectionProps {
  title: string;
  complete: boolean;
  last?: boolean;
  children: ReactNode;
}

/** One part of the form on a progress rail: its marker fills in once the part is complete. */
function FormSection({ title, complete, last, children }: FormSectionProps) {
  return (
    <m.div variants={fadeUp} className="relative">
      {!last && (
        <span aria-hidden="true" className="absolute bottom-[-1.75rem] left-[11px] top-7 hidden w-px bg-steel-200 sm:block">
          <span
            className={cn(
              "block h-full w-full origin-top bg-gradient-to-b from-kaveri-600 to-kaveri-300 transition-transform duration-700 ease-precise",
              complete ? "scale-y-100" : "scale-y-0",
            )}
          />
        </span>
      )}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "grid h-6 w-6 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-colors duration-500",
            complete ? "bg-kaveri-600 text-white ring-kaveri-600" : "bg-white text-steel-300 ring-steel-300",
          )}
        >
          {complete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        </span>
        <h3 className="font-display text-[1.08rem] font-semibold tracking-[-0.01em] text-ink-950">{title}</h3>
      </div>
      <div className="mt-4 sm:pl-9">{children}</div>
    </m.div>
  );
}

/**
 * The enquiry form. With an enquiry service configured it posts to that service and reports
 * the real outcome; without one it opens a ready-to-send email draft and says so, because the
 * site has no backend of its own. It never reports success on its own account.
 */
export default function EnquiryForm() {
  // Product pages link here with ?product=<name> to start an enquiry about that part.
  const product = new URLSearchParams(useSearch()).get("product");
  const emptyValues = useMemo<EnquiryValues>(
    () => ({ type: "general", name: "", company: "", email: "", phone: "", message: "" }),
    [],
  );
  const [values, setValues] = useState<EnquiryValues>(() =>
    product ? { ...emptyValues, type: "product", message: `Enquiry about: ${product}\n\n` } : emptyValues,
  );
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("editing");
  const [attemptedInvalid, setAttemptedInvalid] = useState(false);
  const sending = useRef(false);

  const errors = useMemo(() => validateEnquiry(values), [values]);
  const isSending = status === "sending";
  const showResult = status === "sent" || status === "handedOff";

  const setField = (field: EnquiryField, value: string) => setValues((current) => ({ ...current, [field]: value }));

  // Empty fields aren't flagged just for being passed over; submitting checks those.
  const markTouched = (field: EnquiryField) => {
    if (values[field].trim()) setTouched((current) => ({ ...current, [field]: true }));
  };

  const fieldProps = (field: EnquiryField) => ({
    id: fieldId(field),
    value: values[field],
    onChange: (value: string) => setField(field, value),
    onBlur: () => markTouched(field),
    error: touched[field] ? errors[field] : undefined,
    valid: Boolean(touched[field] && !errors[field] && values[field].trim()),
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending.current) return;

    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));
    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      setAttemptedInvalid(true);
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    setAttemptedInvalid(false);

    if (!enquiryEndpoint) {
      openEmailDraft(buildEnquiryEmail(values).href);
      setStatus("handedOff");
      return;
    }

    sending.current = true;
    setStatus("sending");
    try {
      await sendEnquiry(enquiryEndpoint, values);
      setStatus("sent");
    } catch {
      setStatus("failed");
    } finally {
      sending.current = false;
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setTouched({});
    setStatus("editing");
  };

  const detailsComplete = Boolean(values.name.trim() && values.email.trim() && !errors.name && !errors.email && !errors.phone);

  return (
    <m.article
      id="enquiry"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.9, ease: ease.out }}
      aria-labelledby="enquiry-title"
      className="relative scroll-mt-28 overflow-hidden rounded-[28px] bg-white shadow-[0_2px_4px_rgba(10,19,36,0.04),0_40px_80px_-48px_rgba(10,19,36,0.45)] ring-1 ring-steel-200"
      data-testid="card-enquiry-form"
    >
      <div aria-hidden="true" className="bg-ruler-light h-2" />

      <AnimatePresence mode="wait">
        {showResult ? (
          <m.div key="result" exit={{ opacity: 0, transition: { duration: 0.18 } }}>
            <p id="enquiry-title" className="sr-only">
              Enquiry form
            </p>
            <EnquiryResult
              kind={status === "sent" ? "sent" : "handedOff"}
              values={values}
              onEdit={() => setStatus("editing")}
              onReset={reset}
            />
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            aria-busy={isSending}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            data-testid="form-enquiry"
          >
            <m.div
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-9"
            >
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-kaveri-700">
                <span aria-hidden="true" className="h-px w-8 bg-kaveri-500" />
                Enquiry form
              </p>
              <h2
                id="enquiry-title"
                className="mt-4 font-display text-[2.1rem] font-bold leading-[1.04] tracking-[-0.03em] text-ink-950 sm:text-[2.75rem]"
              >
                <WordReveal text="Tell us what you need" variants={titleWord} />
              </h2>
              <m.p variants={fadeUp} className="mt-3 max-w-xl text-[16px] leading-relaxed text-steel-600">
                Share a few details about your requirement. We respond to business enquiries on working days. Fields marked{" "}
                <span aria-hidden="true" className="font-semibold text-kaveri-600">
                  *
                </span>
                <span className="sr-only">with an asterisk</span> are required.
              </m.p>

              {product && (
                <m.p
                  variants={fadeUp}
                  className="mt-4 inline-flex max-w-full items-start gap-2 rounded-2xl bg-kaveri-50 px-3.5 py-2 text-[13.5px] leading-snug text-ink-800 ring-1 ring-inset ring-kaveri-100"
                  data-testid="text-enquiry-product"
                >
                  <Package aria-hidden="true" className="mt-px h-4 w-4 shrink-0 text-kaveri-600" strokeWidth={1.8} />
                  <span className="min-w-0 break-words">
                    Enquiring about: <span className="font-semibold">{product}</span>
                  </span>
                </m.p>
              )}

              <fieldset disabled={isSending} className="mt-9 min-w-0 space-y-7 border-0 p-0">
                <FormSection title="What is this about?" complete>
                  <EnquiryTypeSelector value={values.type} onChange={(type: EnquiryTypeId) => setValues((current) => ({ ...current, type }))} />
                </FormSection>

                <FormSection title="Your details" complete={detailsComplete}>
                  {/* Side by side only where the form is wide enough to show a whole email address */}
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <FormField {...fieldProps("name")} label="Name" icon={UserRound} required autoComplete="name" autoCapitalize="words" testId="input-name" />
                    <FormField {...fieldProps("company")} label="Company" icon={Building2} autoComplete="organization" autoCapitalize="words" testId="input-company" />
                    <FormField {...fieldProps("email")} label="Email" icon={Mail} type="email" inputMode="email" required autoComplete="email" autoCapitalize="none" testId="input-email" />
                    <FormField {...fieldProps("phone")} label="Phone" icon={Phone} type="tel" inputMode="tel" autoComplete="tel" testId="input-phone" />
                  </div>
                </FormSection>

                <FormSection title="Your message" complete={!errors.message} last>
                  <FormField {...fieldProps("message")} label="Message" icon={MessageSquareText} required multiline testId="input-message" />
                </FormSection>
              </fieldset>
            </m.div>

            <div className="border-t border-steel-200 bg-steel-50 px-6 py-6 sm:px-10">
              <AnimatePresence initial={false}>
                {status === "failed" && (
                  <m.div
                    role="alert"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: ease.out }}
                    className="overflow-hidden"
                    data-testid="enquiry-send-error"
                  >
                    <p className="mb-4 flex gap-3 rounded-xl bg-red-50 px-4 py-3 text-[14px] leading-relaxed text-red-900 ring-1 ring-inset ring-red-200">
                      <CircleAlert aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-red-600" strokeWidth={1.9} />
                      <span>
                        We couldn&rsquo;t send your enquiry, and it has not reached us. What you typed is still here, so please try again, or write to{" "}
                        <a href={company.email.href} className="font-semibold underline underline-offset-2">
                          {company.email.display}
                        </a>{" "}
                        or call{" "}
                        <a href={company.phone.href} className="font-semibold underline underline-offset-2">
                          {company.phone.display}
                        </a>
                        .
                      </span>
                    </p>
                  </m.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <p className="max-w-md text-[13.5px] leading-relaxed text-steel-600" aria-live="polite" data-testid="text-enquiry-note">
                  {attemptedInvalid && Object.keys(errors).length > 0
                    ? "Please fix the highlighted fields and try again."
                    : enquiryEndpoint
                      ? "Your enquiry goes straight to our team."
                      : "This opens your email app with your enquiry filled in, ready to send to us. Nothing is sent until you press Send."}
                </p>
                <button
                  type="submit"
                  disabled={isSending}
                  className="group relative inline-flex min-h-14 shrink-0 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-kaveri-600 pl-6 pr-2.5 text-[15px] font-semibold text-white shadow-[0_18px_36px_-16px_rgba(18,81,192,0.9)] transition duration-300 ease-precise hover:-translate-y-0.5 hover:bg-kaveri-500 hover:shadow-[0_24px_44px_-16px_rgba(18,81,192,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kaveri-500 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-wait disabled:bg-kaveri-400 disabled:shadow-none motion-reduce:hover:translate-y-0"
                  data-testid="button-send-message"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/15 opacity-0 transition-[left,opacity] duration-700 ease-precise group-hover:left-full group-hover:opacity-100 motion-reduce:hidden"
                  />
                  <span className="relative">{isSending ? "Sending…" : enquiryEndpoint ? "Send enquiry" : "Continue in email"}</span>
                  <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/15 transition-colors duration-300 group-hover:bg-white/25">
                    {isSending ? (
                      <LoaderCircle aria-hidden="true" className="h-[18px] w-[18px] animate-spin" />
                    ) : (
                      <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-300 ease-precise group-hover:translate-x-0.5" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </m.article>
  );
}
