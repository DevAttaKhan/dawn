import prisma from "@/prisma/prisma";
import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: { handle: string };
}

export default async function CollectionHandlePage({
  params,
}: CollectionPageProps) {
  const { handle } = params;
  // Fetch collection by slug, including products and their images
  const collection = await prisma.collection.findUnique({
    where: { slug: handle },
    include: {
      products: {
        where: { status: "ACTIVE" },
        include: { images: { take: 1 } },
      },
      image: true,
    },
  });

  if (!collection) return notFound();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Collection Image */}
        {collection.image?.url && (
          <div className="w-full md:w-1/3 aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-4 md:mb-0">
            <img
              src={collection.image.url}
              alt={collection.name}
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>
        )}
        {/* Collection Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
          {collection.description && (
            <p className="text-gray-600 mb-4">{collection.description}</p>
          )}
        </div>
      </div>
      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collection.products.length > 0 ? (
            collection.products.map((product) => (
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
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No products found in this collection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
