import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Toggleable pill used for filters. Exposes its state through `aria-pressed`. */
export function Chip({
  selected = false,
  className,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]",
        selected
          ? "border-primary-500 bg-primary-100 text-primary-500"
          : "border-neutral-200 bg-gray-100 text-neutral-700 hover:border-primary-250 hover:bg-primary-100/60",
        className,
      )}
      {...props}
    />
  );
}
