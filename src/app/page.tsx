import prisma from "@/prisma/prisma";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default async function Home() {
  // Fetch top featured products (e.g., isFeatured or top 4 by createdAt)
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      images: { take: 1 },
    },
  });

  // Fetch top collections (e.g., isActive, order by priority, take 3)
  const collections = await prisma.collection.findMany({
    where: { isActive: true },
    orderBy: { priority: "desc" },
    take: 3,
    include: {
      image: true,
    },
  });

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="w-full bg-gray-100 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Industrial design meets fashion.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Atypical leather goods. Functional handbags made of luxurious
          materials to improve people&apos;s lives in small but mighty ways.
        </p>
        <a
          href="#"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition"
        >
          Shop now
        </a>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collection/${col.slug}`}
              className="group block bg-white rounded-md shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {col.image?.url ? (
                  <img
                    src={col.image.url}
                    alt={col.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    draggable={false}
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-gray-400 text-2xl">
                    ?
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{col.name}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {col.description}
                </p>
                <span className="inline-block text-blue-600 font-medium text-sm group-hover:underline">
                  View collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              handle={product.slug}
              title={product.name}
              price={`$${(product.salePrice ?? product.basePrice) / 100}`}
              compareAtPrice={
                product.salePrice ? `$${product.basePrice / 100}` : undefined
              }
              onSale={!!product.salePrice}
              soldOut={product.inventory === 0}
              imageUrl={product.images[0]?.url}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
