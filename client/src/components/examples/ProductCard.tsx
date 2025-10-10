import ProductCard from '../ProductCard';

export default function ProductCardExample() {
  const product = {
    id: "1",
    name: "Cable Tray Fitting",
    description: "High-quality cable tray fittings designed for industrial electrical installations. Durable construction with corrosion-resistant finish.",
    image: "/products/product-1.webp"
  };

  return (
    <div className="max-w-sm">
      <ProductCard 
        product={product} 
        onClick={() => console.log('Product clicked')} 
      />
    </div>
  );
}
