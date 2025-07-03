import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";
import ProductDetailContent, {
  SelectOptionType,
} from "@/views/product/ProductDetailContent";

interface ProductPageProps {
  params: { handle: string };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = params;
  // Fetch product by slug, including images, variants, options, and attributes
  const product = await prisma.product.findUnique({
    where: { slug: handle },
    include: {
      images: true,
      variants: {
        include: {
          attributes: true,
          optionValues: true,
        },
      },
      options: {
        include: {
          values: true,
        },
      },
      attributes: true,
    },
  });

  if (!product) return notFound();

  // Default selected options as array of SelectOptionType
  const defaultSelectedOptions: SelectOptionType[] = product.options
    .map((opt) => {
      const firstValue = opt.values[0];
      if (!firstValue) return null;

      return {
        optionId: opt.id,
        valueId: firstValue.id,
      };
    })
    .filter(Boolean) as SelectOptionType[];

  return (
    <ProductDetailContent
      product={product}
      defaultSelected={defaultSelectedOptions}
    />
  );
}
