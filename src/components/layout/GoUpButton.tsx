"use client";

import { ArrowUp } from "lucide-react";

export function GoUpButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className="flex items-center gap-2 rounded-sm hover:text-gray-100 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:outline-none max-md:w-full max-md:justify-center max-md:bg-primary-850 max-md:py-2"
    >
      Go up <ArrowUp className="size-4" aria-hidden="true" />
    </button>
  );
}
