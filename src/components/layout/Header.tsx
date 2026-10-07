"use client";

import {
  CalendarClock,
  CalendarPlus,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Sheet } from "@/components/ui";
import { LIVE_SITE, superCategories } from "@/config/site";
import { useScrolledPast } from "@/hooks/useScrollY";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/dates";
import type { ProductSummary } from "@/types/product";

import { CartSheet } from "./CartSheet";
import { LocationPicker } from "./LocationPicker";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { useRental } from "./RentalProvider";
import { PopularItems } from "./PopularItems";
import { SearchBar } from "./SearchBar";
import { SearchPromo } from "./SearchPromo";

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
  const cart = useCart();
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

  const cartBadge = cart.count > 0 && (
    <span className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-secondary-500 px-1 text-[10px] leading-4 font-bold text-secondary-900">
      {cart.count}
    </span>
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 w-full bg-page transition-shadow duration-300",
          scrolled && "shadow-soft",
        )}
      >
        <div className="bg-category-purple-dark pt-[env(safe-area-inset-top)]">
          {/* Desktop */}
          <div className="container hidden h-[87px] items-start justify-between gap-4 lg:flex">
            <Logo href={listingPath} />
            <div className="flex h-10 items-stretch gap-3 self-center overflow-visible rounded-full border-2 border-category-purple bg-gray-100">
              <LocationPicker currentCity={city} variant="desktop" />
              <button
                type="button"
                onClick={openDatePicker}
                aria-label={
                  dates
                    ? `Rental dates: ${formatShortDate(dates.delivery)} to ${formatShortDate(dates.pickup)}. Edit dates`
                    : "Select rental dates"
                }
                className="flex items-center gap-4 rounded-full text-[15px] leading-5 font-medium text-neutral-700 hover:text-primary-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
              >
                <span className="flex items-center gap-2">
                  <CalendarClock className="size-4" aria-hidden="true" />
                  {dates ? formatShortDate(dates.delivery) : "Delivery Date"}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarClock className="size-4" aria-hidden="true" />
                  {dates ? formatShortDate(dates.pickup) : "Pickup Date"}
                </span>
              </button>
              <button
                type="button"
                onClick={openDatePicker}
                className="flex items-center gap-1.5 rounded-full bg-primary-900 px-3.5 text-[15px] font-semibold tracking-wide text-gray-100 transition-colors hover:bg-primary-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none"
              >
                <CalendarPlus className="size-4" aria-hidden="true" />
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
                aria-label={`Cart, ${cart.count} items`}
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="size-5" aria-hidden="true" />
                {cartBadge}
              </button>
              <a
                href={`${LIVE_SITE}/login`}
                className="group flex items-center gap-3 rounded-full text-base font-semibold text-gray-100 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none"
              >
                <span className="flex size-11 items-center justify-center rounded-full border-2 border-category-purple bg-gray-100 text-neutral-900 transition-colors group-hover:bg-gray-200">
                  <UserRound className="size-5" aria-hidden="true" />
                </span>
                Hi, Login
              </a>
            </div>
          </div>

          {/* Mobile */}
          <div className="container flex items-start justify-between gap-2 pb-2.5 lg:hidden">
            <Logo href={listingPath} compact />
            <div className="flex items-center gap-1.5 pt-1.5">
              <LocationPicker currentCity={city} variant="mobile" />
              <button
                type="button"
                onClick={openDatePicker}
                aria-label="Select rental dates"
                className="flex size-9 items-center justify-center rounded-full text-gray-100 hover:bg-gray-100/10 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none"
              >
                <CalendarClock className="size-5" aria-hidden="true" />
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
        </div>

        <nav aria-label="Categories" className="container">
          <ul className="flex scrollbar-none items-end justify-between overflow-x-auto sm:justify-center sm:gap-6 lg:gap-16">
            {superCategories.map((item) => {
              const active = "active" in item && item.active;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block border-b-2 px-1.5 pt-2.5 pb-2 text-center text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none focus-visible:ring-inset sm:min-w-28 sm:px-2.5 sm:text-sm md:text-[15px] lg:min-w-[120px]",
                      active
                        ? "border-category-purple-dark text-neutral-900"
                        : "border-transparent text-neutral-700 hover:border-neutral-250 hover:text-neutral-900",
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
        cartCount={cart.count}
        onSearch={() => setSearchOpen(true)}
        onCart={() => setCartOpen(true)}
      />

      <Sheet
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Search Products"
        side="right"
        closeAtStart
        className="md:w-[38rem]"
        bodyClassName="bg-page pt-4"
      >
        {searchOpen && (
          <SearchBar
            products={products}
            listingPath={listingPath}
            onNavigate={() => setSearchOpen(false)}
            autoFocus
            idle={(searchFor) => (
              <>
                <SearchPromo />
                <PopularItems
                  products={products}
                  onPick={(product) => searchFor(product.name)}
                />
              </>
            )}
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
