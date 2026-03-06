import { useCallback, useEffect, useMemo, useState } from "react";
import { getCategories, getProducts } from "../../api/products";
import { Button } from "../../components/ui/Button";
import { useCartDispatch } from "../../context/CartContext";
import type { Product } from "../../types/product";
import { ProductCard } from "./ProductCard";
import { filterAndSortProducts, type SortOrder } from "./product-utils";

type ViewMode = "grid" | "list";

export const ProductList = () => {
  const dispatch = useCartDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (!isMounted) {
          return;
        }

        setProducts(productData);
        setCategories(categoryData);
      } catch {
        if (isMounted) {
          setErrorMessage("Failed to load products. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleProducts = useMemo(
    () => filterAndSortProducts(products, { category, search, sortOrder }),
    [products, category, search, sortOrder]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch({ type: "ADD", payload: product });
    },
    [dispatch]
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-8 text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">Product Catalog</h1>
        <p className="mt-2 text-sm text-slate-100">
          Search, filter, and sort products. Build cart interactions with clean
          state management.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Search
            <input
              type="search"
              value={search}
              placeholder="Search by title"
              onChange={(event) => setSearch(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900 transition focus:border-slate-900 focus:ring-1"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900 transition focus:border-slate-900 focus:ring-1"
            >
              <option value="all">All Categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Sort
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900 transition focus:border-slate-900 focus:ring-1"
            >
              <option value="none">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </label>

          <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            View
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "primary" : "secondary"}
                className="flex-1"
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "secondary"}
                className="flex-1"
                onClick={() => setViewMode("list")}
                aria-pressed={viewMode === "list"}
              >
                List
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold">{visibleProducts.length}</span>{" "}
          products
        </p>
      </div>

      {isLoading ? (
        <p className="mt-8 text-center text-slate-600">Loading products...</p>
      ) : null}

      {errorMessage ? (
        <p className="mt-8 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {!isLoading && !errorMessage && visibleProducts.length === 0 ? (
        <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
          No products match your filters.
        </p>
      ) : null}

      {!isLoading && !errorMessage && visibleProducts.length > 0 ? (
        <div
          className={`mt-6 ${
            viewMode === "grid"
              ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }`}
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};
