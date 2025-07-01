"use client";
import React from "react";
import Link from "next/link";

const collections = [
  {
    handle: "bags",
    title: "Bags",
    imageUrl: "https://placehold.co/300x300?text=Bags",
    description: "Shop all bags including totes, crossbody, and more.",
  },
  {
    handle: "shoes",
    title: "Shoes",
    imageUrl: "https://placehold.co/300x300?text=Shoes",
    description: "Discover sandals, boots, and more.",
  },
  {
    handle: "lookbook",
    title: "Lookbook",
    imageUrl: "https://placehold.co/300x300?text=Lookbook",
    description: "Explore our curated lookbook.",
  },
];

export default function CollectionListPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">All Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collections.map((col) => (
          <Link
            key={col.handle}
            href={`/collection/${col.handle}`}
            className="group block bg-white rounded-md shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <img
                src={col.imageUrl}
                alt={col.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                draggable={false}
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{col.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{col.description}</p>
              <span className="inline-block text-blue-600 font-medium text-sm group-hover:underline">
                View collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
