import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

interface FeaturedProduct {
  id: string;
  name: string;
  image: string;
  features: string[];
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setLocation] = useLocation();

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our premium range of industrial hardware and manufacturing components
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="aspect-square md:aspect-auto bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%239CA3AF'%3EFeatured Product%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                      </div>
                      <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-heading font-bold mb-4" data-testid={`text-featured-${product.id}`}>
                          {product.name}
                        </h3>
                        <ul className="space-y-3 mb-6">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={() => setLocation('/products')}
                          data-testid="button-view-all-products"
                        >
                          View All Products
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {products.length > 1 && (
            <>
              <button
                onClick={prevProduct}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background border border-border hover-elevate p-3 rounded-full shadow-lg transition-all duration-300"
                data-testid="button-prev-featured"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextProduct}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background border border-border hover-elevate p-3 rounded-full shadow-lg transition-all duration-300"
                data-testid="button-next-featured"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
              }`}
              data-testid={`featured-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
