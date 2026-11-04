import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ControlButtonProps {
  label: string;
  onClick: () => void;
  testId?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

/** Round icon button for media controls (prev / next / play) on dark brand surfaces. */
export function ControlButton({ label, onClick, testId, className, disabled, children }: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-testid={testId}
      disabled={disabled}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full text-white/75 ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10 [&_svg]:h-4 [&_svg]:w-4",
        className,
      )}
    >
      {children}
    </button>
  );
}
