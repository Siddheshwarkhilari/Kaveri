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
      image: "/products/product-1.png"
    },
    {
      id: '2',
      name: "Customized Flange",
      description: "Ensures smooth motion and low friction in high-speed mechanical systems.",
      image: "/products/product-2.png"
    },
    {
      id: '5',
      name: "Door Hinge Assembly",
      description: "Built for tough industrial use, offering strength and corrosion resistance.",
      image: "/products/product-5.png"
    },
    {
      id: '16',
      name: "Crank Assembly",
      description: "Precision-engineered component for robotics",
      image: "/products/product-17.png"
    },
    {
      id: '21',
      name: "Tie Rod",
      description: "Advanced actuator for industrial automation",
      image: "/products/product-22.png"
    },
    {
      id: '25',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-9.jpg"
    },
    {
      id: '3',
      name: "Customized Panel Locks",
      description: "Tailored locking solutions for various industrial applications.",
      image: "/products/product-3.png"
    },
    {
      id: '23',
      name: "Clevis-End Actuator Rod",
      description: "High-efficiency sensor integration",
      image: "/products/product-12.webp"
    },
    {
      id: '4',
      name: "High tensile Fasteners",
      description: "High-strength fasteners for industrial applications",
      image: "/products/product-4.png"
    },
    {
      id: '6',
      name: "Panel Locks",
      description: "Secure locking solutions for industrial panels",
      image: "/products/product-6.png"
    },
    {
      id: '7',
      name: "Industrial Fastener Set",
      description: "Complete set of high-strength bolts, nuts, and washers",
      image: "/products/product-27.png"
    },
    {
      id: '8',
      name: "Door Lock Handle",
      description: "Ergonomic handles designed for industrial door locks",
      image: "/products/product-8.png"
    },
    {
      id: '9',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-9.jpg"
    },
    {
      id: '10',
      name: "Handle holder",
      description: "Robust holders for secure handle mounting",
      image: "/products/product-10.png"
    },
    {
      id: '11',
      name: "Refer Lock Set",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-11.png"
    },
    {
      id: '12',
      name: "Tube Guide",
      description: "Precision-engineered tube guides for smooth operation",
      image: "/products/product-7.png"
    },
    {
      id: '13',
      name: "Keeper",
      description: "Durable keepers for secure panel locking",
      image: "/products/product-13.png"
    },
    {
      id: '14',
      name: "Cam & Keeper",
      description: "Integrated cam and keeper solutions for secure locking",
      image: "/products/product-14.png"
    },
    {
      id: '15',
      name: "Clevise",
      description: "Heavy-duty clevis for secure connections",
      image: "/products/product-30.png"
    },
    {
      id: '15',
      name: "Hinges",
      description: "Durable hinges for industrial applications",
      image: "/products/product-16.png"
    },
    {
      id: '17',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-18.png"
    },
    {
      id: '18',
      name: "U bolt",
      description: "Heavy-duty U bolts for secure fastening",
      image: "/products/product-19.png"
    },
    {
      id: '20',
      name: "U bolt",
      description: "Precision-engineered U bolts for secure fastening",
      image: "/products/product-21.png"
    },
    {
      id: '22',
      name: "Panel Mount Bushing",
      description: "Custom part for advanced automation",
      image: "/products/product-23.png"
    },
    {
      id: '24',
      name: "Container refer lock set",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-25.png"
    },
    {
      id: '26',
      name: "Tube Guide",
      description: "Precision-engineered tube guides for smooth operation",
      image: "/products/product-7.png"
    },
    {
      id: '27',
      name: "Hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-9.jpg"
    },
    {
      id: '28',
      name: "Lift-off hinge",
      description: "Durable hinges for industrial applications",
      image: "/products/product-31.png"
    },
    {
      id: '29',
      name: "Handle",
      description: "Ergonomic handles for easy operation",
      image: "/products/product-15.png"
    },
    {
      id: '30',
      name: "Cable Tray",
      description: "High-efficiency cable management solutions",
      image: "/products/product-29.png"
    },
    {
      id: '31',
      name: "Door Hinge",
      description: "Durable door hinges for industrial applications",
      image: "/products/product-32.png"
    },
    {
      id: '32',
      name: "U Bracket",
      description: "Heavy-duty U brackets for secure mounting",
      image: "/products/product-33.png"
    },
    {
      id: '33',
      name: "Canopy Locks",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-34.png"
    },
    {
      id: '34',
      name: "Locks",
      description: "Secure locking solutions for refrigeration units",
      image: "/products/product-38.png"
    },
    {
      id: '35',
      name: "Bracket",
      description: "Precision-engineered component for robotics",
      image: "/products/product-36.png"
    },
    {
      id: '36',
      name: "Mounting flange",
      description: "Advanced actuator for industrial automation",
      image: "/products/product-37.png"
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
