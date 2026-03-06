import type { Product } from "../../types/product";

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR" };

export const cartReducer = (
  state: CartItem[],
  action: CartAction
): CartItem[] => {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload.id);

    case "UPDATE_QUANTITY": {
      const safeQuantity = Number.isFinite(action.payload.quantity)
        ? Math.max(0, Math.floor(action.payload.quantity))
        : 0;

      if (safeQuantity === 0) {
        return state.filter((item) => item.id !== action.payload.id);
      }

      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: safeQuantity }
          : item
      );
    }

    case "CLEAR":
      return [];

    default:
      return state;
  }
};

export const getCartCount = (state: CartItem[]): number =>
  state.reduce((total, item) => total + item.quantity, 0);

export const getCartSubtotal = (state: CartItem[]): number =>
  state.reduce((total, item) => total + item.price * item.quantity, 0);
