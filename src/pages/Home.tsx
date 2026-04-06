import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Building2, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const heroSlides = [
    {
      image: "/slides/slide-1.webp",
      title: "Quality hardware solutions",
      description:
        "Manufacturing components for industrial applications with consistent quality and dependable delivery.",
      buttonText: "Explore products",
      buttonLink: "/products",
    },
    {
      image: "/slides/slide-2.webp",
      title: "Precision engineering",
      description:
        "Modern equipment and experienced teams focused on tolerances, repeatability, and traceability.",
      buttonText: "View gallery",
      buttonLink: "/gallery",
    },
    {
      image: "/slides/slide-3.webp",
      title: "Partners in production",
      description:
        "From prototypes to batch runs, we align with your drawings, timelines, and quality expectations.",
      buttonText: "About us",
      buttonLink: "/about",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroCarousel slides={heroSlides} />

      <section className="py-16 md:py-24 border-t border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">Overview</p>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-slate-900 tracking-tight mb-5">
              Who we are
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Kaveri GS Automech supplies hardware and fabricated parts for industrial customers. We combine
              disciplined shop-floor practices with clear communication—so specifications are met and deliveries stay
              predictable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-7 text-center">
                <div className="bg-slate-100 w-14 h-14 rounded-md flex items-center justify-center mx-auto mb-5 border border-slate-200/80">
                  <Building2 className="h-7 w-7 text-slate-700" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-slate-900">Controlled manufacturing</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Equipment and workflows geared toward repeatability, inspection, and clean documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-7 text-center">
                <div className="bg-slate-100 w-14 h-14 rounded-md flex items-center justify-center mx-auto mb-5 border border-slate-200/80">
                  <Target className="h-7 w-7 text-slate-700" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-slate-900">Application-driven support</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  We work from your drawings and constraints—material, finish, load, and environment—before we cut metal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-7 text-center">
                <div className="bg-slate-100 w-14 h-14 rounded-md flex items-center justify-center mx-auto mb-5 border border-slate-200/80">
                  <Award className="h-7 w-7 text-slate-700" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-slate-900">Long-term reliability</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Parts are checked against agreed criteria so what leaves the plant matches what you approved on paper.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedProducts />
    </div>
  );
}
