import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "./ProductCard";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-product"
    >
      <div 
        className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-heading font-bold" data-testid="text-modal-product-name">
            {product.name}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%239CA3AF'%3EProduct Image%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-modal-product-description">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
