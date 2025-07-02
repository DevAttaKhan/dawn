import prisma from "@/prisma/prisma";

import HeaderClientNav from "./HeaderClientNav";

async function getFeaturedData() {
  return await prisma.category.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: { name: "asc" },
    include: {
      image: true,
      products: { where: { isFeatured: true }, include: { images: true } },
      children: { include: { image: true } },
    },
    take: 8,
  });
}

// Helper to fetch featured collections and their products
async function getFeaturedCollectionsData() {
  // Get featured collections
  const collections = await prisma.collection.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: { priority: "desc" },

    include: {
      image: true,
      products: {
        where: { status: "ACTIVE", isFeatured: true },
        include: { images: { take: 1 } },
      },
    },
  });
  // Flatten all products from all collections, remove duplicates by id
  const allProducts = collections.flatMap((col) => col.products);
  const uniqueProducts = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values()
  );
  return { collections, products: uniqueProducts };
}

const Header: React.FC = async () => {
  const categories = await getFeaturedData();
  const { collections, products: collectionProducts } =
    await getFeaturedCollectionsData();

  return (
    <HeaderClientNav
      categories={categories}
      collections={collections}
      collectionProducts={collectionProducts}
    />
  );
};

export default Header;
