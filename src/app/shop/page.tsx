"use client";
import { useState } from "react";
import ShopFilter from "@/components/collection/ShopFilter";
import ProductCard from "@/components/product/ProductCard";

const mockProducts = [
  {
    handle: "small-convertible-flex-bag",
    title: "Small Convertible Flex Bag",
    price: "$320.00",
    compareAtPrice: "$395.00",
    onSale: true,
    imageUrl: "https://placehold.co/300x300?text=Bag",
    soldOut: false,
    availability: "In stock",
    color: "Butter",
  },
  {
    handle: "studio-bag",
    title: "Studio Bag",
    price: "$465.00",
    imageUrl: "https://placehold.co/300x300?text=Studio",
    soldOut: false,
    availability: "In stock",
    color: "Desert",
  },
  {
    handle: "louise-slide-sandal",
    title: "Louise Slide Sandal",
    price: "$395.00",
    compareAtPrice: "$430.00",
    onSale: true,
    imageUrl: "https://placehold.co/300x300?text=Sandal",
    soldOut: false,
    availability: "In stock",
    color: "Green",
  },
  {
    handle: "mini-naomi-bag",
    title: "Mini Naomi Bag",
    price: "$299.00",
    compareAtPrice: "$315.00",
    onSale: true,
    imageUrl: "https://placehold.co/300x300?text=Mini+Naomi",
    soldOut: true,
    availability: "Out of stock",
    color: "Pink Cloud",
  },
];

const availabilityOptions = ["In stock", "Out of stock"];
const colorOptions = [
  "Butter",
  "Desert",
  "Green",
  "Pink Cloud",
  "Navy",
  "Berry",
  "Olive Leaf",
  "Camel",
  "Gray",
  "Black",
];

export default function ShopPage() {
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([
    200, 500,
  ]);

  // Filtering logic
  const filteredProducts = mockProducts.filter(
    (p) =>
      (selectedAvailability.length === 0 ||
        selectedAvailability.includes(p.availability)) &&
      (selectedColors.length === 0 || selectedColors.includes(p.color)) &&
      parseInt(p.price.replace(/[^\d]/g, ""), 10) >= selectedPrice[0] &&
      parseInt(p.price.replace(/[^\d]/g, ""), 10) <= selectedPrice[1]
  );

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      {/* Filter Sidebar */}
      <div className="md:w-1/4 w-full mb-6 md:mb-0">
        <ShopFilter
          availability={availabilityOptions}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={(status) =>
            setSelectedAvailability((prev) =>
              prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
            )
          }
          onAvailabilityReset={() => setSelectedAvailability([])}
          priceRange={[200, 500]}
          selectedPrice={selectedPrice}
          onPriceChange={setSelectedPrice}
          onPriceReset={() => setSelectedPrice([200, 500])}
          colorOptions={colorOptions}
          selectedColors={selectedColors}
          onColorChange={(color) =>
            setSelectedColors((prev) =>
              prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
            )
          }
          onColorReset={() => setSelectedColors([])}
        />
      </div>
      {/* Product Grid */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Shop All Products</h1>
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
