"use client";

import { Check, ChevronDown, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { cities, DEFAULT_CATEGORY, LIVE_SITE } from "@/config/site";
import { cn } from "@/lib/cn";

export interface LocationPickerProps {
  currentCity: string;
  variant: "desktop" | "mobile";
}

/**
 * City menu-button. Bangalore is served by this build; other cities link out to the live
 * SharePal page because product-list.json only covers Bangalore.
 */
export function LocationPicker({ currentCity, variant }: LocationPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();
  const current = cities.find((c) => c.slug === currentCity) ?? cities[0];

  useEffect(() => {
    if (!open) return;
    itemsRef.current[cities.findIndex((c) => c.slug === currentCity)]?.focus();
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, currentCity]);

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = itemsRef.current.filter(
      (x): x is HTMLAnchorElement => x !== null,
    );
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    let next: number | null = null;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp")
      next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "Escape" || event.key === "Tab") {
      setOpen(false);
      if (event.key === "Escape") buttonRef.current?.focus();
      return;
    }
    if (next === null) return;
    event.preventDefault();
    items[next]?.focus();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Location: ${current?.name}. Change city`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "flex items-center justify-center gap-1 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none",
          variant === "desktop"
            ? "h-full rounded-l-full bg-neutral-200 px-2.5 py-1.5 text-sm text-primary-900 hover:bg-neutral-250"
            : "rounded-full border border-category-purple bg-category-purple px-2.5 py-1 text-xs text-gray-100 shadow-md",
        )}
      >
        <MapPin className="size-4" aria-hidden="true" />
        {current?.name}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Choose your city"
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute top-[calc(100%+0.5rem)] z-50 w-56 animate-pop-in rounded-2xl border border-neutral-200 bg-gray-100 p-2 shadow-medium",
            variant === "desktop" ? "left-0" : "right-0",
          )}
        >
          <p className="px-3 pt-1 pb-2 text-sh7 tracking-wide text-neutral-400 uppercase">
            Select city
          </p>
          <ul className="max-h-72 overflow-y-auto">
            {cities.map((city, index) => {
              const isCurrent = city.slug === currentCity;
              const href = isCurrent
                ? `/${city.slug}/${DEFAULT_CATEGORY}`
                : `${LIVE_SITE}/${city.slug}/${DEFAULT_CATEGORY}`;
              return (
                <li key={city.slug} role="none">
                  <Link
                    ref={(node) => {
                      itemsRef.current[index] = node;
                    }}
                    role="menuitem"
                    href={href}
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2 text-b4 transition-colors focus-visible:outline-none",
                      isCurrent
                        ? "bg-primary-100 text-primary-500"
                        : "text-neutral-700 hover:bg-neutral-150 focus-visible:bg-neutral-150",
                    )}
                  >
                    {city.name}
                    {isCurrent ? (
                      <Check className="size-4" aria-hidden="true" />
                    ) : (
                      <ExternalLink
                        className="size-3.5 text-neutral-300"
                        aria-label="opens sharepal.in"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
