/* eslint-disable @next/next/no-img-element */
import { ProductImage } from "@prisma/client";
import React from "react";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
  selectedImage: number;
  setSelectedImage: (idx: number) => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <div className="flex-1 max-w-xl mx-auto lg:mx-0">
      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={images[selectedImage]?.url}
          alt={productName}
          className="object-cover w-full h-full"
          draggable={false}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, idx) => (
          <button
            key={img.id}
            className={`aspect-square rounded-md overflow-hidden border ${
              selectedImage === idx ? "border-black" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(idx)}
            aria-label={`View image ${idx + 1}`}
            type="button"
          >
            <img
              src={img.url}
              alt={img.alt || ""}
              className="object-cover w-full h-full"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
