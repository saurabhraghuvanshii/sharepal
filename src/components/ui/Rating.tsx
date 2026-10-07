import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

export interface RatingProps {
  value: number;
  max?: number;
  showValue?: boolean;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  showValue = true,
  className,
}: RatingProps) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of ${max}`}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: max }, (_, index) => {
          const fill = Math.max(0, Math.min(1, value - index));
          return (
            <span key={index} className="relative size-[11px] md:size-[14px]">
              <Star className="absolute inset-0 size-full fill-neutral-200 text-neutral-200" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className="size-[11px] fill-warning-500 text-warning-500 md:size-[14px]" />
              </span>
            </span>
          );
        })}
      </span>
      {showValue && (
        <span
          className="text-[11px] font-semibold text-neutral-500 md:text-xs"
          aria-hidden="true"
        >
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
