import Link from "next/link";

import { brand } from "@/config/site";
import { cn } from "@/lib/cn";

export interface LogoProps {
  href: string;
  compact?: boolean;
}

/**
 * SharePal's "hanging tab" logo block. The original wordmark SVG is proprietary, so the
 * brand name is set in Ubuntu bold on the brand blue tab instead.
 */
export function Logo({ href, compact = false }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${brand.name} home`}
      className={cn(
        "flex shrink-0 items-end justify-center bg-primary-500 font-ubuntu font-bold tracking-tight text-gray-100 shadow-sm transition-colors hover:bg-primary-600",
        compact
          ? "h-10 rounded-b-xl px-3 pb-1.5 text-lg leading-none"
          : "h-[68px] w-40 rounded-b-2xl px-3 pb-3 text-[1.625rem] leading-none",
      )}
    >
      <span aria-hidden="true">
        share<span className="text-secondary-500">pal</span>
      </span>
    </Link>
  );
}
