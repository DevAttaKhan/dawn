import { Prisma } from "@prisma/client";
import React from "react";
import { SelectOptionType } from "./ProductDetailContent";

type OptionValuesType = Prisma.OptionGetPayload<{
  include: {
    values: true;
  };
}>;

interface ProductOptionSelectorProps {
  options: OptionValuesType[];
  selectedOptions: SelectOptionType[];
  onSelect: (optionId: string, valueId: string) => void;
}

const ProductOptionSelector: React.FC<ProductOptionSelectorProps> = ({
  options,
  selectedOptions,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id}>
          <label className="block text-sm font-medium mb-1">
            {option.name}
          </label>
          <div className="flex gap-2 flex-wrap">
            {option.values.map((val) => {
              const isSelected = selectedOptions.some(
                (sel) => sel.optionId === option.id && sel.valueId === val.id
              );
              return (
                <button
                  key={val.id}
                  type="button"
                  className={`px-3 py-1 rounded-sm border text-sm font-medium transition ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
                  onClick={() => onSelect(val.optionId, val.id)}
                >
                  {val.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOptionSelector;
