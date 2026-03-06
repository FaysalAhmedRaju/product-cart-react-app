import { describe, expect, test } from "@jest/globals";
import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  type CartItem,
} from "./cart-reducer";

const baseProduct = {
  id: 1,
  title: "Test Product",
  price: 20,
  description: "A product for testing",
  category: "electronics",
  image: "https://example.com/item.jpg",
};

describe("cartReducer", () => {
  test("adds a new product with quantity 1", () => {
    const next = cartReducer([], { type: "ADD", payload: baseProduct });
    expect(next).toHaveLength(1);
    expect(next[0]?.quantity).toBe(1);
  });

  test("increments quantity when adding the same product", () => {
    const initial: CartItem[] = [{ ...baseProduct, quantity: 1 }];
    const next = cartReducer(initial, { type: "ADD", payload: baseProduct });
    expect(next[0]?.quantity).toBe(2);
  });

  test("updates quantity and removes when set to 0", () => {
    const initial: CartItem[] = [{ ...baseProduct, quantity: 2 }];
    const updated = cartReducer(initial, {
      type: "UPDATE_QUANTITY",
      payload: { id: baseProduct.id, quantity: 5 },
    });

    expect(updated[0]?.quantity).toBe(5);

    const removed = cartReducer(updated, {
      type: "UPDATE_QUANTITY",
      payload: { id: baseProduct.id, quantity: 0 },
    });

    expect(removed).toHaveLength(0);
  });

  test("removes an item by id", () => {
    const initial: CartItem[] = [{ ...baseProduct, quantity: 1 }];
    const next = cartReducer(initial, {
      type: "REMOVE",
      payload: { id: baseProduct.id },
    });
    expect(next).toHaveLength(0);
  });

  test("calculates count and subtotal helpers", () => {
    const state: CartItem[] = [
      { ...baseProduct, quantity: 2 },
      { ...baseProduct, id: 2, price: 10, quantity: 3 },
    ];

    expect(getCartCount(state)).toBe(5);
    expect(getCartSubtotal(state)).toBe(70);
  });
});
