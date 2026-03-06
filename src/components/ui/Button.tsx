import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-slate-900",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-500",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600",
};

export const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
  >
    {children}
  </button>
);
