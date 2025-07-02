import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

type CollectionType = Prisma.CollectionGetPayload<{
  include: {
    image: true;
  };
}>;

type Props = {
  collections: CollectionType[];
};

const CollectionList: React.FC<Props> = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {collections.map((col) => (
        <Link
          key={col.id}
          href={`/collection/${col.slug}`}
          className="group block bg-white rounded-md shadow-sm hover:shadow-md transition overflow-hidden"
        >
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <img
              src={col.image?.url}
              alt={col.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              draggable={false}
            />
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-1">{col.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{col.description}</p>
            <span className="inline-block text-blue-600 font-medium text-sm group-hover:underline">
              View collection
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionList;
