"use client";

import { ArrowRight, Search, SearchX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { matchesQuery } from "@/lib/products";
import type { ProductSummary } from "@/types/product";

export interface SearchBarProps {
  products: readonly ProductSummary[];
  listingPath: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
  /** Rendered below the input while the query is empty (promo, popular items). */
  idle?: (searchFor: (text: string) => void) => ReactNode;
}

const MAX_SUGGESTIONS = 8;

/** ARIA combobox with product suggestions from product-list.json. */
export function SearchBar({
  products,
  listingPath,
  onNavigate,
  autoFocus,
  idle,
}: SearchBarProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);

  const trimmed = query.trim();
  const suggestions = useMemo(
    () =>
      trimmed
        ? products
            .filter((p) => matchesQuery(p, trimmed))
            .slice(0, MAX_SUGGESTIONS)
        : [],
    [products, trimmed],
  );
  const expanded = suggestions.length > 0;

  function searchFor(text: string) {
    router.push(`${listingPath}?q=${encodeURIComponent(text.trim())}#products`);
    onNavigate?.();
  }

  function submit() {
    const chosen = active >= 0 ? suggestions[active] : undefined;
    if (chosen) searchFor(chosen.name);
    else if (trimmed) searchFor(trimmed);
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search for products
        </label>
        <div className="flex h-12 items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-gray-100 pr-1.5 pl-4 transition-colors focus-within:border-primary-500">
          <Search
            className="size-5 shrink-0 text-neutral-500"
            aria-hidden="true"
          />
          <input
            id={`${listId}-input`}
            type="search"
            role="combobox"
            aria-expanded={expanded}
            aria-controls={`${listId}-list`}
            aria-autocomplete="list"
            aria-activedescendant={
              active >= 0 ? `${listId}-opt-${active}` : undefined
            }
            autoComplete="off"
            autoFocus={autoFocus}
            placeholder="Search for products"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(-1);
            }}
            onKeyDown={(event) => {
              if (!expanded) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => (i + 1) % suggestions.length);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
              }
            }}
            className="h-full w-full bg-transparent text-b3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="submit"
            aria-label="Search"
            disabled={!trimmed}
            className="flex size-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-neutral-150 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none disabled:hover:bg-transparent"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </form>

      <ul
        id={`${listId}-list`}
        role="listbox"
        aria-label="Suggestions"
        className={cn("flex flex-col gap-1.5", !expanded && "hidden")}
      >
        {suggestions.map((product, index) => (
          <li
            key={product.id}
            id={`${listId}-opt-${index}`}
            role="option"
            aria-selected={index === active}
            onPointerEnter={() => setActive(index)}
            onClick={() => searchFor(product.name)}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-100 p-2 transition-colors",
              index === active && "bg-primary-100",
            )}
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src={product.image}
                alt=""
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-sh5 text-neutral-900">
                {product.name}
              </span>
              <span className="text-b6 text-neutral-500">
                {formatINR(product.per_day_rent)}/day · {product.booked_count}+
                booked
              </span>
            </span>
          </li>
        ))}
      </ul>

      {trimmed && !expanded && (
        <div
          role="status"
          className="flex flex-col items-center gap-2 py-8 text-center"
        >
          <SearchX className="size-8 text-neutral-300" aria-hidden="true" />
          <p className="text-sh3 text-neutral-900">No matching products</p>
          <p className="text-b4 text-neutral-500">
            Press Enter to search the listing anyway.
          </p>
        </div>
      )}

      {!trimmed && idle?.(searchFor)}
    </div>
  );
}
