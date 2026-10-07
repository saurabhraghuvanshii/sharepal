import { PartyPopper } from "lucide-react";

import { searchPromo } from "@/config/site";

/** Coupon banner shown at the top of the search panel. */
export function SearchPromo() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-gradient-to-r from-primary-100 via-gray-100 to-secondary-100 px-4 py-3.5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-secondary-500 shadow-soft">
        <PartyPopper className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sh4 text-neutral-900 md:text-h6">
          <span className="text-destructive-500">{searchPromo.highlight}</span>{" "}
          {searchPromo.rest}
        </p>
        <p className="mt-1 text-sh5 text-neutral-700">
          Use Coupon - {searchPromo.code}
        </p>
      </div>
    </div>
  );
}
