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
    }, 6000);
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
    <div className="group relative w-full min-h-[480px] md:min-h-[560px] overflow-hidden border-b border-slate-200/80">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-slate-900/15 z-[2]" />
          <img
            src={slide.image}
            alt={slide.title}
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='600' viewBox='0 0 1920 600'%3E%3Cdefs%3E%3ClinearGradient id='g${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231e293b' /%3E%3Cstop offset='100%25' style='stop-color:%23334155' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='600' fill='url(%23g${index})'/%3E%3C/svg%3E`;
            }}
          />
          <div className="absolute inset-0 z-[3] flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
              <div className="max-w-2xl">
                <h1
                  className="text-4xl md:text-[2.75rem] font-heading font-semibold text-white mb-5 leading-[1.15] tracking-tight drop-shadow-sm"
                  data-testid={`slide-title-${index}`}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-lg md:text-xl text-white/90 mb-9 leading-relaxed max-w-xl"
                  data-testid={`slide-description-${index}`}
                >
                  {slide.description}
                </p>
                <Button
                  size="lg"
                  onClick={() => setLocation(slide.buttonLink)}
                  className="bg-white text-slate-900 hover:bg-slate-100 font-medium shadow-md border border-white/20"
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
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white p-3 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100 md:opacity-100"
        aria-label="Previous slide"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white p-3 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100 md:opacity-100"
        aria-label="Next slide"
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-9 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
            data-testid={`indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
