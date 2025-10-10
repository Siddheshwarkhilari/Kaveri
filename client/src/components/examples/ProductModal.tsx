import { useState } from 'react';
import ProductModal from '../ProductModal';
import { Button } from '@/components/ui/button';

export default function ProductModalExample() {
  const [isOpen, setIsOpen] = useState(true);
  
  const product = {
    id: "1",
    name: "Heavy Duty Hinge",
    description: "Professional-grade heavy duty hinges designed for industrial applications. These hinges feature reinforced construction with stainless steel components, providing exceptional load-bearing capacity and longevity. Ideal for heavy doors, gates, and industrial equipment. Corrosion-resistant finish ensures durability in harsh environments.",
    image: "/products/product2.jpg"
  };

  if (!isOpen) {
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Product Modal</Button>
      </div>
    );
  }

  return <ProductModal product={product} onClose={() => setIsOpen(false)} />;
}
