import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard, { type Product } from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // TODO: Replace with actual product data
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Cable Tray Fitting",
      description: "High-quality cable tray fittings designed for industrial electrical installations. Durable galvanized steel construction with corrosion-resistant finish. Available in multiple sizes to accommodate various cable loads and configurations.",
      image: "/products/product1.jpg"
    },
    {
      id: "2",
      name: "Heavy Duty Hinge",
      description: "Professional-grade heavy duty hinges for industrial applications. Reinforced stainless steel construction with high load-bearing capacity. Self-lubricating bearings ensure smooth operation and longevity.",
      image: "/products/product2.jpg"
    },
    {
      id: "3",
      name: "Refer Truck Lockset",
      description: "Specialized locksets designed for refrigerated truck applications. Weather-resistant construction with anti-corrosion coating. Secure locking mechanism ensures cargo safety in extreme conditions.",
      image: "/products/product3.jpg"
    },
    {
      id: "4",
      name: "Industrial Fasteners",
      description: "Comprehensive range of high-tensile strength bolts, nuts, and screws. Available in various grades including stainless steel and galvanized finishes. Custom specifications available for specialized applications.",
      image: "/products/product4.jpg"
    },
    {
      id: "5",
      name: "Pivot Bracket",
      description: "Heavy-duty pivot brackets for industrial machinery and equipment. Precision-engineered for smooth rotation and load distribution. Available in multiple mounting configurations.",
      image: "/products/product5.jpg"
    },
    {
      id: "6",
      name: "Junction Box",
      description: "Industrial-grade junction boxes with IP65 rating. Suitable for harsh environments with dust and water protection. Multiple entry points for flexible cable management.",
      image: "/products/product6.jpg"
    },
    {
      id: "7",
      name: "Corner Fitting",
      description: "90-degree corner fittings for cable tray installations. Smooth radius design prevents cable damage. Hot-dip galvanized for superior corrosion resistance.",
      image: "/products/product7.jpg"
    },
    {
      id: "8",
      name: "T-Junction Connector",
      description: "T-junction connectors for branching cable routes. Easy snap-fit installation with no special tools required. Compatible with standard cable tray systems.",
      image: "/products/product8.jpg"
    }
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            Explore our comprehensive range of high-quality industrial hardware and manufacturing components
          </p>

          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-products"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
