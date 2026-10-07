"use client";

import {
  Car,
  Disc3,
  Gamepad2,
  LayoutGrid,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";
import type { Facets, SubcategorySlug } from "@/types/product";

export interface SubcategoryRailProps {
  subcategories: Facets["subcategories"];
  total: number;
  active: SubcategorySlug | null;
  onSelect: (slug: SubcategorySlug | null) => void;
}

const ICONS: Record<SubcategorySlug, LucideIcon> = {
  "ps5-combos": Gamepad2,
  "fc-games": Trophy,
  "digital-games": Disc3,
  accessories: Car,
};

/** Sticky left rail of subcategory tiles, styled after the original's category sidebar. */
export function SubcategoryRail({
  subcategories,
  total,
  active,
  onSelect,
}: SubcategoryRailProps) {
  const items = [
    { slug: null, label: "All", count: total, Icon: LayoutGrid },
    ...subcategories.map((s) => ({ ...s, Icon: ICONS[s.slug] })),
  ];

  return (
    <nav
      aria-label="Subcategories"
      className="sticky top-[calc(var(--header-height)+0.75rem)] max-h-[calc(100dvh-var(--header-height)-6rem)] scrollbar-none overflow-y-auto rounded-lg bg-gray-100 p-1 py-3 shadow-rail md:rounded-xl md:p-3"
    >
      <ul className="flex flex-col gap-3 lg:gap-4">
        {items.map(({ slug, label, count, Icon }) => {
          const selected = active === slug;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(slug)}
                aria-pressed={selected}
                aria-label={`${label} (${count})`}
                className="group flex w-full flex-col items-center gap-0.5 rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none md:gap-1"
              >
                <span
                  className={cn(
                    "flex aspect-square w-12 items-center justify-center rounded-lg transition-all duration-300 md:w-14 md:rounded-xl lg:w-16",
                    selected
                      ? "border-2 border-primary-500 bg-primary-100 text-primary-500"
                      : "border border-neutral-200 bg-gray-50 text-neutral-500 group-hover:bg-gray-100 group-hover:text-primary-500",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-6 transition-transform duration-300 group-hover:scale-110 md:size-7",
                      selected && "scale-105",
                    )}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={cn(
                    "line-clamp-2 max-w-[60px] text-center text-[10px] leading-tight font-semibold md:max-w-[80px] md:text-xs md:font-bold",
                    selected ? "text-primary-500" : "text-neutral-900",
                  )}
                >
                  {label}
                </span>
                {selected && (
                  <span
                    className="mx-auto h-0.5 w-4 rounded-full bg-primary-500 md:w-6 lg:w-8"
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
