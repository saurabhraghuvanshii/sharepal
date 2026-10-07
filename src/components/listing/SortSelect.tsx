"use client";

import { Select } from "@/components/ui";
import { SORT_KEYS, SORT_LABELS } from "@/lib/products";
import type { SortKey } from "@/types/product";

export interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
  className?: string;
}

const OPTIONS = SORT_KEYS.map((key) => ({
  value: key,
  label: SORT_LABELS[key],
}));

export function SortSelect({ value, onChange, className }: SortSelectProps) {
  return (
    <Select
      id="sort"
      label="Sort by"
      options={OPTIONS}
      value={value}
      className={className}
      onChange={(event) => {
        const next = SORT_KEYS.find((key) => key === event.target.value);
        if (next) onChange(next);
      }}
    />
  );
}
