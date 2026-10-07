import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

import { AssetPartnerBanner } from "./AssetPartnerBanner";
import { ProductCard } from "./ProductCard";
import { RentOutBanner } from "./RentOutBanner";

export interface ProductGridProps {
  products: readonly Product[];
  /** Number of leading images to preload (roughly the first row). */
  preloadCount?: number;
  busy?: boolean;
  /** Show the in-grid promo banners (after the 4th and 8th products). */
  showPromos?: boolean;
  /** Product photo for the Asset Partner banner. */
  promoImage?: string;
  children?: ReactNode;
}

/** Full-width banner rows, keyed by how many products precede them. */
function promoAfter(count: number, promoImage?: string): ReactNode {
  if (count === 4) return <AssetPartnerBanner image={promoImage} />;
  if (count === 8) return <RentOutBanner />;
  return null;
}

export const gridClassName =
  "grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4";

export function ProductGrid({
  products,
  preloadCount = 4,
  busy = false,
  showPromos = true,
  promoImage,
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
      {products.map((product, index) => {
        const promo = showPromos ? promoAfter(index + 1, promoImage) : null;
        return (
          <Fragment key={product.id}>
            <li>
              <ProductCard
                product={product}
                preloadImage={index < preloadCount}
              />
            </li>
            {promo && <li className="col-span-full my-2 md:my-3">{promo}</li>}
          </Fragment>
        );
      })}
      {children}
    </ul>
  );
}
