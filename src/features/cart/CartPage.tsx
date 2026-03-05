import { useCart } from "../../context/CartContext";
import { useFeatureFlag } from "../../hooks/useFeatureFlag";

export const CartPage = () => {
  const { state, dispatch } = useCart();
  const enableDiscount = useFeatureFlag();

  const subtotal = state.reduce(
    (acc: number, item: any) =>
      acc + item.price * item.quantity,
    0
  );

  const finalTotal = enableDiscount ? subtotal * 0.9 : subtotal;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {state.map(item => (
        <div key={item.id} className="flex justify-between mb-3">
          <span>
            {item.title} (x{item.quantity})
          </span>

          <button
            onClick={() =>
              dispatch({ type: "REMOVE", payload: item.id })
            }
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <hr className="my-4" />

      <p>Subtotal: ${subtotal.toFixed(2)}</p>

      {enableDiscount && (
        <p className="text-green-600">
          10% discount applied
        </p>
      )}

      <p className="font-bold">
        Total: ${finalTotal.toFixed(2)}
      </p>
    </div>
  );
};