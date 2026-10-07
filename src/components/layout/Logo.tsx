import Link from "next/link";

import { brand } from "@/config/site";
import { cn } from "@/lib/cn";

export interface LogoProps {
  href: string;
  compact?: boolean;
}

/**
 * SharePal's "hanging tab" logo block: the wordmark (white "Share", lime "Pal") is set in
 * Ubuntu bold italic on the brand-blue tab, approximating the original SVG.
 */
export function Logo({ href, compact = false }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${brand.name} home`}
      className={cn(
        "flex shrink-0 items-end justify-center bg-primary-500 font-ubuntu font-bold tracking-tighter text-gray-100 italic shadow-sm transition-colors hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none",
        compact
          ? "h-11 rounded-b-xl px-3 pb-2 text-xl leading-none"
          : "h-[68px] w-40 rounded-b-2xl px-3 pb-[18px] text-[1.75rem] leading-none",
      )}
    >
      <span aria-hidden="true">
        Share<span className="text-secondary-500">Pal</span>
      </span>
    </Link>
  );
}
