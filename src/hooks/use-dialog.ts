import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Modal dialog behaviour: locks page scroll (keeping the scrollbar gutter so nothing
 * shifts), closes on Escape, keeps Tab focus inside the dialog, and returns focus to
 * whatever opened it when the dialog closes, or to `returnFocusTo()` when that finds an element
 * (scrolling it into view), for dialogs that can move on from the item that opened them.
 */
export function useDialog(
  dialogRef: RefObject<HTMLElement>,
  onClose: () => void,
  options: { returnFocusTo?: () => HTMLElement | null } = {},
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const returnFocusRef = useRef(options.returnFocusTo);
  returnFocusRef.current = options.returnFocusTo;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const previous = { overflow: root.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";

    const focusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.closest('[aria-hidden="true"]') && el.offsetParent !== null,
      );
    (dialog.querySelector<HTMLElement>("[data-autofocus]") ?? focusable()[0] ?? dialog).focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previous.overflow;
      root.style.scrollbarGutter = previous.gutter;
      const target = returnFocusRef.current?.() ?? opener;
      target?.focus({ preventScroll: true });
      if (target && target !== opener) target.scrollIntoView({ block: "nearest" });
    };
  }, [dialogRef]);
}
