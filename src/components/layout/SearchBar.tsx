"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { matchesQuery } from "@/lib/products";
import type { ProductSummary } from "@/types/product";

export interface SearchBarProps {
  products: readonly ProductSummary[];
  listingPath: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
}

const MAX_SUGGESTIONS = 6;

/** ARIA combobox with product-name suggestions from product-list.json. */
export function SearchBar({
  products,
  listingPath,
  onNavigate,
  autoFocus,
}: SearchBarProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);

  const suggestions = useMemo(
    () =>
      query.trim()
        ? products
            .filter((p) => matchesQuery(p, query))
            .slice(0, MAX_SUGGESTIONS)
        : [],
    [products, query],
  );
  const expanded = suggestions.length > 0;

  function go(href: string) {
    router.push(href);
    onNavigate?.();
  }

  function searchFor(text: string) {
    go(`${listingPath}?q=${encodeURIComponent(text.trim())}#products`);
  }

  function submit() {
    const chosen = active >= 0 ? suggestions[active] : undefined;
    if (chosen) searchFor(chosen.name);
    else if (query.trim()) searchFor(query);
  }

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search gaming gadgets
      </label>
      <div className="flex h-12 items-center gap-2 rounded-full border-2 border-neutral-200 bg-gray-100 px-4 transition-colors focus-within:border-primary-500">
        <Search
          className="size-5 shrink-0 text-neutral-400"
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
          placeholder="Search for PS5, FC 27, racing wheel…"
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
          className="h-full w-full bg-transparent text-b3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="flex size-7 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-150"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <ul
        id={`${listId}-list`}
        role="listbox"
        aria-label="Suggestions"
        className={cn("mt-3 flex flex-col gap-1", !expanded && "hidden")}
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
              "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-b4 text-neutral-700",
              index === active && "bg-primary-100 text-primary-900",
            )}
          >
            <span className="line-clamp-1">{product.name}</span>
            <span className="shrink-0 text-sh7 text-neutral-400">
              {formatINR(product.per_day_rent)}/day
            </span>
          </li>
        ))}
      </ul>
      {query.trim() && !expanded && (
        <p className="mt-4 px-1 text-b4 text-neutral-500" role="status">
          No matching products. Press Enter to search the listing anyway.
        </p>
      )}
    </form>
  );
}
