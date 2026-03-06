import type { Product } from "../../types/product";

export type SortOrder = "none" | "asc" | "desc";

interface ProductFilterOptions {
  category: string;
  search: string;
  sortOrder: SortOrder;
}

export const filterAndSortProducts = (
  products: Product[],
  options: ProductFilterOptions
): Product[] => {
  const normalizedSearch = options.search.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const categoryMatches =
      options.category === "all" || product.category === options.category;

    const searchMatches =
      normalizedSearch.length === 0 ||
      product.title.toLowerCase().includes(normalizedSearch);

    return categoryMatches && searchMatches;
  });

  if (options.sortOrder === "none") {
    return filtered;
  }

  return [...filtered].sort((left, right) =>
    options.sortOrder === "asc"
      ? left.price - right.price
      : right.price - left.price
  );
};
