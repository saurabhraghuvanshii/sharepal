"use client";

import { Chip } from "@/components/ui";
import { cn } from "@/lib/cn";
import { activeBucket, PRICE_BUCKETS } from "@/lib/products";
import type { Facets, FilterTag, ListingParams } from "@/types/product";

export interface FilterPanelProps {
  params: ListingParams;
  facets: Facets;
  onChange: (patch: Partial<ListingParams>) => void;
  layout: "inline" | "stacked";
  /** Stacked layout only: also show subcategory chips (the rail is hidden in the sheet). */
  showSubcategories?: boolean;
}

function Group({
  label,
  layout,
  children,
}: {
  label: string;
  layout: FilterPanelProps["layout"];
  children: React.ReactNode;
}) {
  if (layout === "inline") {
    return (
      <div role="group" aria-label={label} className="flex items-center gap-2">
        {children}
      </div>
    );
  }
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sh5 text-neutral-500">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function FilterPanel({
  params,
  facets,
  onChange,
  layout,
  showSubcategories,
}: FilterPanelProps) {
  const bucket = activeBucket(params);

  function toggleTag(tag: FilterTag) {
    onChange({
      tags: params.tags.includes(tag)
        ? params.tags.filter((t) => t !== tag)
        : [...params.tags, tag],
    });
  }

  return (
    <div
      className={cn(
        layout === "inline"
          ? "flex flex-wrap items-center gap-x-4 gap-y-2"
          : "flex flex-col gap-6",
      )}
    >
      {showSubcategories && (
        <Group label="Category" layout={layout}>
          <Chip
            selected={params.subcategory === null}
            onClick={() => onChange({ subcategory: null })}
          >
            All
          </Chip>
          {facets.subcategories.map((s) => (
            <Chip
              key={s.slug}
              selected={params.subcategory === s.slug}
              onClick={() =>
                onChange({
                  subcategory: params.subcategory === s.slug ? null : s.slug,
                })
              }
            >
              {s.label}
              <span className="text-neutral-400">{s.count}</span>
            </Chip>
          ))}
        </Group>
      )}
      <Group label="Tags" layout={layout}>
        {facets.tags.map(({ tag, count }) => (
          <Chip
            key={tag}
            selected={params.tags.includes(tag)}
            onClick={() => toggleTag(tag)}
          >
            {tag}
            {layout === "stacked" && (
              <span className="text-neutral-400">{count}</span>
            )}
          </Chip>
        ))}
      </Group>
      <Group label="Availability" layout={layout}>
        <Chip
          selected={params.inStock}
          onClick={() => onChange({ inStock: !params.inStock })}
        >
          Available now
          {layout === "stacked" && (
            <span className="text-neutral-400">{facets.inStockCount}</span>
          )}
        </Chip>
      </Group>
      <Group label="Price per day" layout={layout}>
        {PRICE_BUCKETS.map((b) => (
          <Chip
            key={b.id}
            selected={bucket?.id === b.id}
            onClick={() =>
              onChange(
                bucket?.id === b.id
                  ? { minPrice: null, maxPrice: null }
                  : { minPrice: b.min, maxPrice: b.max },
              )
            }
          >
            {b.label}
          </Chip>
        ))}
      </Group>
    </div>
  );
}
