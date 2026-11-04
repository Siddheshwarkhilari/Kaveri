import { Check, Copy, X } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  /** What is being copied, e.g. "phone number". */
  what: string;
  /** Surface the button sits on. */
  tone?: "light" | "dark";
  testId?: string;
  className?: string;
}

/** Small button that copies a contact detail, for desktops where a tel: link goes nowhere. */
export default function CopyButton({ text, what, tone = "light", testId, className }: CopyButtonProps) {
  const { state, copy } = useCopy();
  const Icon = state === "copied" ? Check : state === "failed" ? X : Copy;

  return (
    <>
      <button
        type="button"
        onClick={() => copy(text)}
        aria-label={`Copy ${what}`}
        title={`Copy ${what}`}
        data-testid={testId}
        className={cn(
          "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2",
          tone === "light"
            ? "text-steel-400 hover:bg-kaveri-50 hover:text-kaveri-700 focus-visible:ring-kaveri-500"
            : "text-white/55 hover:bg-white/10 hover:text-white focus-visible:ring-swoosh-400",
          state === "copied" && (tone === "light" ? "text-emerald-600 hover:text-emerald-600" : "text-emerald-300 hover:text-emerald-300"),
          state === "failed" && "text-red-500 hover:text-red-500",
          className,
        )}
      >
        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? `Copied ${what}` : state === "failed" ? `Could not copy ${what}` : ""}
      </span>
    </>
  );
}
