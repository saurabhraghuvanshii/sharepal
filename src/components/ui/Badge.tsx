import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type BadgeTone = "trending" | "new" | "launch" | "muted" | "danger";

const tones: Record<BadgeTone, string> = {
  trending: "bg-warning-100 text-warning-700",
  new: "bg-secondary-500 text-secondary-900",
  launch: "bg-category-purple text-gray-100",
  muted: "bg-neutral-200 text-neutral-700",
  danger: "bg-destructive-100 text-destructive-600",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = "muted", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] leading-4 font-bold tracking-wide uppercase md:text-xs",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
