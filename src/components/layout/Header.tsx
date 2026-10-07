"use client";

import { CalendarDays, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Sheet } from "@/components/ui";
import { LIVE_SITE, superCategories } from "@/config/site";
import { useScrolledPast } from "@/hooks/useScrollY";
import { useStoredIds } from "@/hooks/useStoredIds";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/dates";
import type { ProductSummary } from "@/types/product";

import { CART_KEY, CartSheet } from "./CartSheet";
import { LocationPicker } from "./LocationPicker";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { useRental } from "./RentalProvider";
import { SearchBar } from "./SearchBar";

export interface HeaderProps {
  city: string;
  listingPath: string;
  products: readonly ProductSummary[];
}

const iconButton =
  "relative flex size-11 items-center justify-center rounded-4xl text-gray-100 transition-colors duration-300 hover:bg-neutral-150 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none";

export function Header({ city, listingPath, products }: HeaderProps) {
  const scrolled = useScrolledPast(8);
  const { dates, openDatePicker } = useRental();
  const cart = useStoredIds(CART_KEY);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Publish the real header height so sticky elements below it can offset exactly.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry?.borderBoxSize[0]?.blockSize ?? header.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`,
      );
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const cartBadge = cart.ids.length > 0 && (
    <span className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-secondary-500 px-1 text-[10px] leading-4 font-bold text-secondary-900">
      {cart.ids.length}
    </span>
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 w-full bg-category-purple-dark pt-[env(safe-area-inset-top)] transition-shadow duration-300",
          scrolled && "shadow-medium",
        )}
      >
        {/* Desktop */}
        <div className="container hidden items-end justify-between gap-4 lg:flex">
          <Logo href={listingPath} />
          <div className="flex items-center gap-2 self-center rounded-full border-2 border-category-purple bg-gray-100 pr-0.5">
            <LocationPicker currentCity={city} variant="desktop" />
            <button
              type="button"
              onClick={openDatePicker}
              aria-label={
                dates
                  ? `Rental dates: ${formatShortDate(dates.delivery)} to ${formatShortDate(dates.pickup)}. Edit dates`
                  : "Select rental dates"
              }
              className="flex items-center gap-2 rounded-full px-2 py-2 text-sh5 text-neutral-700 hover:text-primary-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
            >
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden="true" />
                {dates ? formatShortDate(dates.delivery) : "Delivery Date"}
              </span>
              <span className="h-5 w-0.5 bg-neutral-200" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden="true" />
                {dates ? formatShortDate(dates.pickup) : "Pickup Date"}
              </span>
            </button>
            <button
              type="button"
              onClick={openDatePicker}
              className="flex h-9 items-center gap-1 rounded-4xl bg-primary-900 px-4 text-sm font-semibold tracking-wide text-gray-100 transition-colors hover:bg-primary-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none"
            >
              {dates ? "Edit" : "Select"}
            </button>
          </div>
          <div className="flex items-center gap-3 self-center">
            <button
              type="button"
              className={iconButton}
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label={`Cart, ${cart.ids.length} items`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="size-5" aria-hidden="true" />
              {cartBadge}
            </button>
            <a
              href={`${LIVE_SITE}/login`}
              className="group flex items-center gap-3 rounded-full text-sm font-medium text-gray-100 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none"
            >
              <span className="flex size-11 items-center justify-center rounded-full border-2 border-category-purple bg-gray-100 text-neutral-900 transition-colors group-hover:bg-gray-200">
                <UserRound className="size-5" aria-hidden="true" />
              </span>
              Hi, Login
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="container flex items-start justify-between gap-2 lg:hidden">
          <Logo href={listingPath} compact />
          <div className="flex items-center gap-1.5 pt-1.5">
            <LocationPicker currentCity={city} variant="mobile" />
            <button
              type="button"
              onClick={openDatePicker}
              aria-label="Select rental dates"
              className="flex size-9 items-center justify-center rounded-full text-gray-100 hover:bg-gray-100/10 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none"
            >
              <CalendarDays className="size-5" aria-hidden="true" />
            </button>
            <a
              href={`${LIVE_SITE}/login`}
              aria-label="Login"
              className="flex size-9 items-center justify-center rounded-full border-2 border-category-purple bg-gray-100 text-neutral-900 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none"
            >
              <UserRound className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Categories" className="container">
          <ul className="flex scrollbar-none items-center gap-0.5 overflow-x-auto py-2.5 max-sm:justify-between lg:justify-center lg:gap-3 lg:py-3">
            {superCategories.map((item) => {
              const active = "active" in item && item.active;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none sm:px-4 sm:text-sm md:px-4",
                      active
                        ? "bg-gray-100 text-category-purple-dark"
                        : "text-gray-100/80 hover:bg-gray-100/10 hover:text-gray-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <MobileNav
        listingPath={listingPath}
        cartCount={cart.ids.length}
        onSearch={() => setSearchOpen(true)}
        onCart={() => setCartOpen(true)}
      />

      <Sheet
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search"
        side="right"
      >
        {searchOpen && (
          <SearchBar
            products={products}
            listingPath={listingPath}
            onNavigate={() => setSearchOpen(false)}
            autoFocus
          />
        )}
      </Sheet>
      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        products={products}
      />
    </>
  );
}
