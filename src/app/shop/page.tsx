import prisma from "@/prisma/prisma";
import FilterSidebar from "@/views/shop/FilterSidebar";
import ProductGrid from "@/views/shop/ProductGrid";
import { Prisma } from "@prisma/client";

const PAGE_SIZE = 9;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  // Parse query params
  const awaitedSearchParams = await searchParams;
  const page = parseInt((awaitedSearchParams?.page as string) || "1", 10) || 1;
  const search = (awaitedSearchParams?.q as string) || "";
  const sort = (awaitedSearchParams?.sort as string) || "";
  const priceMin = awaitedSearchParams?.price_min as string;
  const priceMax = awaitedSearchParams?.price_max as string;
  const category = awaitedSearchParams?.category;
  const categoryArray = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  // Fetch all categories for sidebar
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { name: true },
    orderBy: { name: "asc" },
  });

  const priceFilter: Prisma.IntFilter = {};

  if (priceMin) {
    priceFilter.gte = parseInt(priceMin, 10);
  }

  if (priceMax) {
    priceFilter.lte = parseInt(priceMax, 10);
  }

  // Build Prisma where clause
  const where: Prisma.ProductWhereInput = {
    status: "ACTIVE",
    ...(search && { name: { contains: search, mode: "insensitive" } }),
    ...(categoryArray.length > 0 && {
      categories: { some: { name: { in: categoryArray } } },
    }),

    ...(Object.keys(priceFilter).length > 0 && {
      salePrice: priceFilter,
    }),
  };

  // Sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  switch (sort) {
    case "price-asc":
      orderBy = { basePrice: "asc" };
      break;
    case "price-desc":
      orderBy = { basePrice: "desc" };
      break;
    case "name-asc":
      orderBy = { name: "asc" };
      break;
    case "name-desc":
      orderBy = { name: "desc" };
      break;
    case "date-asc":
      orderBy = { createdAt: "asc" };
      break;
    case "date-desc":
      orderBy = { createdAt: "desc" };
      break;
    default:
      break;
  }

  // Fetch products and total count
  const total = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    where,
    include: { images: true, categories: true },
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      {/* Filter Sidebar */}
      <div className="md:w-1/4 w-full mb-6 md:mb-0">
        <FilterSidebar
          categories={categories.map((c) => ({ name: c.name }))}
          appliedFilters={{
            category: categoryArray,
            price_min: priceMin,
            price_max: priceMax,
            search,
          }}
        />
      </div>
      {/* Product Grid */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Shop All Products</h1>
        <ProductGrid
          products={products}
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}
