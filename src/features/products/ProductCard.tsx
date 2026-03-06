import { memo } from "react";
import { Button } from "../../components/ui/Button";
import type { Product } from "../../types/product";

type ViewMode = "grid" | "list";

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onAddToCart: (product: Product) => void;
}

const ProductCardComponent = ({
  product,
  viewMode,
  onAddToCart,
}: ProductCardProps) => (
  <article
    className={`h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md ${
      viewMode === "list" ? "flex gap-4" : "flex flex-col"
    }`}
  >
    <img
      src={product.image}
      alt={product.title}
      className={`rounded-xl bg-slate-100 object-contain p-3 ${
        viewMode === "list" ? "h-28 w-28 shrink-0" : "h-44 w-full"
      }`}
      loading="lazy"
    />

    <div className="mt-4 flex min-w-0 flex-1 flex-col">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {product.category}
      </p>
      <h2 className="mt-1 min-h-12 overflow-hidden text-sm font-semibold text-slate-900">
        {product.title}
      </h2>
      <p className="mt-3 text-lg font-bold text-slate-900">
        ${product.price.toFixed(2)}
      </p>

      <Button
        onClick={() => onAddToCart(product)}
        className="mt-auto w-full"
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </Button>
    </div>
  </article>
);

export const ProductCard = memo(ProductCardComponent);
