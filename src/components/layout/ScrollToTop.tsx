"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** Appears after one viewport of scroll. */
export function ScrollToTop() {
  const visible = useSyncExternalStore(
    subscribe,
    () => window.scrollY > window.innerHeight,
    () => false,
  );

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        window.scrollTo({ top: 0 });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className={cn(
        "fixed right-4 bottom-[calc(8.5rem+env(safe-area-inset-bottom))] z-30 flex size-11 items-center justify-center rounded-full bg-gray-100 text-primary-900 shadow-medium transition-all duration-300 hover:bg-primary-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none lg:right-8 lg:bottom-10",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
