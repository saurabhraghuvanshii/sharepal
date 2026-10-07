"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { categoryMenus, superCategories } from "@/config/site";
import { cn } from "@/lib/cn";

type Label = (typeof superCategories)[number]["label"];

const CLOSE_DELAY_MS = 150;

/**
 * Header category tabs with hover/focus dropdown panels (md+), after the owner's
 * screenshots. Links flow down columns of four. ArrowDown on a tab moves into its
 * panel; Escape closes and returns focus to the tab.
 */
export function CategoryMenu() {
  const [openLabel, setOpenLabel] = useState<Label | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<Label, HTMLAnchorElement | null>>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Set while Escape returns focus to a tab, so that focus doesn't reopen the panel.
  const suppressFocusOpen = useRef(false);
  const panelId = useId();

  function open(label: Label) {
    clearTimeout(closeTimer.current);
    setOpenLabel(label);
  }

  function scheduleClose() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY_MS);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Centre the panel under its tab, clamped inside the nav (DOM write only).
  useLayoutEffect(() => {
    const nav = navRef.current;
    const panel = panelRef.current;
    const tab = openLabel ? tabRefs.current[openLabel] : null;
    if (!nav || !panel || !tab) return;
    const navBox = nav.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const width = panel.offsetWidth;
    const centre = tabBox.left - navBox.left + tabBox.width / 2;
    const left = Math.max(
      0,
      Math.min(centre - width / 2, navBox.width - width),
    );
    panel.style.left = `${left}px`;
  }, [openLabel]);

  function closeAndFocusTab() {
    const label = openLabel;
    setOpenLabel(null);
    if (label) {
      suppressFocusOpen.current = true;
      tabRefs.current[label]?.focus();
      suppressFocusOpen.current = false;
    }
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLAnchorElement>, label: Label) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      open(label);
      // Wait for the panel to render, then focus its first link.
      requestAnimationFrame(() =>
        panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
      );
    } else if (event.key === "Escape") {
      setOpenLabel(null);
    }
  }

  const links = openLabel ? categoryMenus[openLabel] : [];

  return (
    <nav
      ref={navRef}
      aria-label="Categories"
      className="relative container"
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!navRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpenLabel(null);
        }
      }}
    >
      <ul className="flex scrollbar-none items-end justify-between overflow-x-auto sm:justify-center sm:gap-6 lg:gap-16">
        {superCategories.map((item) => {
          const active = "active" in item && item.active;
          const isOpen = openLabel === item.label;
          return (
            <li key={item.label} onMouseEnter={() => open(item.label)}>
              <Link
                ref={(node) => {
                  tabRefs.current[item.label] = node;
                }}
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onFocus={() => {
                  if (!suppressFocusOpen.current) open(item.label);
                }}
                onKeyDown={(event) => onTabKeyDown(event, item.label)}
                className={cn(
                  "block border-b-2 px-1.5 pt-2.5 pb-2 text-center text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none focus-visible:ring-inset sm:min-w-28 sm:px-2.5 sm:text-sm md:text-[15px] lg:min-w-[120px]",
                  active
                    ? "border-category-purple-dark text-neutral-900"
                    : isOpen
                      ? "border-neutral-300 text-neutral-900"
                      : "border-transparent text-neutral-700 hover:border-neutral-250 hover:text-neutral-900",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {openLabel && links.length > 0 && (
        <div
          ref={panelRef}
          id={panelId}
          onMouseEnter={() => open(openLabel)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              closeAndFocusTab();
            }
          }}
          className="absolute top-full z-50 mt-1 hidden w-max max-w-full animate-pop-in rounded-3xl bg-gray-100 px-8 py-6 shadow-medium md:block"
        >
          <ul
            aria-label={`${openLabel} categories`}
            className="grid grid-flow-col grid-rows-4 gap-x-16 gap-y-1"
          >
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block rounded-lg py-2.5 text-[15px] leading-5 whitespace-nowrap text-neutral-900 transition-colors hover:text-primary-500 focus-visible:text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
