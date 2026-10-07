"use client";

import { X } from "lucide-react";

import { formatINR } from "@/lib/format";
import { activeBucket, SUBCATEGORY_LABELS } from "@/lib/products";
import type { ListingParams } from "@/types/product";

export interface ActiveFiltersProps {
  params: ListingParams;
  onChange: (patch: Partial<ListingParams>) => void;
  onClearAll: () => void;
}

interface ActiveChip {
  key: string;
  label: string;
  remove: Partial<ListingParams>;
}

function priceLabel(params: ListingParams): string {
  const bucket = activeBucket(params);
  if (bucket) return bucket.label;
  if (params.minPrice !== null && params.maxPrice !== null)
    return `${formatINR(params.minPrice)} – ${formatINR(params.maxPrice)}`;
  return params.minPrice !== null
    ? `From ${formatINR(params.minPrice)}`
    : `Up to ${formatINR(params.maxPrice ?? 0)}`;
}

/** One-click removable chips for every applied filter, plus "Clear all". */
export function ActiveFilters({
  params,
  onChange,
  onClearAll,
}: ActiveFiltersProps) {
  const chips: ActiveChip[] = [];
  if (params.query.trim())
    chips.push({
      key: "q",
      label: `“${params.query.trim()}”`,
      remove: { query: "" },
    });
  if (params.subcategory)
    chips.push({
      key: "sub",
      label: SUBCATEGORY_LABELS[params.subcategory],
      remove: { subcategory: null },
    });
  params.tags.forEach((tag) =>
    chips.push({
      key: `tag-${tag}`,
      label: tag,
      remove: { tags: params.tags.filter((t) => t !== tag) },
    }),
  );
  if (params.inStock)
    chips.push({
      key: "stock",
      label: "Available now",
      remove: { inStock: false },
    });
  if (params.minPrice !== null || params.maxPrice !== null)
    chips.push({
      key: "price",
      label: priceLabel(params),
      remove: { minPrice: null, maxPrice: null },
    });

  if (chips.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Applied filters"
      role="region"
    >
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onChange(chip.remove)}
          aria-label={`Remove filter ${chip.label}`}
          className="inline-flex h-8 animate-fade-in items-center gap-1 rounded-full bg-primary-900 py-0 pr-2 pl-3 text-b6 text-gray-100 transition-colors hover:bg-primary-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {chip.label}
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="h-8 rounded-full px-2 text-sh7 text-primary-500 underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
      >
        Clear all
      </button>
    </div>
  );
}
