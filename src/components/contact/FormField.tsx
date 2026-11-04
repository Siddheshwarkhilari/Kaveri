import type { ChangeEvent, HTMLAttributes } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, CircleAlert, type LucideIcon } from "lucide-react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

// The label sits inside the field until there is something to make room for.
const labelStates = [
  "peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:tracking-[0.01em]",
  "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:tracking-[0.01em]",
  "peer-[:-webkit-autofill]:top-2 peer-[:-webkit-autofill]:text-[11px] peer-[:-webkit-autofill]:font-medium",
].join(" ");

// 16px on phones stops iOS zooming the page when a field takes focus.
const controlClass =
  "peer block w-full scroll-mt-32 rounded-2xl bg-transparent pl-11 pr-11 text-base text-ink-950 outline-none placeholder:text-transparent disabled:cursor-not-allowed disabled:text-steel-500 sm:text-[15px] [&:-webkit-autofill]:[-webkit-text-fill-color:#0A1324] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff]";

interface FormFieldProps {
  /** Used for the control's id and as the root of its message's id. */
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  required?: boolean;
  /** Message to show, once the visitor has had a chance to fill the field in. */
  error?: string;
  /** Show the tick: the visitor has filled the field in correctly. */
  valid?: boolean;
  multiline?: boolean;
  testId: string;
  type?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  autoCapitalize?: string;
}

/**
 * Text field with a label that floats out of the way, an underline that draws in on focus,
 * and a tick or a message once it has been filled in.
 */
export default function FormField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  required,
  error,
  valid,
  multiline,
  testId,
  type = "text",
  autoComplete,
  inputMode,
  autoCapitalize,
}: FormFieldProps) {
  const messageId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    required,
    onBlur,
    autoComplete,
    autoCapitalize,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? messageId : undefined,
    "data-testid": testId,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };

  return (
    <div>
      <div
        className={cn(
          "group relative rounded-2xl ring-1 ring-inset transition-[background-color,box-shadow] duration-300 focus-within:bg-white",
          error
            ? "bg-red-50/50 ring-red-400 focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] focus-within:ring-red-500"
            : "bg-steel-50 ring-steel-200 hover:ring-steel-300 focus-within:shadow-[0_0_0_4px_rgba(18,81,192,0.1)] focus-within:ring-kaveri-500",
        )}
      >
        {multiline ? (
          <textarea {...shared} rows={6} maxLength={4000} className={cn(controlClass, "min-h-[10.5rem] resize-y pb-3 pt-7 leading-relaxed")} />
        ) : (
          <input {...shared} type={type} inputMode={inputMode} className={cn(controlClass, "h-[3.75rem] pb-2 pt-6")} />
        )}

        <Icon
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-4 top-[1.3rem] h-[18px] w-[18px] transition-colors duration-300",
            error ? "text-red-500" : "text-steel-400 group-focus-within:text-kaveri-600",
          )}
          strokeWidth={1.8}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-11 top-[1.15rem] cursor-text text-[15px] transition-all duration-200 ease-precise",
            labelStates,
            error ? "text-red-700" : "text-steel-500 peer-focus:text-kaveri-700",
          )}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-kaveri-600">
              *
            </span>
          )}
        </label>

        {/* The underline draws in from the left on focus */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-precise group-focus-within:scale-x-100",
            error ? "bg-red-500" : "bg-gradient-to-r from-kaveri-600 to-swoosh-400",
          )}
        />

        <AnimatePresence initial={false}>
          {(error || valid) && (
            <m.span
              key={error ? "error" : "valid"}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.12 } }}
              transition={{ duration: 0.3, ease: ease.out }}
              className="pointer-events-none absolute right-3.5 top-[1.2rem]"
            >
              {error ? (
                <CircleAlert className="h-5 w-5 text-red-500" strokeWidth={1.9} />
              ) : (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
            </m.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <m.p
            key={error}
            id={messageId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: ease.out }}
            className="overflow-hidden text-[13px] font-medium text-red-700"
            data-testid={`${testId}-error`}
          >
            <span className="block px-1 pt-1.5">{error}</span>
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
