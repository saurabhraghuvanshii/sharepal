import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: readonly Product[];
  /** Number of leading images to preload (roughly the first row). */
  preloadCount?: number;
  busy?: boolean;
  children?: ReactNode;
}

export const gridClassName =
  "grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4";

export function ProductGrid({
  products,
  preloadCount = 4,
  busy = false,
  children,
}: ProductGridProps) {
  return (
    <ul
      aria-busy={busy}
      className={cn(
        gridClassName,
        "transition-opacity duration-300",
        busy && "opacity-60",
      )}
    >
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} preloadImage={index < preloadCount} />
        </li>
      ))}
      {children}
    </ul>
  );
}
