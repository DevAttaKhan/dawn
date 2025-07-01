import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="w-full bg-gray-100 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Industrial design meets fashion.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Atypical leather goods. Functional handbags made of luxurious
          materials to improve people&apos;s lives in small but mighty ways.
        </p>
        <a
          href="#"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition"
        >
          Shop now
        </a>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Collection cards with Link */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded mb-4" />
            <h3 className="font-medium text-lg mb-2">Bags</h3>
            <Link
              href="/collection/bags"
              className="text-blue-600 hover:underline"
            >
              Shop all
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded mb-4" />
            <h3 className="font-medium text-lg mb-2">Shoes</h3>
            <Link
              href="/collection/shoes"
              className="text-blue-600 hover:underline"
            >
              Shop all
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded mb-4" />
            <h3 className="font-medium text-lg mb-2">Lookbook</h3>
            <Link
              href="/collection/lookbook"
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Dawn-theme ProductCard components */}
          <ProductCard
            handle="small-convertible-flex-bag"
            title="Small Convertible Flex Bag"
            price="$320.00"
            compareAtPrice="$395.00"
            onSale
            imageUrl={"https://placehold.co/300x300?text=Bag"}
          />
          <ProductCard
            handle="studio-bag"
            title="Studio Bag"
            price="$465.00"
            imageUrl={"https://placehold.co/300x300?text=Studio"}
          />
          <ProductCard
            handle="louise-slide-sandal"
            title="Louise Slide Sandal"
            price="$395.00"
            compareAtPrice="$430.00"
            onSale
            imageUrl={"https://placehold.co/300x300?text=Sandal"}
          />
          <ProductCard
            handle="mini-naomi-bag"
            title="Mini Naomi Bag"
            price="$299.00"
            compareAtPrice="$315.00"
            onSale
            soldOut
            imageUrl={"https://placehold.co/300x300?text=Mini+Naomi"}
          />
        </div>
      </section>
    </div>
  );
}
