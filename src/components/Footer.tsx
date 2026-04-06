import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const supportLinks = [
    { label: "Contact", path: "/contact" },
    { label: "Products", path: "/products" },
    { label: "Gallery", path: "/gallery" },
  ];

  const partnerLogos = [
    "/partner_logos/partner-logo-1.png",
    "/partner_logos/partner-logo-2.png",
    "/partner_logos/partner-logo-3.png",
    "/partner_logos/partner-logo-4.png",
  ];

  return (
    <footer className="bg-white border-t border-slate-200/90 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          <div>
            <h3 className="font-heading font-semibold text-slate-900 text-sm mb-4">Company</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Industrial hardware and fabricated parts. We serve OEM and tier suppliers who need clear specs, reliable
              quality, and on-time delivery.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/about" data-testid="link-about">
                <span className="text-slate-600 hover:text-slate-900 transition-colors">About</span>
              </Link>
              <Link href="/contact" data-testid="link-story">
                <span className="text-slate-600 hover:text-slate-900 transition-colors">Contact</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-slate-900 text-sm mb-4">Quick links</h3>
            <div className="space-y-2">
              {supportLinks.map((link) => (
                <div key={link.path}>
                  <Link href={link.path} data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}>
                    <span className="text-sm text-slate-600 hover:text-slate-900 transition-colors">{link.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-slate-900 text-sm mb-4">Partners</h3>
            <div className="grid grid-cols-2 gap-3">
              {partnerLogos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-md border border-slate-200/80 p-3 flex items-center justify-center min-h-[4rem]"
                  data-testid={`partner-logo-${index + 1}`}
                >
                  <img
                    src={logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 w-auto object-contain opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='32' viewBox='0 0 80 32'%3E%3Crect width='80' height='32' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='9' fill='%2394a3b8'%3EPartner%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/80 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400 shrink-0" aria-hidden />
              <span data-testid="text-phone">+91 9356561166</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400 shrink-0" aria-hidden />
              <a href="mailto:info@kaverigsautomech.com" className="hover:text-slate-900 transition-colors">
                <span data-testid="text-email">info@kaverigsautomech.com</span>
              </a>
            </div>
            <div className="flex items-start gap-2 max-w-md">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" aria-hidden />
              <div className="flex flex-col leading-snug">
                <span data-testid="text-address">Plot No. 1, Gate No. 483, Mahalaxmi Industrial Street,</span>
                <span>Near Bhangare West, Mahalunge-Varude Road,</span>
                <span>Chakan, Pune - 410501, India</span>
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} Kaveri GS Automech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
