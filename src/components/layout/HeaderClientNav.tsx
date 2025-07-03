/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { Product, Collection, Prisma } from "@prisma/client";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "@/store/cartSlice";
import { RootState } from "@/store";

type CategoryWithImage = Prisma.CategoryGetPayload<{
  include: {
    image: true;
    children: { include: { image: true } };
    products: { include: { images: true } };
  };
}>;

interface ProductWithImages extends Product {
  images: { url: string }[];
}

interface CollectionWithImageAndProducts extends Collection {
  image?: { url: string } | null;
  products: ProductWithImages[];
}

interface HeaderClientNavProps {
  categories: CategoryWithImage[];
  collections: CollectionWithImageAndProducts[];
  collectionProducts: ProductWithImages[];
}

const HeaderClientNav: React.FC<HeaderClientNavProps> = ({
  categories,
  collections,
  collectionProducts,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="w-full bg-white z-50 relative">
      <div className="container mx-auto flex h-16 justify-between px-4 border-b border-gray-200 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">Dawn</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {/* Collections Mega Menu */}
          <div className="group flex items-center cursor-pointer ">
            <Link
              href="/"
              className="hover:text-gray-900 transition-colors focus:outline-none "
            >
              Home
            </Link>
          </div>
          <div className="group flex items-center cursor-pointer ">
            <Link
              href="/collection"
              className="hover:text-gray-900 transition-colors focus:outline-none "
            >
              Collections
            </Link>
            {/* Mega Menu */}
            <div className="absolute left-0 top-full w-screen max-w-none pointer-events-none group-hover:pointer-events-auto z-50">
              <div
                className="transition-all duration-300 ease-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible invisible bg-white shadow-xl border-t border-gray-200"
                style={{ transitionProperty: "opacity,transform" }}
              >
                <div className="container mx-auto flex px-8 py-8 gap-12">
                  {/* Featured Collections */}
                  <div className="w-1/3 flex flex-col gap-4">
                    <h4 className="font-semibold text-lg mb-2">
                      Featured Collections
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {collections.map((col) => (
                        <Link
                          key={col.id}
                          href={`/collection/${col.slug}`}
                          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                            {col.image?.url ? (
                              <img
                                src={col.image.url}
                                alt={col.name}
                                className="object-cover w-full h-full"
                                draggable={false}
                              />
                            ) : (
                              <span className="text-gray-400 text-xl">?</span>
                            )}
                          </div>
                          <span className="font-medium text-sm">
                            {col.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Featured Products in Collections Slider */}
                  <div className="w-2/3">
                    <h4 className="font-semibold text-lg mb-2">
                      Featured Products
                    </h4>
                    <div className="overflow-x-auto">
                      <div
                        className="flex gap-4 pb-2"
                        style={{ scrollSnapType: "x mandatory" }}
                      >
                        {collectionProducts.map((product) => (
                          <div
                            key={product.id}
                            className="min-w-[220px] max-w-[220px] flex-shrink-0"
                            style={{ scrollSnapAlign: "start" }}
                          >
                            <ProductCard
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Featured Categories as top-level nav items */}
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group flex items-center cursor-pointer"
            >
              <Link
                href={`/shop?category=${cat.name}`}
                className="hover:text-gray-900 transition-colors focus:outline-none"
              >
                {cat.name}
              </Link>

              {/* Mega Menu for this category */}
              <div className="absolute left-0 top-full w-screen max-w-none pointer-events-none group-hover:pointer-events-auto z-50">
                <div
                  className="transition-all duration-300 ease-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible invisible bg-white shadow-xl border-t border-gray-200"
                  style={{ transitionProperty: "opacity,transform" }}
                >
                  <div className="container mx-auto flex px-8 py-8 gap-12">
                    {/* Featured Collections */}
                    <div className="w-1/3 flex flex-col gap-4">
                      <h4 className="font-semibold text-lg mb-2">Categories</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {cat?.children?.map((col) => (
                          <Link
                            key={col.id}
                            href={`/shop?category=${col.name}`}
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                              {col.image?.url ? (
                                <img
                                  src={col.image.url}
                                  alt={col.name}
                                  className="object-cover w-full h-full"
                                  draggable={false}
                                />
                              ) : (
                                <span className="text-gray-400 text-xl">?</span>
                              )}
                            </div>
                            <span className="font-medium text-sm">
                              {col.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Featured Products in Collections Slider */}
                    <div className="w-2/3">
                      <h4 className="font-semibold text-lg mb-2">
                        Featured Products
                      </h4>
                      <div className="overflow-x-auto">
                        <div
                          className="flex gap-4 pb-2"
                          style={{ scrollSnapType: "x mandatory" }}
                        >
                          {cat.products?.map((product) => (
                            <div
                              key={product.id}
                              className="min-w-[220px] max-w-[220px] flex-shrink-0"
                              style={{ scrollSnapAlign: "start" }}
                            >
                              <ProductCard
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
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="hover:text-gray-900 transition-colors  flex items-center"
          >
            Shop
          </Link>
        </nav>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center p-2"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        {/* Actions (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <button aria-label="Search" className="p-2 hover:bg-gray-100 rounded">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          {/* Account */}
          <button
            aria-label="Account"
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </button>
          {/* Cart */}
          <button
            aria-label="Cart"
            className="relative p-2 hover:bg-gray-100 rounded"
            onClick={() => dispatch(openDrawer())}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <MobileNav
        categories={categories}
        collections={collections}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
};

export default HeaderClientNav;
