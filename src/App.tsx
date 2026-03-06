import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { CartProvider } from "./context/CartContext";
import { CartPage } from "./features/cart/CartPage";
import { ProductList } from "./features/products/ProductList";

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </CartProvider>
);

export default App;
