import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300/90 transition-shadow duration-300 h-full flex flex-col group"
      onClick={onClick}
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%239CA3AF'%3EProduct Image%3C/text%3E%3C/svg%3E`;
          }}
        />
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
