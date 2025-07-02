import prisma from "@/prisma/prisma";
import CollectionGridWithFilters from "@/views/collection/CollectionGridWithFilters";
import { Prisma } from "@prisma/client";

const PAGE_SIZE = 3;

export default async function CollectionListPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const awaitedSearchParams = await searchParams;

  const search = awaitedSearchParams?.q as string;
  const sort = awaitedSearchParams?.sortBy as string;
  const page = parseInt(awaitedSearchParams?.page as string) || 1;

  const isFeatured = sort === "featured";

  const where: Prisma.CollectionWhereInput = {
    ...(isFeatured && { isFeatured: true }),

    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const orderBy: Prisma.CollectionOrderByWithRelationInput = getSortOrder(sort);

  const total = await prisma.collection.count({ where });

  const collections = await prisma.collection.findMany({
    where,
    include: { image: true },
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">All Collections</h1>

      <CollectionGridWithFilters
        collections={collections}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}

function getSortOrder(
  sort?: string
): Prisma.CollectionOrderByWithRelationInput {
  switch (sort) {
    case "name-asc":
      return { name: "asc" };
    case "name-desc":
      return { name: "desc" };
    case "date-asc":
      return { createdAt: "asc" };
    case "date-desc":
      return { createdAt: "desc" };
    case "featured":
    default:
      return { priority: "desc" };
  }
}
