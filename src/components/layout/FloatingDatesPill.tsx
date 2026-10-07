"use client";

import { CalendarDays } from "lucide-react";

import { useRental } from "./RentalProvider";

/** "Select rental dates" pill floating above the mobile nav; hidden once dates are chosen. */
export function FloatingDatesPill() {
  const { dates, openDatePicker } = useRental();
  if (dates) return null;
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-30 flex justify-center lg:bottom-10">
      <button
        type="button"
        onClick={openDatePicker}
        className="pointer-events-auto flex animate-slide-up items-center gap-2 rounded-full border-2 border-secondary-500 bg-primary-900 px-[18px] py-3 text-sh5 text-gray-100 shadow-medium transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
      >
        <CalendarDays className="size-4" aria-hidden="true" />
        Select rental dates
      </button>
    </div>
  );
}
