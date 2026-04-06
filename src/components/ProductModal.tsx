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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-[2px]"
      onClick={onClose}
      data-testid="modal-product"
      role="presentation"
    >
      <div 
        className="bg-white rounded-lg border border-slate-200/90 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200/90 px-5 py-4 flex items-center justify-between z-10">
          <h2 id="product-modal-title" className="text-xl font-heading font-semibold text-slate-900 pr-4" data-testid="text-modal-product-name">
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
            <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200/80">
              <img
                src={product.image}
                alt={product.name}
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%239CA3AF'%3EProduct Image%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-slate-900 text-base mb-3">Summary</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]" data-testid="text-modal-product-description">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
