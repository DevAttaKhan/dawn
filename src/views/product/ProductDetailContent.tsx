/* eslint-disable @next/next/no-img-element */
"use client";
import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import ProductImageGallery from "./ProductImageGallery";
import ProductOptionSelector from "./ProductOptionSelector";
import { getVariantFromProduct } from "@/utils";

export type ProductType = Prisma.ProductGetPayload<{
  include: {
    images: true;
    variants: {
      include: {
        attributes: true;
        optionValues: true;
      };
    };
    options: {
      include: {
        values: true;
      };
    };
    attributes: true;
  };
}>;

export interface ProductDetailContentProps {
  product: ProductType;

  defaultSelected: SelectOptionType[];
}

export type SelectOptionType = {
  optionId: string;
  valueId: string;
};

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  product,
  defaultSelected,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<SelectOptionType[]>(defaultSelected);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variant = getVariantFromProduct(product, selectedOptions);
  const price = variant?.price ?? product.salePrice ?? product.basePrice;
  const compareAtPrice = variant?.compareAtPrice ?? product.basePrice;
  const availableQty = variant?.inventory ?? product.inventory ?? 0;
  const soldOut = !variant || availableQty === 0;

  const handleOptionSelect = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => {
      const updated = prev ? [...prev] : [];
      const index = updated.findIndex((opt) => opt.optionId === optionId);

      if (index !== -1) {
        updated[index] = { optionId, valueId };
      } else {
        updated.push({ optionId, valueId });
      }

      return updated;
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Gallery */}
        <ProductImageGallery
          images={product.images}
          productName={product.name}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {/* Product Info */}
        <div className="flex-1 max-w-lg mx-auto lg:mx-0">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-xl">${price.toFixed(2)}</span>
            {compareAtPrice && price < compareAtPrice && (
              <span className="text-gray-400 line-through text-base">
                ${compareAtPrice.toFixed(2)}
              </span>
            )}
            {price < compareAtPrice && !soldOut && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm font-medium tracking-wide">
                Sale
              </span>
            )}
            {soldOut && (
              <span className="ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-sm font-medium tracking-wide">
                Sold out
              </span>
            )}
          </div>
          {/* Dynamic Options */}
          <form className="flex flex-col gap-4 mb-4">
            <ProductOptionSelector
              options={product.options}
              onSelect={handleOptionSelect}
              selectedOptions={selectedOptions}
            />

            {/* SKU and Available Quantity */}
            <div className="flex items-center gap-4">
              {variant?.sku && (
                <span className="text-xs text-gray-500">
                  SKU: {variant.sku}
                </span>
              )}
              <span className="text-xs text-gray-500">
                Available: {variant ? availableQty : 0}
              </span>
            </div>
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                max={availableQty}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, Math.min(availableQty, Number(e.target.value)))
                  )
                }
                className="w-20 border rounded-sm px-2 py-1"
                disabled={soldOut}
              />
            </div>
            {/* Add to Cart */}
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-sm font-medium text-base hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={soldOut || quantity < 1}
            >
              {soldOut ? "Not available" : "Add to cart"}
            </button>
          </form>
          {/* Description */}
          {product.description && (
            <details className="mb-2" open>
              <summary className="font-semibold cursor-pointer select-none py-2">
                Description
              </summary>
              <div className="text-sm text-gray-700 py-2 border-t border-gray-100">
                {product.description}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
