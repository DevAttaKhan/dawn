import prisma from "@/prisma/prisma";
import ProductGridWithFilters from "@/views/product/ProductGridWithFilters";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { SortOption } from "@/types/enums";

const PAGE_SIZE = 9;

interface CollectionPageProps {
  params: { handle: string };
  searchParams: Record<string, string | string[]>;
}

export default async function CollectionHandlePage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { handle } = params;
  const awaitedSearchParams = await searchParams;

  // Parse query params
  const search = (awaitedSearchParams?.q as string) || "";
  const sort = awaitedSearchParams?.sortBy as string;
  const page = parseInt((awaitedSearchParams?.page as string) || "1", 10) || 1;
  const isFeatured = sort === "featured";

  const collection = await prisma.collection.findUnique({
    where: { slug: handle },
    select: { id: true, name: true, description: true },
  });

  if (!collection) notFound();

  // Build product filter
  const productWhere: Prisma.ProductWhereInput = {
    collections: { some: { id: collection.id } },
    status: "ACTIVE",
    ...(search && {
      name: { contains: search, mode: "insensitive" },
    }),
    ...(isFeatured && { isFeatured: true }),
  };

  // Sorting
  const orderBy = getSortOrder(sort);

  // Count total for pagination
  const total = await prisma.product.count({ where: productWhere });

  // Fetch paginated products
  const products = await prisma.product.findMany({
    where: productWhere,
    include: { images: { take: 1 } },
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold ">{collection?.name}</h1>
        <p className="text-gray-400">{collection?.description}</p>
      </div>
      <ProductGridWithFilters
        products={products}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        currentFilters={{ search, sort }}
      />
    </div>
  );
}

function getSortOrder(sort?: string): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case SortOption.NAME_ASC:
      return { name: "asc" };
    case SortOption.NAME_DESC:
      return { name: "desc" };
    case SortOption.DATE_ASC:
      return { createdAt: "asc" };
    case SortOption.DATE_DESC:
      return { createdAt: "desc" };
    case SortOption.FEATURED:
    default:
      return {};
  }
}
