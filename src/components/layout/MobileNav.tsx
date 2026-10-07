"use client";

import {
  ChevronRight,
  House,
  LayoutGrid,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Sheet } from "@/components/ui";
import { footerCategories, superCategories } from "@/config/site";

export interface MobileNavProps {
  listingPath: string;
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
}

const itemClass =
  "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-primary-900 transition-colors hover:text-primary-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none";

function NavLabel({ children }: { children: ReactNode }) {
  return <span className="text-[10px] leading-3 opacity-60">{children}</span>;
}

/** Fixed bottom navigation for < lg, as on the original (Home · Category · Search · Cart). */
export function MobileNav({
  listingPath,
  cartCount,
  onSearch,
  onCart,
}: MobileNavProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-gray-100 px-1.5 pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <div className="mx-auto flex w-full max-w-sm gap-0.5 py-1.5">
          <Link href={listingPath} className={itemClass}>
            <House className="size-5" aria-hidden="true" />
            <NavLabel>Home</NavLabel>
          </Link>
          <button
            type="button"
            className={itemClass}
            onClick={() => setCategoriesOpen(true)}
          >
            <LayoutGrid className="size-5" aria-hidden="true" />
            <NavLabel>Category</NavLabel>
          </button>
          <button type="button" className={itemClass} onClick={onSearch}>
            <Search className="size-5" aria-hidden="true" />
            <NavLabel>Search</NavLabel>
          </button>
          <button
            type="button"
            className={itemClass}
            onClick={onCart}
            aria-label={`Cart, ${cartCount} items`}
          >
            <span className="relative">
              <ShoppingCart className="size-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] leading-4 font-bold text-gray-100">
                  {cartCount}
                </span>
              )}
            </span>
            <NavLabel>Cart</NavLabel>
          </button>
        </div>
      </nav>

      <Sheet
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
        title="Categories"
        side="left"
      >
        <ul className="flex flex-col gap-1">
          {superCategories.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setCategoriesOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sh3 text-primary-900 transition-colors hover:bg-neutral-150"
              >
                {item.label}
                <ChevronRight
                  className="size-4 text-neutral-400"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 mb-2 px-3 text-sh7 tracking-wide text-neutral-400 uppercase">
          Browse all
        </p>
        <ul className="flex flex-wrap gap-2 px-1">
          {footerCategories.map((group) => (
            <li key={group.title}>
              <a
                href={group.links[0]?.href}
                className="block rounded-full border border-neutral-200 px-3 py-1.5 text-b6 text-neutral-700 hover:border-primary-250 hover:text-primary-500"
              >
                {group.title}
              </a>
            </li>
          ))}
        </ul>
      </Sheet>
    </>
  );
}
