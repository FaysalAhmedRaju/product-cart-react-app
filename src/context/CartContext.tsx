import React, { createContext, useReducer, useContext } from "react";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

type Action =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: number }
  | { type: "UPDATE"; payload: { id: number; quantity: number } };

const CartContext = createContext<any>(null);

const reducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case "ADD":
      const existing = state.find(i => i.id === action.payload.id);
      if (existing) {
        return state.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE":
      return state.filter(i => i.id !== action.payload);

    case "UPDATE":
      return state.map(i =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);