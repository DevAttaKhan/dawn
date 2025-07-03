"use client";
import React, { useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useParamsNavigation } from "@/hooks/useParamNavigation";
import { SortOption } from "@/types/enums";
import { debounce } from "lodash";

export interface ProductGridWithFiltersProps {
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
  currentFilters: {
    availability?: string[];
    search?: string;
    sort?: string;
  };
}

const SORT_OPTIONS = [
  { value: SortOption.FEATURED, label: "Featured" },
  { value: SortOption.NAME_ASC, label: "Alphabetically, A-Z" },
  { value: SortOption.NAME_DESC, label: "Alphabetically, Z-A" },
  { value: SortOption.DATE_ASC, label: "Date, old to new" },
  { value: SortOption.DATE_DESC, label: "Date, new to old" },
];

const ProductGridWithFilters: React.FC<ProductGridWithFiltersProps> = ({
  products,
  total,
  page,
  pageSize,
  currentFilters,
}) => {
  const { getParamKeys, getParamValue, getParams, navigateWithQueryParams } =
    useParamsNavigation();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = getParams();
        if (!value) params.delete("q");
        else params.set("q", value);
        params.set("page", "1");
        navigateWithQueryParams(params);
      }, 300),
    [getParams, navigateWithQueryParams]
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = getParams();
    if (!value) params.delete("sortBy");
    else params.set("sortBy", value);
    params.set("page", "1");
    navigateWithQueryParams(params);
  };

  const handleClearAll = () => {
    const params = getParams();
    getParamKeys().forEach((k) => params.delete(k));
    navigateWithQueryParams(params);
  };

  const handlePage = (newPage: number) => {
    const params = getParams();
    params.set("page", String(newPage));
    navigateWithQueryParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Memoize search value
  const searchValue = getParamValue("q") || currentFilters.search || "";
  const sortValue = getParamValue("sortBy") || currentFilters.sort || "";

  return (
    <div>
      {/* Filter Bar */}
      <div className="sticky justify-between items-center top-0 z-10 bg-white border-b border-gray-100 py-4 mb-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
        <div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Product name..."
            className="border-gray-300 border rounded px-2  text-sm w-44 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <div>
            <select
              value={sortValue}
              onChange={handleSortChange}
              className="border-gray-300 border rounded px-2  text-sm w-44 py-2"
            >
              <option value="">Sort</option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="ml-auto text-xs text-gray-500 hover:underline"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
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

export default ProductGridWithFilters;
