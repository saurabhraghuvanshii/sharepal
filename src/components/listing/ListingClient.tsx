"use client";

import { ArrowDown } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui";
import { relatedCategories } from "@/config/site";
import { useListingParams } from "@/hooks/useListingParams";
import {
  filterProducts,
  getFacets,
  paginate,
  serializeListingParams,
  sortProducts,
} from "@/lib/products";
import type { Product } from "@/types/product";

import { ActiveFilters } from "./ActiveFilters";
import { EmptyState } from "./EmptyState";
import { FilterBar } from "./FilterBar";
import { ListingLayout } from "./ListingLayout";
import { ProductGrid } from "./ProductGrid";
import { SubcategoryRail } from "./SubcategoryRail";

export interface ListingClientProps {
  products: readonly Product[];
  title: string;
  pageSize: number;
}

/** Interactive listing: URL-synced filters/sort, dimmed results while a transition is pending. */
export function ListingClient({
  products,
  title,
  pageSize,
}: ListingClientProps) {
  const { params, setParams, reset, isPending } = useListingParams();
  const facets = useMemo(() => getFacets(products), [products]);
  const results = useMemo(
    () => sortProducts(filterProducts(products, params), params.sort),
    [products, params],
  );

  // Reset "Load more" whenever the filter set changes.
  const filterKey = serializeListingParams(params).toString();
  const [paging, setPaging] = useState({ key: filterKey, pages: 1 });
  const pages = paging.key === filterKey ? paging.pages : 1;
  const visible = paginate(results, pages, pageSize);

  return (
    <ListingLayout
      title={title}
      count={results.length}
      rail={
        <SubcategoryRail
          subcategories={facets.subcategories}
          total={products.length}
          active={params.subcategory}
          onSelect={(subcategory) => setParams({ subcategory })}
        />
      }
      toolbar={
        <>
          <FilterBar
            params={params}
            facets={facets}
            resultCount={results.length}
            onChange={setParams}
            onReset={reset}
          />
          <ActiveFilters
            params={params}
            onChange={setParams}
            onClearAll={reset}
          />
        </>
      }
      footer={
        results.length > 0 && (
          <>
            <p
              className="text-sm text-neutral-500 md:text-base"
              aria-live="polite"
            >
              Showing {visible.length} of {results.length} results
            </p>
            {visible.length < results.length && (
              <Button
                variant="soft"
                onClick={() => setPaging({ key: filterKey, pages: pages + 1 })}
                className="mt-1 font-semibold"
              >
                Load more <ArrowDown className="size-4" aria-hidden="true" />
              </Button>
            )}
          </>
        )
      }
    >
      {results.length === 0 ? (
        <EmptyState
          title="No gadgets match these filters"
          description={
            params.query
              ? `We couldn't find anything for “${params.query}”. Try a shorter search or remove a filter.`
              : "Try removing a filter or two to see more consoles and combos."
          }
          onClear={reset}
          suggestions={relatedCategories.slice(0, 4)}
        />
      ) : (
        <ProductGrid products={visible} busy={isPending} />
      )}
    </ListingLayout>
  );
}
