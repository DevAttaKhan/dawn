"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import CollectionFilter from "@/components/collection/CollectionFilter";
import ProductCard from "@/components/product/ProductCard";

const mockCategories = ["Bags", "Shoes", "Accessories"];
const mockAvailability = ["In stock", "Sold out"];
const mockProducts = [
  {
    handle: "small-convertible-flex-bag",
    title: "Small Convertible Flex Bag",
    price: "$320.00",
    compareAtPrice: "$395.00",
    onSale: true,
    imageUrl: "https://placehold.co/300x300?text=Bag",
    soldOut: false,
    category: "Bags",
    availability: "In stock",
  },
  {
    handle: "studio-bag",
    title: "Studio Bag",
    price: "$465.00",
    imageUrl: "https://placehold.co/300x300?text=Studio",
    soldOut: false,
    category: "Bags",
    availability: "In stock",
  },
  {
    handle: "louise-slide-sandal",
    title: "Louise Slide Sandal",
    price: "$395.00",
    compareAtPrice: "$430.00",
    onSale: true,
    imageUrl: "https://placehold.co/300x300?text=Sandal",
    soldOut: false,
    category: "Shoes",
    availability: "In stock",
  },
  {
    handle: "mini-naomi-bag",
    title: "Mini Naomi Bag",
    price: "$299.00",
    compareAtPrice: "$315.00",
    onSale: true,
    imageUrl: "https://placehold.co/300x300?text=Mini+Naomi",
    soldOut: true,
    category: "Bags",
    availability: "Sold out",
  },
];

export default function CollectionHandlePage() {
  const params = useParams();
  const handle = params?.handle as string;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([
    200, 500,
  ]);

  // Filter products by handle (collection)
  const filteredProducts = mockProducts.filter(
    (p) =>
      (!handle || p.category.toLowerCase() === handle.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(p.category)) &&
      (selectedAvailability.length === 0 ||
        selectedAvailability.includes(p.availability)) &&
      parseInt(p.price.replace(/[^\d]/g, ""), 10) >= selectedPrice[0] &&
      parseInt(p.price.replace(/[^\d]/g, ""), 10) <= selectedPrice[1]
  );

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      {/* Filter Sidebar */}
      <div className="md:w-1/4 w-full mb-6 md:mb-0">
        <CollectionFilter
          categories={mockCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={(cat) =>
            setSelectedCategories((prev) =>
              prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat]
            )
          }
          priceRange={[200, 500]}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
          availability={mockAvailability}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={(status) =>
            setSelectedAvailability((prev) =>
              prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
            )
          }
        />
      </div>
      {/* Product Grid */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {handle ? handle.replace(/-/g, " ") : "Collection"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
