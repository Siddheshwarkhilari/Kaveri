import { useState } from 'react';
import GalleryModal from '../GalleryModal';
import { Button } from '@/components/ui/button';

export default function GalleryModalExample() {
  const [isOpen, setIsOpen] = useState(true);
  
  const item = {
    id: "1",
    image: "/gallery/gallery2.jpg",
    description: "Our modern manufacturing facility equipped with advanced CNC machines and quality control systems, ensuring precision in every component we produce."
  };

  if (!isOpen) {
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Gallery Modal</Button>
      </div>
    );
  }

  return <GalleryModal item={item} onClose={() => setIsOpen(false)} />;
}
