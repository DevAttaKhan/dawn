/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

type ProductCardProps = {
  handle: string;
  imageUrl?: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  soldOut?: boolean;
  onSale?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  handle,
  imageUrl,
  title,
  price,
  compareAtPrice,
  soldOut = false,
  onSale = false,
}) => {
  return (
    <Link
      href={`/product/${handle}`}
      className="group relative bg-white rounded-md overflow-hidden shadow-sm flex flex-col transition-all duration-200 hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            ?
          </div>
        )}
        {/* Badges */}
        {soldOut && (
          <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-sm font-medium tracking-wide">
            Sold out
          </span>
        )}
        {!soldOut && onSale && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm font-medium tracking-wide">
            Sale
          </span>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col p-4 gap-2">
        <h3 className="font-medium text-base line-clamp-2 min-h-[2.5em] leading-tight">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">{price}</span>
          {compareAtPrice && (
            <span className="text-gray-400 line-through text-sm">
              {compareAtPrice}
            </span>
          )}
        </div>
        <button
          className="mt-2 bg-black text-white px-4 py-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition font-medium text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-black/20"
          disabled={soldOut}
          tabIndex={-1}
          type="button"
        >
          {soldOut ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
