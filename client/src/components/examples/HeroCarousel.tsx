import HeroCarousel from '../HeroCarousel';

export default function HeroCarouselExample() {
  const slides = [
    {
      image: "/slides/slide1.jpg",
      title: "Quality Hardware Solutions",
      description: "Premium manufacturing components for industrial applications",
      buttonText: "Explore Products",
      buttonLink: "/products"
    },
    {
      image: "/slides/slide2.jpg",
      title: "Precision Engineering",
      description: "Advanced manufacturing capabilities with state-of-the-art technology",
      buttonText: "View Gallery",
      buttonLink: "/gallery"
    },
    {
      image: "/slides/slide3.jpg",
      title: "Trusted Excellence",
      description: "Delivering reliability and innovation in every component",
      buttonText: "Learn More",
      buttonLink: "/about"
    }
  ];

  return <HeroCarousel slides={slides} />;
}
