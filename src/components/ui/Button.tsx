import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "brand" | "soft" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-4xl font-medium transition-colors duration-300 active:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-900 text-gray-100 hover:bg-primary-800",
  brand: "bg-primary-500 text-gray-100 hover:bg-primary-600",
  soft: "bg-neutral-150 text-primary-900 hover:bg-neutral-200",
  outline:
    "border border-neutral-200 bg-gray-100 text-primary-900 hover:bg-neutral-150",
  ghost: "bg-transparent text-primary-900 hover:bg-neutral-150",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  icon: "h-11 w-11 p-2",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Class string for button-styled elements that are not `<button>` (e.g. `next/link`). */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant,
  size,
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
