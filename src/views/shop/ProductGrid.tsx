"use client";
import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { useParamsNavigation } from "@/hooks/useParamNavigation";

interface ProductGridProps {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    basePrice: number;
    salePrice?: number | null;
    inventory?: number | null;
    images?: { url: string }[];
  }>;
  total: number;
  page: number;
  pageSize: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  total,
  page,
  pageSize,
}) => {
  const { getParams, navigateWithQueryParams } = useParamsNavigation();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handlePage = (newPage: number) => {
    const params = getParams();
    params.set("page", String(newPage));
    navigateWithQueryParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              handle={product.slug}
              title={product.name}
              price={`$${product.salePrice ?? product.basePrice}`}
              compareAtPrice={
                product.salePrice ? `$${product.basePrice}` : undefined
              }
              onSale={!!product.salePrice}
              soldOut={product.inventory === 0}
              imageUrl={product.images?.[0]?.url}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No products found.
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => handlePage(page - 1)}
        >
          Previous
        </button>
        <span className="text-xs">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => handlePage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
