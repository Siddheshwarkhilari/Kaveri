import HeroCarousel from '../HeroCarousel';

export default function HeroCarouselExample() {
  const slides = [
    {
      image: "/slides/slide-1.webp",
      title: "Quality Hardware Solutions",
      description: "Premium manufacturing components for industrial applications",
      buttonText: "Explore Products",
      buttonLink: "/products"
    },
    {
      image: "/slides/slide-2.webp",
      title: "Precision Engineering",
      description: "Advanced manufacturing capabilities with state-of-the-art technology",
      buttonText: "View Gallery",
      buttonLink: "/gallery"
    },
    {
      image: "/slides/slide-3.webp",
      title: "Trusted Excellence",
      description: "Delivering reliability and innovation in every component",
      buttonText: "Learn More",
      buttonLink: "/about"
    }
  ];

  return <HeroCarousel slides={slides} />;
}
