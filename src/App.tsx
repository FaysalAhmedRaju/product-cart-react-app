import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./features/products/ProductList";
import { CartPage } from "./features/cart/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;