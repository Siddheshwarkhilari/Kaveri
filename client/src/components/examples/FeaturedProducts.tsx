import FeaturedProducts from '../FeaturedProducts';

export default function FeaturedProductsExample() {
  const products = [
    {
      id: "1",
      name: "Cable Tray Systems",
      image: "/featured-products/featured-1.webp",
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
      image: "/featured-products/featured-2.webp",
      features: [
        "Heavy-duty load capacity up to 500kg",
        "Stainless steel components for durability",
        "Self-lubricating bearings for smooth operation",
        "Suitable for extreme weather conditions"
      ]
    }
  ];

  return <FeaturedProducts products={products} />;
}
