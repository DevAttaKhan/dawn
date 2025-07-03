"use client";
import React, { useMemo, useState } from "react";
import { useParamsNavigation } from "@/hooks/useParamNavigation";
import { debounce } from "lodash";

interface Category {
  name: string;
}

interface FilterSidebarProps {
  categories: Category[];
  appliedFilters: {
    category?: string[];
    price_min?: string;
    price_max?: string;
    search?: string;
  };
}

const sectionIcon = (
  <span className="inline-block text-purple-600 mr-2 align-middle">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      width={15}
      height={15}
    >
      <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
    </svg>
  </span>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  appliedFilters,
}) => {
  const { getParams, navigateWithQueryParams } = useParamsNavigation();
  const [minPrice, setMinPrice] = useState(appliedFilters.price_min || "");
  const [maxPrice, setMaxPrice] = useState(appliedFilters.price_max || "");

  const handleCategoryChange = (name: string, checked: boolean) => {
    const params = getParams();
    let selected = params.getAll("category");
    if (checked) {
      if (!selected.includes(name)) selected.push(name);
    } else {
      selected = selected.filter((cat) => cat !== name);
    }
    params.delete("category");
    selected.forEach((cat) => params.append("category", cat));
    params.set("page", "1");
    navigateWithQueryParams(params);
  };

  const handlePriceChange = () => {
    const params = getParams();
    if (minPrice) params.set("price_min", minPrice);
    else params.delete("price_min");
    if (maxPrice) params.set("price_max", maxPrice);
    else params.delete("price_max");
    params.set("page", "1");
    navigateWithQueryParams(params);
  };

  const handleRemoveFilter = (key: string, value?: string) => {
    const params = getParams();
    if (key === "category" && value) {
      const selected = params.getAll("category").filter((cat) => cat !== value);
      params.delete("category");
      selected.forEach((cat) => params.append("category", cat));
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    navigateWithQueryParams(params);
  };

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

  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-lg p-4 mb-6 md:mb-0 flex flex-col gap-6">
      {/* Applied Filter Chips */}
      <div className="mb-2 flex flex-wrap gap-2">
        {appliedFilters.category?.map((catName) => (
          <span
            key={catName}
            className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            {catName}
            <button
              onClick={() => handleRemoveFilter("category", catName)}
              className="ml-1 text-purple-400 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
        {appliedFilters.price_min && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            Min: ${appliedFilters.price_min}
            <button
              onClick={() => handleRemoveFilter("price_min")}
              className="ml-1 text-purple-400 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        )}
        {appliedFilters.price_max && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            Max: ${appliedFilters.price_max}
            <button
              onClick={() => handleRemoveFilter("price_max")}
              className="ml-1 text-purple-400 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        )}
        {appliedFilters.search && (
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            Search: {appliedFilters.search}
            <button
              onClick={() => handleRemoveFilter("search")}
              className="ml-1 text-purple-400 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        )}
      </div>
      {/* Availability Section */}

      <div>
        <input
          type="search"
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search"
          className="border flex-1 border-gray-300 rounded px-2 py-1 w-full text-sm focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div>
        <h3 className="flex items-center text-purple-700 font-bold text-lg mb-2 tracking-tight">
          {sectionIcon} Availability
        </h3>
        <div className="flex flex-col gap-1 pl-1">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" disabled className="accent-purple-600" />
            In stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" disabled className="accent-purple-600" />
            Sold out
          </label>
        </div>
      </div>
      <div className="border-t border-gray-200 my-2" />
      {/* Price Section */}
      <div>
        <h3 className="flex items-center text-purple-700 font-bold text-lg mb-2 tracking-tight">
          {sectionIcon} Price
        </h3>
        <div className="flex flex-col gap-2  mb-2">
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="From"
              className="border flex-1 border-gray-300 rounded px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-purple-200"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="To"
              className="border flex-1 border-gray-300 rounded px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <button
            className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
            onClick={handlePriceChange}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 my-2" />
      {/* Category Section */}
      <div>
        <h3 className="flex items-center text-purple-700 font-bold text-lg mb-2 tracking-tight">
          {sectionIcon} Category
        </h3>
        <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-1">
          {categories.map((cat) => (
            <label key={cat.name} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={appliedFilters.category?.includes(cat.name) || false}
                onChange={(e) =>
                  handleCategoryChange(cat.name, e.target.checked)
                }
                className="accent-purple-600"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
