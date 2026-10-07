"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface CategorySearchProps {
  value: string;
  onSearch: (query: string) => void;
  delay?: number;
}

/** Debounced search within the listing. Local text state keeps typing instant. */
export function CategorySearch({
  value,
  onSearch,
  delay = 300,
}: CategorySearchProps) {
  const [text, setText] = useState(value);
  const [lastValue, setLastValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync when the URL changes from elsewhere (chip removal, back/forward).
  if (value !== lastValue) {
    setLastValue(value);
    setText(value);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  function schedule(next: string) {
    setText(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(next), delay);
  }

  return (
    <div className="relative w-full md:max-w-xs">
      <label htmlFor="category-search" className="sr-only">
        Search in gaming gadgets
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <input
        id="category-search"
        type="search"
        value={text}
        placeholder="Search in gaming gadgets"
        autoComplete="off"
        onChange={(event) => schedule(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            clearTimeout(timer.current);
            onSearch(text);
          }
        }}
        className="h-9 w-full rounded-full border border-neutral-200 bg-gray-100 pr-9 pl-10 text-sm text-neutral-900 transition-colors placeholder:text-neutral-300 hover:border-primary-250 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {text && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            clearTimeout(timer.current);
            setText("");
            onSearch("");
          }}
          className="absolute top-1/2 right-1.5 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-150"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
