import { useEffect, useRef, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  suffix?: ReactNode;
  /** Seconds. */
  duration?: number;
  className?: string;
  /**
   * Classes for the visible figure only. Text effects such as bg-clip-text belong here:
   * on the root they would also paint the invisible width-reserving copy.
   */
  numberClassName?: string;
}

/**
 * Counts up to `value` once, the first time it scrolls into view. The final value is
 * reserved invisibly so the layout never shifts, and screen readers only hear the result.
 */
export default function CountUp({ value, suffix, duration = 1.8, className, numberClassName }: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = numberRef.current;
    if (!node || !inView) return;
    if (reduceMotion) {
      node.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: ease.out,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
      onComplete: () => {
        node.textContent = String(value);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={rootRef} className={cn("relative inline-grid tabular-nums", className)}>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="[grid-area:1/1]">
        <span ref={numberRef} className={numberClassName}>
          {reduceMotion ? value : 0}
        </span>
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
