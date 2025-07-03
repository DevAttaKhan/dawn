"use client";
import React, { useMemo } from "react";
import queryString from "query-string";
import Link from "next/link";
import { useParamsNavigation } from "@/hooks/useParamNavigation";
import { debounce } from "lodash";
import { SortOption } from "@/types/enums";
import { Prisma } from "@prisma/client";

type Collection = Prisma.CollectionGetPayload<{
  include: { image: true };
}>;

interface Props {
  collections: Collection[];
  page: number;
  total: number;
  pageSize: number;
}

const SORT_OPTIONS = [
  { value: SortOption.FEATURED, label: "Featured" },
  { value: SortOption.NAME_ASC, label: "Alphabetically, A-Z" },
  { value: SortOption.NAME_DESC, label: "Alphabetically, Z-A" },
  { value: SortOption.DATE_ASC, label: "Date, old to new" },
  { value: SortOption.DATE_DESC, label: "Date, new to old" },
];

const CollectionGridWithFilters: React.FC<Props> = ({
  collections,
  page,
  total,
  pageSize,
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
    else {
      params.set("sortBy", value);
    }

    navigateWithQueryParams(params);
  };

  const handleAvailability = (name: string, checked: boolean) => {
    const params = getParams();

    // Parse current URL params into object
    const parsedParams = queryString.parse(params.toString(), {
      arrayFormat: "comma",
    });

    // Normalize current selection
    let selected: string[] = [];

    if (parsedParams.availability) {
      selected = Array.isArray(parsedParams.availability)
        ? [...parsedParams.availability]
        : ([parsedParams.availability] as any);
    }

    // Add or remove the clicked value
    if (checked) {
      if (!selected.includes(name)) {
        selected.push(name);
      }
    } else {
      selected = selected.filter((val) => val !== name);
    }

    // Clean up the URL param if none are selected
    if (selected.length > 0) {
      parsedParams.availability = selected;
    } else {
      delete parsedParams.availability;
    }

    // Build the new query string
    const newQuery = queryString.stringify(parsedParams, {
      arrayFormat: "comma",
    });

    const updatedParams = new URLSearchParams(newQuery);
    navigateWithQueryParams(updatedParams);
  };

  const handleClearAll = () => {
    const params = getParams();
    getParamKeys().forEach((k) => params.delete(k));
    navigateWithQueryParams(params);
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 py-4 mb-6 justify-between flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border-gray-300 border rounded px-2  text-sm w-44 py-2"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-5">
          <div>
            <select
              className="border-gray-300 border rounded px-2  text-sm w-44 py-2"
              value={getParamValue("sortBy") || ""}
              onChange={handleSortChange}
            >
              <option key="" value="">
                Sort
              </option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div></div>

          <button
            className="ml-auto text-xs text-gray-500 hover:underline"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      </div>
      {/* Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collections.length > 0 ? (
          collections.map((col) => (
            <Link
              key={col.id}
              href={`/collection/${col.slug}`}
              className="group block bg-white rounded-md shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {col.image?.url && (
                  <img
                    src={col.image.url}
                    alt={col.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    draggable={false}
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{col.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{col.description}</p>
                <span className="inline-block text-blue-600 font-medium text-sm group-hover:underline">
                  View collection
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No collections found.
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => {
            const params = getParams();
            params.set("page", String(page - 1));
            navigateWithQueryParams(params);
          }}
        >
          Previous
        </button>
        <span className="text-xs">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => {
            const params = getParams();
            params.set("page", String(page + 1));
            navigateWithQueryParams(params);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CollectionGridWithFilters;
