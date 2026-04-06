import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard, { type Product } from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import PageHeader from "@/components/PageHeader";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // TODO: Replace with actual product data
  const allProducts: Product[] = [
    {
      id: '1',
      name: "Heavy-Duty Stainless Steel Hinge",
      description: "Built for tough industrial use, offering strength and corrosion resistance.",
      image: "/products/product-1.webp"
    },
    {
      id: '2',
      name: "Customized Flange",
      description: "Ensures smooth motion and low friction in high-speed mechanical systems.",
      image: "/products/product-2.webp"
    },
    {
      id: '5',
      name: "Door Hinge Assembly",
      description: "Built for tough industrial use, offering strength and corrosion resistance.",
      image: "/products/product-5.webp"
    },
    {
      id: '16',
      name: "New Product G",
      description: "Precision-engineered component for robotics",
      image: "/products/product-17.webp"
    },
    {
      id: '21',
      name: "New Product L",
      description: "Advanced actuator for industrial automation",
      image: "/products/product-22.webp"
    },
    {
      id: '25',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-26.webp"
    },
    {
      id: '3',
      name: "Customized Panel Locks",
      description: "Tailored locking solutions for various industrial applications.",
      image: "/products/product-3.webp"
    },
    {
      id: '23',
      name: "New Product N",
      description: "High-efficiency sensor integration",
      image: "/products/product-24.webp"
    },
    {
      id: '4',
      name: "High tensile Fasteners",
      description: "High-strength fasteners for industrial applications",
      image: "/products/product-35.webp"
    },
    {
      id: '6',
      name: "Panel Locks",
      description: "Secure locking solutions for industrial panels",
      image: "/products/product-6.webp"
    },
    {
      id: '7',
      name: "Industrial Fastener Set",
      description: "Complete set of high-strength bolts, nuts, and washers",
      image: "/products/product-27.webp"
    },
    {
      id: '8',
      name: "Door Lock Handle",
      description: "Ergonomic handles designed for industrial door locks",
      image: "/products/product-8.webp"
    },
    {
      id: '9',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-28.webp"
    },
    {
      id: '10',
      name: "Handle holder",
      description: "Robust holders for secure handle mounting",
      image: "/products/product-10.webp"
    },
    {
      id: '11',
      name: "Refer Lock Set",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-11.webp"
    },
    {
      id: '12',
      name: "Tube Guide",
      description: "Precision-engineered tube guides for smooth operation",
      image: "/products/product-12.webp"
    },
    {
      id: '13',
      name: "Keeper",
      description: "Durable keepers for secure panel locking",
      image: "/products/product-13.webp"
    },
    {
      id: '14',
      name: "Cam & Keeper",
      description: "Integrated cam and keeper solutions for secure locking",
      image: "/products/product-14.webp"
    },
    {
      id: '15',
      name: "Clevise",
      description: "Heavy-duty clevis for secure connections",
      image: "/products/product-30.webp"
    },
    {
      id: '15',
      name: "Hinges",
      description: "Durable hinges for industrial applications",
      image: "/products/product-16.webp"
    },
    {
      id: '17',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-18.webp"
    },
    {
      id: '18',
      name: "U bolt",
      description: "Heavy-duty U bolts for secure fastening",
      image: "/products/product-19.webp"
    },
    {
      id: '20',
      name: "U bolt",
      description: "Precision-engineered U bolts for secure fastening",
      image: "/products/product-21.webp"
    },
    {
      id: '22',
      name: "New Product M",
      description: "Custom part for advanced automation",
      image: "/products/product-23.webp"
    },
    {
      id: '24',
      name: "Container refer lock set",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-25.webp"
    },
    {
      id: '26',
      name: "Tube Guide",
      description: "Precision-engineered tube guides for smooth operation",
      image: "/products/product-7.webp"
    },
    {
      id: '27',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-9.webp"
    },
    {
      id: '28',
      name: "New Product L",
      description: "Advanced actuator for industrial automation",
      image: "/products/product-31.webp"
    },
    {
      id: '29',
      name: "Handle",
      description: "Ergonomic handles for easy operation",
      image: "/products/product-15.webp"
    },
    {
      id: '30',
      name: "Cable Tray",
      description: "High-efficiency cable management solutions",
      image: "/products/product-29.webp"
    },
    {
      id: '31',
      name: "Door Hinge",
      description: "Durable door hinges for industrial applications",
      image: "/products/product-32.webp"
    },
    {
      id: '32',
      name: "U Bracket",
      description: "Heavy-duty U brackets for secure mounting",
      image: "/products/product-33.webp"
    },
    {
      id: '33',
      name: "Canopy Locks",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-34.webp"
    },
    {
      id: '34',
      name: "New Product N",
      description: "High-efficiency sensor integration",
      image: "/products/product-4.webp"
    },
    {
      id: '35',
      name: "New Product O",
      description: "Precision-engineered component for robotics",
      image: "/products/product-36.webp"
    },
    {
      id: '36',
      name: "New Product L",
      description: "Advanced actuator for industrial automation",
      image: "/products/product-37.webp"
    },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Products"
        subtitle="Industrial hardware and fabricated parts—search by name or short description. Click a card for a larger photo and details."
      />

      <div className="border-b border-slate-200/80 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6">
          <div className="max-w-md">
            <label className="sr-only" htmlFor="product-search">
              Search products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden />
              <Input
                id="product-search"
                type="search"
                placeholder="Search by name or keyword…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200/90"
                data-testid="input-search-products"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="py-14 md:py-20">
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
