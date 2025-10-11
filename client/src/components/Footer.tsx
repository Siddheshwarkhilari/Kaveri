import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const productLinks = [
    "Cable Tray Fittings",
    "Heavy Duty Hinges",
    "Refer Truck Locksets",
    "Fasteners",
  ];

  const supportLinks = [
    { label: "Contact Us", path: "/contact" },
    { label: "Technical Support", path: "/contact" },
    { label: "Documentation", path: "/products" },
  ];

  const partnerLogos = [
    "/partner_logos/partner-logo-1.png",
    "/partner_logos/partner-logo-2.png",
    "/partner_logos/partner-logo-3.png",
    "/partner_logos/partner-logo-4.png",
  ];

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">COMPANY</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Your trusted partner for quality hardware and manufacturing solutions. Excellence in precision, reliability in every component.
            </p>
            <div className="space-y-2">
              <Link href="/about" data-testid="link-about">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">About Us</span>
              </Link>
              <br />
              <Link href="/about" data-testid="link-story">
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">Our Story</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">SUPPORT</h3>
            <div className="space-y-2">
              {supportLinks.map((link, index) => (
                <div key={index}>
                  <Link href={link.path} data-testid={`link-${link.label.toLowerCase().replace(' ', '-')}`}>
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">OUR PARTNERS</h3>
            <div className="grid grid-cols-2 gap-4">
              {partnerLogos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-background rounded-md p-3 flex items-center justify-center hover-elevate transition-all duration-300"
                  data-testid={`partner-logo-${index + 1}`}
                >
                  <img
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='32' viewBox='0 0 80 32'%3E%3Crect width='80' height='32' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%239CA3AF'%3EPartner ${index + 1}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span data-testid="text-phone">+91 9356561166</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span data-testid="text-email">kaveri.gs01@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span data-testid="text-address">Plot no:1, Gate No. 483 Mahalaxmi Industrial Street,Near Bhangare West, Mahalunge-Varude Road, Chakan
Pune-410501, India</span>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kaveri GS Automech. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
