"use client";

import { Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { formatINR } from "@/lib/format";
import type { ProductSummary } from "@/types/product";

export interface PopularItemsProps {
  products: readonly ProductSummary[];
  onPick: (product: ProductSummary) => void;
  limit?: number;
}

/**
 * Horizontal carousel of the most-booked rentable products, with a scroll-progress bar
 * under it as on the live search panel.
 */
export function PopularItems({
  products,
  onPick,
  limit = 8,
}: PopularItemsProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ size: 0, offset: 0 });

  const popular = useMemo(
    () =>
      products
        .filter((p) => !p.out_of_stock && p.tag !== "Vote to Launch")
        .toSorted((a, b) => b.booked_count - a.booked_count)
        .slice(0, limit),
    [products, limit],
  );

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const size = Math.min(1, el.clientWidth / el.scrollWidth);
    const max = el.scrollWidth - el.clientWidth;
    setProgress({
      size,
      offset: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0,
    });
  }

  // Measure once laid out (and on resize) so the bar reflects the visible share.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => onScroll());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="popular-items-title"
      className="flex flex-col gap-3"
    >
      <h3
        id="popular-items-title"
        className="flex items-center gap-3 text-[11px] font-semibold text-neutral-400"
      >
        Popular Items
        <span className="h-px flex-1 bg-neutral-200" aria-hidden="true" />
      </h3>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-1 flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto px-1 py-2"
      >
        {popular.map((product) => (
          <li key={product.id} className="w-40 shrink-0 snap-start md:w-44">
            <button
              type="button"
              onClick={() => onPick(product)}
              className="group flex w-full flex-col gap-1.5 rounded-2xl p-1.5 text-left transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
            >
              <span className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="176px"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="mt-1 truncate text-sh3 text-neutral-900">
                {product.name}
              </span>
              <span className="truncate text-b6 text-neutral-500">
                {product.name} on rent
              </span>
              <span className="text-sh4 text-neutral-900">
                {formatINR(product.per_day_rent)}
                <span className="text-b6 text-neutral-400">/day</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-success-600">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                {product.booked_count} booked
              </span>
              {product.rating > 0 && (
                <span
                  className="flex items-center gap-1 text-[11px] text-neutral-700"
                  aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
                >
                  <span className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={
                          i < Math.round(product.rating)
                            ? "size-3 fill-neutral-900 text-neutral-900"
                            : "size-3 fill-neutral-200 text-neutral-200"
                        }
                      />
                    ))}
                  </span>
                  <span aria-hidden="true">({product.rating.toFixed(1)})</span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div
        className="relative h-1 w-full overflow-hidden rounded-full bg-neutral-200"
        aria-hidden="true"
      >
        <span
          className="absolute inset-y-0 rounded-full bg-neutral-900 transition-[left] duration-150"
          style={{
            width: `${progress.size * 100}%`,
            left: `${progress.offset * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
