import VideoHero from "@/components/hero/VideoHero";
import WhoWeAre from "@/components/sections/WhoWeAre";
import FeaturedProducts from "@/components/sections/featured-products/FeaturedProducts";
import { heroSlides } from "@/data/heroSlides";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <VideoHero slides={heroSlides} />

      <WhoWeAre />

      <FeaturedProducts />
    </div>
  );
}
