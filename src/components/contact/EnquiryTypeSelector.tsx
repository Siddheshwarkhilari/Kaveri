import { AnimatePresence, m } from "motion/react";
import { enquiryTypeOf, enquiryTypes, type EnquiryTypeId } from "@/data/contact";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface EnquiryTypeSelectorProps {
  value: EnquiryTypeId;
  onChange: (value: EnquiryTypeId) => void;
}

/**
 * Choice of enquiry type, built on native radio buttons (so arrow keys work). The highlight
 * slides to the chosen one, and a line beneath says what to include in the message.
 */
export default function EnquiryTypeSelector({ value, onChange }: EnquiryTypeSelectorProps) {
  return (
    <fieldset data-testid="enquiry-type">
      <legend className="sr-only">What is your enquiry about?</legend>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {enquiryTypes.map(({ id, label, icon: Icon }) => {
          const selected = id === value;
          return (
            <label key={id} className="relative cursor-pointer" data-testid={`enquiry-type-${id}`}>
              <input
                type="radio"
                name="enquiry-type"
                value={id}
                checked={selected}
                onChange={() => onChange(id)}
                className="peer sr-only"
              />
              {selected && (
                <m.span
                  layoutId="enquiry-type-highlight"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink-950 shadow-[0_10px_20px_-12px_rgba(10,19,36,0.7)]"
                  transition={{ type: "spring", bounce: 0.16, duration: 0.5 }}
                />
              )}
              <span
                className={cn(
                  "relative flex min-h-11 items-center gap-2 rounded-full px-3.5 text-[13.5px] font-medium ring-1 ring-inset transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-kaveri-500 peer-focus-visible:ring-offset-2",
                  selected ? "text-white ring-transparent" : "bg-white text-ink-800 ring-steel-200 hover:bg-kaveri-50 hover:text-kaveri-800 hover:ring-kaveri-200",
                )}
              >
                <Icon aria-hidden="true" className={cn("h-4 w-4 shrink-0", selected ? "text-swoosh-300" : "text-steel-400")} strokeWidth={1.8} />
                {label}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-3 min-h-6">
        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="text-[14px] leading-relaxed text-steel-600"
            data-testid="text-enquiry-hint"
          >
            {enquiryTypeOf(value).hint}
          </m.p>
        </AnimatePresence>
      </div>
    </fieldset>
  );
}
