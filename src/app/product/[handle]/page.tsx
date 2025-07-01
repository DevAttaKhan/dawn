"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useState } from "react";

const mockProduct = {
  handle: "small-convertible-flex-bag",
  title: "Small Convertible Flex Bag",
  price: "$320.00",
  compareAtPrice: "$395.00",
  onSale: true,
  soldOut: false,
  images: [
    "https://placehold.co/600x600?text=Main",
    "https://placehold.co/300x300?text=1",
    "https://placehold.co/300x300?text=2",
    "https://placehold.co/300x300?text=3",
    "https://placehold.co/300x300?text=4",
    "https://placehold.co/300x300?text=5",
    "https://placehold.co/300x300?text=6",
    "https://placehold.co/300x300?text=7",
    "https://placehold.co/300x300?text=8",
  ],
  description:
    "A versatile bag for every occasion. Crafted from premium materials.",
  options: [
    { name: "Color", values: ["Red", "Yellow", "Black"] },
    { name: "Size", values: ["Small", "Medium", "Large"] },
  ],
};

const relatedProducts = [
  {
    handle: "studio-bag",
    title: "Studio Bag",
    price: "$465.00",
    imageUrl: "https://placehold.co/300x300?text=Studio",
  },
  {
    handle: "louise-slide-sandal",
    title: "Louise Slide Sandal",
    price: "$395.00",
    imageUrl: "https://placehold.co/300x300?text=Sandal",
  },
  {
    handle: "mini-naomi-bag",
    title: "Mini Naomi Bag",
    price: "$299.00",
    imageUrl: "https://placehold.co/300x300?text=Mini+Naomi",
  },
  {
    handle: "helix",
    title: "Helix",
    price: "$470.00",
    imageUrl: "https://placehold.co/300x300?text=Helix",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({
    Color: mockProduct.options[0].values[0],
    Size: mockProduct.options[1].values[0],
  });
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Gallery */}
        <div className="flex-1 max-w-xl mx-auto lg:mx-0">
          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-4 flex items-center justify-center">
            <img
              src={mockProduct.images[selectedImage]}
              alt={mockProduct.title}
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mockProduct.images.map((img, idx) => (
              <button
                key={img}
                className={`aspect-square rounded-md overflow-hidden border ${
                  selectedImage === idx ? "border-black" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 max-w-lg mx-auto lg:mx-0">
          <h1 className="text-2xl font-bold mb-2">{mockProduct.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-xl">{mockProduct.price}</span>
            {mockProduct.compareAtPrice && (
              <span className="text-gray-400 line-through text-base">
                {mockProduct.compareAtPrice}
              </span>
            )}
            {mockProduct.onSale && !mockProduct.soldOut && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm font-medium tracking-wide">
                Sale
              </span>
            )}
            {mockProduct.soldOut && (
              <span className="ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-sm font-medium tracking-wide">
                Sold out
              </span>
            )}
          </div>
          {/* Options */}
          <form className="flex flex-col gap-4 mb-4">
            {mockProduct.options.map((opt) => (
              <div key={opt.name}>
                <label className="block text-sm font-medium mb-1">
                  {opt.name}
                </label>
                <div className="flex gap-2">
                  {opt.values.map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`px-3 py-1 rounded-sm border text-sm font-medium transition ${
                        selectedOptions[opt.name] === val
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-200 hover:border-black"
                      }`}
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [opt.name]: val,
                        }))
                      }
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border rounded-sm px-2 py-1"
              />
            </div>
            {/* Add to Cart */}
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-sm font-medium text-base hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mockProduct.soldOut}
            >
              {mockProduct.soldOut ? "Sold out" : "Add to cart"}
            </button>
          </form>
          {/* Description Accordion */}
          <details className="mb-2" open>
            <summary className="font-semibold cursor-pointer select-none py-2">
              Description
            </summary>
            <div className="text-sm text-gray-700 py-2 border-t border-gray-100">
              {mockProduct.description}
            </div>
          </details>
          <details>
            <summary className="font-semibold cursor-pointer select-none py-2">
              Shipping & Returns
            </summary>
            <div className="text-sm text-gray-700 py-2 border-t border-gray-100">
              Free shipping on all orders. 30-day returns policy.
            </div>
          </details>
        </div>
      </div>
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">Running this site</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod.handle} {...prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
