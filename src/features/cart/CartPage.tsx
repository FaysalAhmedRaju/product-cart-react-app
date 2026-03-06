import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  useCartDispatch,
  useCartState,
  useCartSummary,
} from "../../context/CartContext";
import { useFeatureFlag } from "../../hooks/useFeatureFlag";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const CartPage = () => {
  const cartItems = useCartState();
  const { subtotal } = useCartSummary();
  const dispatch = useCartDispatch();
  const enableDiscount = useFeatureFlag();

  const discountAmount = enableDiscount ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add products from the catalog to start building your order.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Go to products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Cart</h1>
      <p className="mt-1 text-sm text-slate-600">
        Review items, update quantity, and checkout totals.
      </p>

      <div className="mt-6 space-y-4">
        {cartItems.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg bg-slate-100 object-contain p-2"
                />
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {formatCurrency(item.price)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="sr-only" htmlFor={`qty-${item.id}`}>
                  Quantity for {item.title}
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { id: item.id, quantity: Number(event.target.value) },
                    })
                  }
                  className="w-20 rounded-lg border border-slate-300 px-2 py-2 text-center text-sm"
                />
                <Button
                  variant="danger"
                  onClick={() =>
                    dispatch({ type: "REMOVE", payload: { id: item.id } })
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-sm text-slate-700">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {enableDiscount ? (
          <div className="mt-2 flex items-center justify-between text-sm text-emerald-700">
            <span>10% discount</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-base font-bold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </aside>
    </section>
  );
};
