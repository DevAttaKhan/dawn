"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { Category, Product, Collection } from "@prisma/client";

interface CategoryWithImage extends Category {
  image?: { url: string } | null;
  children?: CategoryWithImage[];
  products?: ProductWithImages[];
}
interface ProductWithImages extends Product {
  images: { url: string }[];
}
interface CollectionWithImageAndProducts extends Collection {
  image?: { url: string } | null;
  products: ProductWithImages[];
}

interface MobileNavProps {
  categories: CategoryWithImage[];
  collections: CollectionWithImageAndProducts[];
  open: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  categories,
  collections,
  open,
  onClose,
}) => {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [openCollections, setOpenCollections] = useState(false);

  // Helper: get subcategories and featured products for a given category
  const getSubcategories = (cat: CategoryWithImage) => cat.children || [];
  const getFeaturedProducts = (cat: CategoryWithImage) => cat.products || [];

  return (
    <div
      className={
        open
          ? "fixed inset-0 z-50 flex"
          : "pointer-events-none fixed inset-0 z-50 flex"
      }
    >
      {/* Overlay fade */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Slide-in nav */}
      <div
        className={`relative bg-white w-80 max-w-full h-full shadow-lg p-4 flex flex-col gap-2 transform transition-all duration-300 ease-in-out
          ${
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        style={{ willChange: "transform, opacity" }}
      >
        <button
          className="absolute top-4 right-4 p-2"
          aria-label="Close menu"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>
        <Link
          href="/"
          className="font-bold text-xl mb-2 px-1"
          onClick={onClose}
        >
          Dawn
        </Link>
        <Link href="/shop" className="py-1 px-1" onClick={onClose}>
          Shop
        </Link>
        {/* Collections Accordion */}
        <button
          className="py-1 px-1 flex items-center w-full justify-between"
          onClick={() => setOpenCollections((v) => !v)}
        >
          <span>Collections</span>
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
              openCollections ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openCollections ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pl-4 flex flex-col gap-1">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collection/${col.slug}`}
                className="py-1 px-1"
                onClick={onClose}
              >
                {col.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Featured Categories Accordions */}
        {categories.map((cat) => (
          <div key={cat.id} className="w-full">
            <button
              className="py-1 px-1 flex items-center w-full justify-between"
              onClick={() =>
                setOpenCategoryId(openCategoryId === cat.id ? null : cat.id)
              }
              aria-expanded={openCategoryId === cat.id}
              aria-controls={`cat-panel-${cat.id}`}
            >
              <span className="flex items-center gap-2">
                {cat.image?.url && (
                  <img
                    src={cat.image.url}
                    alt={cat.name}
                    className="w-6 h-6 rounded object-cover"
                  />
                )}
                {cat.name}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
                  openCategoryId === cat.id ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
            <div
              id={`cat-panel-${cat.id}`}
              className={`overflow-auto transition-all duration-300 ${
                openCategoryId === cat.id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {/* Subcategories */}
              <div className="pl-4 flex flex-col gap-1 mt-1">
                {getSubcategories(cat).length > 0 ? (
                  getSubcategories(cat).map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/collection/${sub.slug}`}
                      className="py-1 px-1"
                      onClick={onClose}
                    >
                      {sub.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">
                    No subcategories
                  </span>
                )}
              </div>
              {/* Featured Products */}
              <div className="pl-4 mt-2">
                {getFeaturedProducts(cat).length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {getFeaturedProducts(cat).map((product) => (
                      <ProductCard
                        key={product.id}
                        handle={product.slug}
                        title={product.name}
                        price={`$${
                          (product.salePrice ?? product.basePrice) / 100
                        }`}
                        compareAtPrice={
                          product.salePrice
                            ? `$${product.basePrice / 100}`
                            : undefined
                        }
                        onSale={!!product.salePrice}
                        soldOut={product.inventory === 0}
                        imageUrl={product.images[0]?.url}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">
                    No featured products
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <a href="#" className="py-1 px-1" onClick={onClose}>
          Bags
        </a>
        <a href="#" className="py-1 px-1" onClick={onClose}>
          Shoes
        </a>
        <a href="#" className="py-1 px-1" onClick={onClose}>
          Lookbook
        </a>
      </div>
    </div>
  );
};

export default MobileNav;
