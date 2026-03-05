import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../api/products";
import { Product } from "../../types/product";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="p-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search..."
          className="border px-3 py-2 rounded"
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="asc">Price Low → High</option>
          <option value="desc">Price High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};