import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">Dawn</span>
        </div>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/shop" className="hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Bags
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Shoes
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Lookbook
          </a>
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button aria-label="Search" className="p-2 hover:bg-gray-100 rounded">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          {/* Account */}
          <button
            aria-label="Account"
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </button>
          {/* Cart */}
          <button aria-label="Cart" className="p-2 hover:bg-gray-100 rounded">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
