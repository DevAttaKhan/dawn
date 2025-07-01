import React from "react";

type CollectionFilterProps = {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  selectedPrice: [number, number];
  onPriceChange: (range: [number, number]) => void;
  availability: string[];
  selectedAvailability: string[];
  onAvailabilityChange: (status: string) => void;
};

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  selectedPrice,
  onPriceChange,
  availability,
  selectedAvailability,
  onAvailabilityChange,
}) => {
  return (
    <aside className="w-full md:w-64 bg-white rounded-md shadow-sm p-4 flex flex-col gap-6 border border-gray-100">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold mb-2 text-sm">Category</h4>
        <ul className="flex flex-col gap-1">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                  className="rounded-sm border-gray-300 focus:ring-black/20"
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Price Filter */}
      <div>
        <h4 className="font-semibold mb-2 text-sm">Price</h4>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={selectedPrice[0]}
            onChange={(e) =>
              onPriceChange([Number(e.target.value), selectedPrice[1]])
            }
            className="w-full accent-black"
          />
          <span className="text-xs">${selectedPrice[0]}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={selectedPrice[1]}
            onChange={(e) =>
              onPriceChange([selectedPrice[0], Number(e.target.value)])
            }
            className="w-full accent-black"
          />
          <span className="text-xs">${selectedPrice[1]}</span>
        </div>
      </div>
      {/* Availability Filter */}
      <div>
        <h4 className="font-semibold mb-2 text-sm">Availability</h4>
        <ul className="flex flex-col gap-1">
          {availability.map((status) => (
            <li key={status}>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes(status)}
                  onChange={() => onAvailabilityChange(status)}
                  className="rounded-sm border-gray-300 focus:ring-black/20"
                />
                {status}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CollectionFilter;
