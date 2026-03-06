/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  type CartAction,
  type CartItem,
} from "../features/cart/cart-reducer";

const CART_STORAGE_KEY = "product-cart-items";

const CartStateContext = createContext<CartItem[] | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(
  undefined
);

const loadInitialCart = (): CartItem[] => {
  try {
    const rawData = localStorage.getItem(CART_STORAGE_KEY);
    if (!rawData) {
      return [];
    }

    const parsed = JSON.parse(rawData) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, [], loadInitialCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = (): CartItem[] => {
  const state = useContext(CartStateContext);

  if (!state) {
    throw new Error("useCartState must be used inside CartProvider");
  }

  return state;
};

export const useCartDispatch = (): Dispatch<CartAction> => {
  const dispatch = useContext(CartDispatchContext);

  if (!dispatch) {
    throw new Error("useCartDispatch must be used inside CartProvider");
  }

  return dispatch;
};

export const useCartSummary = () => {
  const state = useCartState();

  return useMemo(
    () => ({
      count: getCartCount(state),
      subtotal: getCartSubtotal(state),
    }),
    [state]
  );
};
