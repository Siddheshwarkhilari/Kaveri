import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Building2, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const heroSlides = [
    {
      image: "/slides/slide1.jpg",
      title: "Quality Hardware Solutions",
      description: "Premium manufacturing components for industrial applications with unmatched reliability",
      buttonText: "Explore Products",
      buttonLink: "/products"
    },
    {
      image: "/slides/slide2.jpg",
      title: "Precision Engineering",
      description: "Advanced manufacturing capabilities with state-of-the-art technology and expertise",
      buttonText: "View Gallery",
      buttonLink: "/gallery"
    },
    {
      image: "/slides/slide3.jpg",
      title: "Trusted Excellence",
      description: "Delivering innovation and reliability in every component we manufacture",
      buttonText: "Learn More",
      buttonLink: "/about"
    }
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Cable Tray Systems",
      image: "/featured-products/featured1.jpg",
      features: [
        "Corrosion-resistant galvanized steel construction",
        "Multiple size configurations available",
        "Easy installation with modular design",
        "Compliant with international safety standards"
      ]
    },
    {
      id: "2",
      name: "Industrial Hinges",
      image: "/featured-products/featured2.jpg",
      features: [
        "Heavy-duty load capacity up to 500kg",
        "Stainless steel components for durability",
        "Self-lubricating bearings for smooth operation",
        "Suitable for extreme weather conditions"
      ]
    },
    {
      id: "3",
      name: "Fastener Solutions",
      image: "/featured-products/featured3.jpg",
      features: [
        "High-tensile strength bolts and nuts",
        "Available in various grades and finishes",
        "Custom specifications on request",
        "Bulk ordering with competitive pricing"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroCarousel slides={heroSlides} />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              About Kaveri GS Automech
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for quality hardware and manufacturing solutions. We specialize in delivering excellence in precision engineering, reliability, and innovation for industrial applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Quality Manufacturing</h3>
                <p className="text-muted-foreground">
                  State-of-the-art facilities ensuring precision and quality in every component we produce
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Dedicated to meeting your specific requirements with customized solutions and support
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Proven Excellence</h3>
                <p className="text-muted-foreground">
                  Years of industry experience delivering reliable solutions to satisfied customers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}
