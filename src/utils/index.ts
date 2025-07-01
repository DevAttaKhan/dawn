import {
  ProductType,
  SelectOptionType,
} from "@/views/product/ProductDetailContent";
import { find, every, some, isEqual, pick } from "lodash";

export function getVariantFromProduct(
  product: ProductType,
  selectedOptions: SelectOptionType[]
) {
  return find(product.variants, (variant) =>
    every(selectedOptions, (selected) =>
      some(variant.optionValues, (opt) =>
        isEqual(pick(opt, ["optionId", "id"]), {
          optionId: selected.optionId,
          id: selected.valueId,
        })
      )
    )
  );
}
