import { useEffect, useId, useState, type FocusEvent } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { isActivePath, navLinks, quoteLink } from "@/data/site";
import { useHeadroom } from "@/hooks/use-headroom";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pill = "rounded-2xl bg-ink-950/65 ring-1 ring-white/10 backdrop-blur-xl shadow-[0_16px_40px_-20px_rgba(5,11,23,0.6)]";

/**
 * Two floating pills — brand top-left, navigation top-right — leaving the middle of the
 * hero video clear. They slide away while scrolling down and return when scrolling up.
 */
export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const scrolledAway = useHeadroom();
  const menuId = useId();
  const overHero = location === "/";
  const hidden = scrolledAway && !menuOpen && !keyboardFocus;

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Keyboard users tabbing into a hidden navbar bring it back into view.
  const onFocus = (e: FocusEvent<HTMLElement>) => {
    if (e.target.matches(":focus-visible")) setKeyboardFocus(true);
  };
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="menu-backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-[transform,opacity] duration-500 ease-precise motion-reduce:transition-opacity sm:px-4 sm:pt-4",
          hidden ? "-translate-y-[130%] opacity-0" : "translate-y-0 opacity-100",
        )}
        data-hidden={hidden || undefined}
      >
        <nav
          aria-label="Primary"
          className="max-w-hero relative mx-auto flex items-start justify-between gap-4 px-5 pt-5 lg:px-6 lg:pt-6"
        >
          <Link
            href="/"
            data-testid="link-home"
            className={cn(
              pill,
              "flex h-14 min-w-0 items-center gap-3 pl-2 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400",
              !hidden && "pointer-events-auto",
            )}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white">
              <img
                src="/logo/logo.png"
                alt=""
                width={32}
                height={32}
                decoding="async"
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />
            </span>
            <span className="min-w-0 truncate font-display text-[15px] font-semibold leading-none tracking-tight text-white sm:text-base">
              Kaveri GS Automech
            </span>
          </Link>

          <div className={cn(pill, "hidden h-14 items-center gap-1 p-1.5 lg:flex", !hidden && "pointer-events-auto")}>
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const active = isActivePath(location, link.path);
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      aria-current={active ? "page" : undefined}
                      data-testid={`link-${link.testId}`}
                      className={cn(
                        "relative block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 xl:px-4",
                        active ? "text-white" : "text-white/65 hover:text-white",
                      )}
                    >
                      {active && (
                        <m.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-xl bg-white/[0.08] ring-1 ring-inset ring-white/15"
                          transition={{ duration: 0.45, ease: ease.out }}
                        >
                          <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-swoosh-400 to-transparent" />
                        </m.span>
                      )}
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={quoteLink.path}
              data-testid="link-request-quote"
              className={cn(buttonVariants({ variant: "brand" }), "group ml-1 h-11 rounded-xl px-4")}
            >
              {quoteLink.label}
              <ArrowUpRight className="transition-transform duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
            className={cn(
              pill,
              "grid h-14 w-14 shrink-0 place-items-center text-white transition-colors hover:bg-ink-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 lg:hidden",
              !hidden && "pointer-events-auto",
            )}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <m.div
                id={menuId}
                key="mobile-menu"
                className="pointer-events-auto absolute right-5 top-[calc(100%+0.5rem)] w-[min(20rem,calc(100vw-3.5rem))] origin-top-right rounded-2xl bg-ink-950/90 p-2 shadow-[0_24px_60px_-20px_rgba(5,11,23,0.7)] ring-1 ring-white/10 backdrop-blur-xl lg:hidden"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.22, ease: ease.out }}
              >
                <ul>
                  {navLinks.map((link) => {
                    const active = isActivePath(location, link.path);
                    return (
                      <li key={link.path}>
                        <Link
                          href={link.path}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                          data-testid={`mobile-link-${link.testId}`}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400",
                            active ? "bg-white/[0.07] text-white" : "text-white/70 hover:bg-white/[0.04] hover:text-white",
                          )}
                        >
                          {link.label}
                          {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-swoosh-400" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={quoteLink.path}
                  onClick={() => setMenuOpen(false)}
                  className={cn(buttonVariants({ variant: "brand", size: "xl" }), "mt-2 w-full")}
                >
                  {quoteLink.label}
                  <ArrowUpRight />
                </Link>
              </m.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {!overHero && <div aria-hidden="true" className="h-[6.5rem] sm:h-[6.75rem] lg:h-[7rem]" />}
    </>
  );
}
