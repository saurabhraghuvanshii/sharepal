import type { ReactNode } from "react";

import type { Product } from "@/types/product";

import { ListingLayout } from "./ListingLayout";
import { ProductGrid } from "./ProductGrid";
import { SubcategoryRailPlaceholder } from "./SubcategoryRailPlaceholder";

export interface ListingFallbackProps {
  products: readonly Product[];
  title: string;
  pageSize: number;
  hero: ReactNode;
}

/**
 * Server-rendered first page shown until the URL-aware client listing hydrates, so the
 * static HTML already contains real products (SEO, no empty flash).
 */
export function ListingFallback({
  products,
  title,
  pageSize,
  hero,
}: ListingFallbackProps) {
  return (
    <ListingLayout
      title={title}
      count={products.length}
      hero={hero}
      rail={<SubcategoryRailPlaceholder />}
      footer={
        <p className="text-sm text-neutral-500 md:text-base">
          Showing {Math.min(pageSize, products.length)} of {products.length}{" "}
          results
        </p>
      }
    >
      <div className="h-[84px] md:h-[92px]" aria-hidden="true" />
      <ProductGrid products={products.slice(0, pageSize)} />
    </ListingLayout>
  );
}
