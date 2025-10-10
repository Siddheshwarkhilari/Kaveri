import FeaturedProducts from '../FeaturedProducts';

export default function FeaturedProductsExample() {
  const products = [
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
    }
  ];

  return <FeaturedProducts products={products} />;
}
