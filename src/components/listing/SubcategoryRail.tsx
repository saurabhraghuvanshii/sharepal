"use client";

import { LayoutGrid } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import type { Facets, SubcategorySlug } from "@/types/product";

export interface SubcategoryRailProps {
  subcategories: Facets["subcategories"];
  total: number;
  active: SubcategorySlug | null;
  onSelect: (slug: SubcategorySlug | null) => void;
}

/**
 * Sticky left rail of subcategory tiles, styled after the original's category sidebar.
 * Tile photos come from each subcategory's most-booked product in product-list.json.
 */
export function SubcategoryRail({
  subcategories,
  total,
  active,
  onSelect,
}: SubcategoryRailProps) {
  const items = [
    { slug: null, label: "All", count: total, image: null },
    ...subcategories,
  ];

  return (
    <nav
      aria-label="Subcategories"
      className="sticky top-[calc(var(--header-height)+0.75rem)] max-h-[calc(100dvh-var(--header-height)-6rem)] scrollbar-none overflow-y-auto rounded-xl bg-gray-100 px-1 py-3 shadow-rail md:rounded-2xl md:px-2 md:py-4"
    >
      <ul className="flex flex-col gap-3 md:gap-4 lg:gap-5">
        {items.map(({ slug, label, count, image }) => {
          const selected = active === slug;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(slug)}
                aria-pressed={selected}
                aria-label={`${label} (${count})`}
                className="group flex w-full flex-col items-center gap-1 rounded-xl focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none md:gap-1.5"
              >
                <span
                  className={cn(
                    "relative flex aspect-square w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 md:w-14 lg:w-16",
                    selected
                      ? "border-2 border-primary-500 text-primary-500"
                      : "border border-neutral-200 text-neutral-500 group-hover:border-primary-250 group-hover:text-primary-500",
                  )}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="64px"
                      className={cn(
                        "object-contain p-1 transition-transform duration-300 group-hover:scale-110",
                        selected && "scale-105",
                      )}
                    />
                  ) : (
                    <LayoutGrid
                      className="size-6 transition-transform duration-300 group-hover:scale-110 md:size-7"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "line-clamp-2 max-w-[64px] text-center text-[10px] leading-tight font-semibold md:max-w-[88px] md:text-xs lg:text-sm lg:leading-[18px]",
                    selected ? "text-primary-500" : "text-neutral-900",
                  )}
                >
                  {label}
                </span>
                {selected && (
                  <span
                    className="-mt-0.5 h-0.5 w-5 rounded-full bg-primary-500 md:w-6 lg:w-8"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
