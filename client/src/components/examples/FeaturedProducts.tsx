import FeaturedProducts from '../FeaturedProducts';

export default function FeaturedProductsExample() {
  const products = [
    {
      id: "1",
      name: "Refer Lock-sets assembly",
      image: "/featured-products/Hinges.webp",
      features: [
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
