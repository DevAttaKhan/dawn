import React from "react";

export type ShopFilterProps = {
  availability: string[];
  selectedAvailability: string[];
  onAvailabilityChange: (status: string) => void;
  onAvailabilityReset: () => void;
  priceRange: [number, number];
  selectedPrice: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onPriceReset: () => void;
  colorOptions: string[];
  selectedColors: string[];
  onColorChange: (color: string) => void;
  onColorReset: () => void;
};

const ShopFilter: React.FC<ShopFilterProps> = ({
  availability,
  selectedAvailability,
  onAvailabilityChange,
  onAvailabilityReset,
  priceRange,
  selectedPrice,
  onPriceChange,
  onPriceReset,
  colorOptions,
  selectedColors,
  onColorChange,
  onColorReset,
}) => {
  return (
    <aside className="w-full md:w-64 bg-gray-100 rounded-md p-4 flex flex-col gap-6 border border-gray-100">
      {/* Availability */}
      <details open className="mb-2">
        <summary className="flex items-center justify-between text-purple-700 font-semibold text-base cursor-pointer select-none">
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-purple-700 rounded-sm mr-2" />
            Availability
          </span>
          <button
            type="button"
            className="text-xs text-gray-500 hover:underline"
            onClick={onAvailabilityReset}
          >
            Reset
          </button>
        </summary>
        <div className="pl-6 pt-2 flex flex-col gap-1">
          <span className="text-xs text-gray-500 mb-1">
            {selectedAvailability.length} selected
          </span>
          {availability.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAvailability.includes(status)}
                onChange={() => onAvailabilityChange(status)}
                className="rounded-sm border-gray-300 focus:ring-purple-400"
              />
              {status}
            </label>
          ))}
        </div>
      </details>
      {/* Price */}
      <details open className="mb-2">
        <summary className="flex items-center justify-between text-purple-700 font-semibold text-base cursor-pointer select-none">
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-purple-700 rounded-sm mr-2" />
            Price
          </span>
          <button
            type="button"
            className="text-xs text-gray-500 hover:underline"
            onClick={onPriceReset}
          >
            Reset
          </button>
        </summary>
        <div className="pl-6 pt-2 flex flex-col gap-2">
          <span className="text-xs text-gray-500 mb-1">
            The highest price is ${priceRange[1]}.00
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              min={priceRange[0]}
              max={selectedPrice[1]}
              value={selectedPrice[0]}
              onChange={(e) =>
                onPriceChange([Number(e.target.value), selectedPrice[1]])
              }
              className="w-20 border rounded-sm px-2 py-1 text-sm"
              placeholder="From"
            />
            <input
              type="number"
              min={selectedPrice[0]}
              max={priceRange[1]}
              value={selectedPrice[1]}
              onChange={(e) =>
                onPriceChange([selectedPrice[0], Number(e.target.value)])
              }
              className="w-20 border rounded-sm px-2 py-1 text-sm"
              placeholder="To"
            />
          </div>
        </div>
      </details>
      {/* Color */}
      <details open className="mb-2">
        <summary className="flex items-center justify-between text-purple-700 font-semibold text-base cursor-pointer select-none">
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-purple-700 rounded-sm mr-2" />
            Color
          </span>
          <button
            type="button"
            className="text-xs text-gray-500 hover:underline"
            onClick={onColorReset}
          >
            Reset
          </button>
        </summary>
        <div className="pl-6 pt-2 flex flex-col gap-1 max-h-48 overflow-y-auto">
          {colorOptions.map((color) => (
            <label
              key={color}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => onColorChange(color)}
                className="rounded-sm border-gray-300 focus:ring-purple-400"
              />
              {color}
            </label>
          ))}
        </div>
      </details>
    </aside>
  );
};

export default ShopFilter;
