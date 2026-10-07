import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  options: readonly SelectOption[];
  label: string;
  hideLabel?: boolean;
}

/** Native select (fully keyboard accessible) styled as a SharePal pill. */
export function Select({
  options,
  label,
  hideLabel = false,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label
        htmlFor={selectId}
        className={cn(
          "text-b4 whitespace-nowrap text-neutral-500",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          className="h-9 w-full appearance-none rounded-full border border-neutral-200 bg-gray-100 py-0 pr-9 pl-4 text-sm font-semibold text-primary-900 transition-colors hover:border-primary-250 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
