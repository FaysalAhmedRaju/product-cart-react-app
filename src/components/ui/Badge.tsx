import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const Badge = ({ children, className = "", ...props }: BadgeProps) => (
  <span
    {...props}
    className={`inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-2 text-xs font-semibold text-white ${className}`}
  >
    {children}
  </span>
);
