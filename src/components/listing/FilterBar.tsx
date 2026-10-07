"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Button, Sheet } from "@/components/ui";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { countActiveFilters } from "@/lib/products";
import type { Facets, ListingParams } from "@/types/product";

import { CategorySearch } from "./CategorySearch";
import { FilterPanel } from "./FilterPanel";
import { SortSelect } from "./SortSelect";

export interface FilterBarProps {
  params: ListingParams;
  facets: Facets;
  resultCount: number;
  onChange: (patch: Partial<ListingParams>) => void;
  onReset: () => void;
}

export function FilterBar({
  params,
  facets,
  resultCount,
  onChange,
  onReset,
}: FilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const activeCount = countActiveFilters({
    ...params,
    query: "",
    subcategory: null,
  });

  // The sheet is mobile-only: treat it as closed once the viewport reaches the md breakpoint.
  const sheetVisible = sheetOpen && !isDesktop;

  return (
    <>
      {/* md+: inline toolbar */}
      <div className="hidden flex-col gap-3 md:flex">
        <div className="flex items-center justify-between gap-4">
          <CategorySearch
            value={params.query}
            onSearch={(query) => onChange({ query })}
          />
          <SortSelect
            value={params.sort}
            onChange={(sort) => onChange({ sort })}
          />
        </div>
        <FilterPanel
          params={params}
          facets={facets}
          onChange={onChange}
          layout="inline"
        />
      </div>

      {/* < md: sticky compact bar under the header */}
      <div className="sticky top-[var(--header-height)] z-20 -mx-2 flex flex-col gap-2 bg-page/95 px-2 py-2 backdrop-blur md:hidden">
        <CategorySearch
          value={params.query}
          onSearch={(query) => onChange({ query })}
        />
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSheetOpen(true)}
            aria-label={`Filters${activeCount ? `, ${activeCount} applied` : ""}`}
            className="h-9 px-3"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-gray-100">
                {activeCount}
              </span>
            )}
          </Button>
          <SortSelect
            value={params.sort}
            onChange={(sort) => onChange({ sort })}
            className="[&_label]:sr-only"
          />
        </div>
      </div>

      <Sheet
        open={sheetVisible}
        onClose={() => setSheetOpen(false)}
        title="Filters"
        side="bottom"
        footer={
          <div className="flex gap-3">
            <Button variant="soft" className="flex-1" onClick={onReset}>
              Reset
            </Button>
            <Button className="flex-1" onClick={() => setSheetOpen(false)}>
              Show {resultCount} {resultCount === 1 ? "result" : "results"}
            </Button>
          </div>
        }
      >
        <FilterPanel
          params={params}
          facets={facets}
          onChange={onChange}
          layout="stacked"
          showSubcategories
        />
      </Sheet>
    </>
  );
}
