import type { ComponentType, ReactNode, SVGProps } from "react";
import { Link } from "wouter";
import { m, useReducedMotion, type Variants } from "motion/react";
import { ArrowUp, ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { featuredProducts } from "@/data/featuredProducts";
import { company, mapsUrl, navLinks, partnerLogos, quoteLink } from "@/data/site";
import { ease, fadeUp, revealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Product families, taken from the featured products' own categories.
const productFamilies = Array.from(new Set(featuredProducts.map((product) => product.category)));

const tileReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: ease.out } },
};

const wordmarkReveal: Variants = {
  hidden: { opacity: 0, y: "35%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 1.2, ease: ease.out } },
};

/**
 * Site footer: a dark framed panel that mirrors the hero — brand, navigation, contact,
 * product range and partners over a blueprint grid, closing on an oversized wordmark.
 */
export default function Footer() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const contacts: ContactItemProps[] = [
    {
      icon: Phone,
      label: "Call",
      href: company.phone.href,
      testId: "text-phone",
      children: company.phone.display,
    },
    {
      icon: Mail,
      label: "Email",
      href: company.email.href,
      testId: "text-email",
      children: company.email.display,
    },
    {
      icon: MapPin,
      label: "Visit · Open in Maps",
      href: mapsUrl,
      external: true,
      testId: "text-address",
      children: company.address.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      )),
    },
  ];

  return (
    <footer className="mt-auto bg-white px-3 pb-3 sm:px-4 sm:pb-4" data-testid="footer">
      <div className="relative isolate overflow-hidden rounded-[20px] bg-ink-950 text-white ring-1 ring-ink-950/10 sm:rounded-[28px]">
        <div
          aria-hidden="true"
          className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_30%,transparent_80%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_0%_0%,rgba(18,81,192,0.22),transparent_70%),radial-gradient(35%_45%_at_100%_100%,rgba(27,187,255,0.08),transparent_70%)]"
        />
        <div aria-hidden="true" className="bg-ruler absolute inset-x-0 top-0 h-[9px]" />

        <m.div
          variants={revealStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mx-auto max-w-7xl px-6 pt-16 sm:px-10 lg:px-12 lg:pt-20"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <m.div variants={fadeUp} className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm">
                  <img src="/optimized/logo/logo-128.png" alt="" width={36} height={36} loading="lazy" className="h-9 w-9 object-contain" />
                </span>
                <span className="leading-none">
                  <span className="block font-display text-lg font-semibold tracking-tight">{company.name}</span>
                  <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{company.tagline}</span>
                </span>
              </Link>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">{company.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={quoteLink.path} className={cn(buttonVariants({ variant: "brand", size: "xl" }), "group")}>
                  {quoteLink.label}
                  <ArrowUpRight className="transition-transform duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={company.brochure.href}
                  download={company.brochure.fileName}
                  className={cn(buttonVariants({ variant: "glass", size: "xl" }), "group")}
                  data-testid="link-footer-brochure"
                >
                  <Download className="transition-transform duration-300 ease-precise group-hover:translate-y-0.5" />
                  Company brochure
                </a>
              </div>
            </m.div>

            {/* Navigation */}
            <m.nav variants={fadeUp} aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
              <FooterHeading>Navigate</FooterHeading>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 sm:grid-cols-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      data-testid={`footer-link-${link.testId}`}
                      className="group inline-flex items-center gap-2 rounded py-1.5 text-[15px] text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-swoosh-400 transition-transform duration-300 ease-precise group-hover:scale-x-100" />
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 ease-precise group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </m.nav>

            {/* Contact */}
            <m.div variants={fadeUp} className="lg:col-span-4 lg:col-start-10 lg:-mr-3">
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-3 space-y-1">
                {contacts.map((item) => (
                  <li key={item.label}>
                    <ContactItem {...item} />
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* Product range and partners */}
          <m.div
            variants={fadeUp}
            className="mt-14 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-12 lg:items-start lg:gap-8"
          >
            <div className="lg:col-span-6">
              <FooterHeading>Product range</FooterHeading>
              <ul className="mt-5 flex flex-wrap gap-2">
                {productFamilies.map((family) => (
                  <li
                    key={family}
                    className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[13px] text-white/70 ring-1 ring-inset ring-white/10"
                  >
                    {family}
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                data-testid="footer-link-catalogue"
                className="group mt-5 inline-flex items-center gap-2 rounded text-sm font-semibold text-swoosh-300 transition-colors hover:text-swoosh-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400"
              >
                Browse the full catalogue
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <FooterHeading>Partners</FooterHeading>
              <m.ul variants={revealStagger} className="mt-5 grid max-w-sm grid-cols-4 gap-3 sm:flex sm:max-w-none">
                {partnerLogos.map((logo, i) => (
                  <m.li key={logo.src} variants={tileReveal}>
                    <div
                      data-testid={`partner-logo-${i + 1}`}
                      className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10 transition duration-500 ease-precise hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(27,187,255,0.55)] hover:ring-swoosh-400/40 motion-reduce:hover:translate-y-0 sm:h-20 sm:w-20"
                    >
                      <img
                        src={logo.src}
                        alt={logo.label}
                        width={256}
                        height={256}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-70 grayscale transition duration-500 ease-precise group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                  </m.li>
                ))}
              </m.ul>
            </div>
          </m.div>

          {/* Wordmark */}
          <div aria-hidden="true" className="mt-14 overflow-hidden">
            <m.p
              variants={wordmarkReveal}
              className="select-none bg-gradient-to-b from-white/[0.16] to-white/[0.02] bg-clip-text text-center font-display text-[clamp(4.5rem,19vw,16.5rem)] font-bold leading-[0.8] tracking-[-0.045em] text-transparent"
            >
              KAVERI
            </m.p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {company.name}. All rights reserved.
            </p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">{company.location}</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
              className="group inline-flex items-center gap-3 self-start rounded-full text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400 sm:self-auto"
              data-testid="button-back-to-top"
            >
              Back to top
              <span className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-inset ring-white/15 transition-colors group-hover:bg-white/10">
                <ArrowUp className="h-4 w-4 transition-transform duration-300 ease-precise group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </m.div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
      <span aria-hidden="true" className="h-px w-6 bg-swoosh-400/60" />
      {children}
    </h2>
  );
}

interface ContactItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  external?: boolean;
  testId: string;
  children: ReactNode;
}

function ContactItem({ icon: Icon, label, href, external, testId, children }: ContactItemProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group -mx-3 flex items-start gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swoosh-400"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-swoosh-300 ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-kaveri-600 group-hover:text-white">
        <Icon aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-500 ease-precise group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transform-none" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</span>
        <span className="mt-1 block break-words text-[15px] leading-snug text-white/85 transition-colors group-hover:text-white" data-testid={testId}>
          {children}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="mt-1 h-4 w-4 shrink-0 text-white/25 transition duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-swoosh-300"
      />
    </a>
  );
}
