import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='600' viewBox='0 0 1920 600'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${index === 0 ? '1e40af' : index === 1 ? '059669' : '7c3aed'};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${index === 0 ? '3b82f6' : index === 1 ? '10b981' : 'a855f7'};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='600' fill='url(%23grad${index})'/%3E%3C/svg%3E`;
            }}
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight" data-testid={`slide-title-${index}`}>
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed" data-testid={`slide-description-${index}`}>
                  {slide.description}
                </p>
                <Button
                  size="lg"
                  onClick={() => setLocation(slide.buttonLink)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  data-testid={`button-slide-${index}`}
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            data-testid={`indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
