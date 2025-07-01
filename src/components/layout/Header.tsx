import React from "react";
import Link from "next/link";
import prisma from "@/prisma/prisma";
import ProductCard from "@/components/product/ProductCard";

// Helper to fetch featured categories and products (server component)
async function getFeaturedData() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { name: "asc" },
      include: { image: true },
      take: 8,
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE", isFeatured: true },
      orderBy: { createdAt: "desc" },
      include: { images: { take: 1 } },
      take: 8,
    }),
  ]);
  return { categories, products };
}

// Helper to fetch featured collections and their products
async function getFeaturedCollectionsData() {
  // Get featured collections
  const collections = await prisma.collection.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: { priority: "desc" },

    include: {
      image: true,
      products: {
        where: { status: "ACTIVE", isFeatured: true },
        include: { images: { take: 1 } },
      },
    },
  });
  // Flatten all products from all collections, remove duplicates by id
  const allProducts = collections.flatMap((col) => col.products);
  const uniqueProducts = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values()
  );
  return { collections, products: uniqueProducts };
}

const Header: React.FC = async () => {
  const { categories, products } = await getFeaturedData();
  const { collections, products: collectionProducts } =
    await getFeaturedCollectionsData();
  // Note: This is a server component. If you want client-side hover, split the mega menu into a client subcomponent.
  return (
    <header className="w-full bg-white z-50 relative">
      <div className="container mx-auto flex h-16  justify-between px-4 border-b border-gray-200">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">Dawn</span>
        </Link>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {/* Categories Mega Menu */}
          <div className="group flex items-center cursor-pointer ">
            <button className="hover:text-gray-900 transition-colors focus:outline-none ">
              Categories
            </button>
            {/* Mega Menu */}
            <div className="absolute left-0 top-full w-screen max-w-none bg-white shadow-xl border-t border-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
              <div className="container mx-auto flex px-8 py-8 gap-12">
                {/* Featured Categories */}
                <div className="w-1/3 flex flex-col gap-4">
                  <h4 className="font-semibold text-lg mb-2">
                    Featured Categories
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/collection/${cat.slug}`}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          {cat.image?.url ? (
                            <img
                              src={cat.image.url}
                              alt={cat.name}
                              className="object-cover w-full h-full"
                              draggable={false}
                            />
                          ) : (
                            <span className="text-gray-400 text-xl">?</span>
                          )}
                        </div>
                        <span className="font-medium text-sm">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Featured Products Slider */}
                <div className="w-2/3">
                  <h4 className="font-semibold text-lg mb-2">
                    Featured Products
                  </h4>
                  <div className="overflow-x-auto">
                    <div
                      className="flex gap-4 pb-2"
                      style={{ scrollSnapType: "x mandatory" }}
                    >
                      {products.map((product) => (
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
          {/* Collections Mega Menu */}
          <div className="group flex items-center cursor-pointer ">
            <button className="hover:text-gray-900 transition-colors focus:outline-none ">
              Collections
            </button>
            {/* Mega Menu */}
            <div className="absolute left-0 top-full w-screen max-w-none bg-white shadow-xl border-t border-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
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
                        <span className="font-medium text-sm">{col.name}</span>
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
          <Link
            href="/shop"
            className="hover:text-gray-900 transition-colors  flex items-center"
          >
            Shop
          </Link>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors  flex items-center"
          >
            Bags
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors  flex items-center"
          >
            Shoes
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors  flex items-center"
          >
            Lookbook
          </a>
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-4">
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
          <button aria-label="Cart" className="p-2 hover:bg-gray-100 rounded">
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
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
