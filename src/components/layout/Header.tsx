import { NavLink } from "react-router-dom";
import { useCartSummary } from "../../context/CartContext";
import { Badge } from "../ui/Badge";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

export const Header = () => {
  const { count } = useCartSummary();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/products" className="text-lg font-bold text-slate-900">
          Product Cart
        </NavLink>

        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <NavLink className={navLinkClass} to="/products">
            Products
          </NavLink>
          <NavLink className={navLinkClass} to="/cart">
            <span className="inline-flex items-center gap-2">
              Cart
              <Badge aria-label={`Cart has ${count} items`}>{count}</Badge>
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
