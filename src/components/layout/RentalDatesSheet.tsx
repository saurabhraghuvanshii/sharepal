"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";

import { Button, Sheet } from "@/components/ui";
import { addDays, formatShortDate, rentalDays, todayISO } from "@/lib/dates";

import type { RentalDates } from "./RentalProvider";

export interface RentalDatesSheetProps {
  open: boolean;
  onClose: () => void;
  initial: RentalDates | null;
  onConfirm: (dates: RentalDates) => void;
}

export function RentalDatesSheet({
  open,
  onClose,
  initial,
  onConfirm,
}: RentalDatesSheetProps) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Select Rental Dates"
      side="bottom"
      className="md:mx-auto md:mt-[12vh] md:mb-auto md:max-w-md md:rounded-3xl"
    >
      {/* Remount the form each time the sheet opens so it starts from the saved dates. */}
      {open && <DatesForm initial={initial} onConfirm={onConfirm} />}
    </Sheet>
  );
}

interface DatesFormProps {
  initial: RentalDates | null;
  onConfirm: (dates: RentalDates) => void;
}

function DatesForm({ initial, onConfirm }: DatesFormProps) {
  const minDelivery = addDays(todayISO(), 1);
  const [delivery, setDelivery] = useState(initial?.delivery ?? minDelivery);
  const [pickup, setPickup] = useState(
    initial?.pickup ?? addDays(minDelivery, 3),
  );
  const minPickup = addDays(delivery, 2);
  const days = rentalDays(delivery, pickup);
  const valid = delivery >= minDelivery && pickup >= minPickup;

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (valid) onConfirm({ delivery, pickup });
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-sh5 text-neutral-500">Delivery Date</span>
          <input
            type="date"
            required
            min={minDelivery}
            value={delivery}
            onChange={(event) => {
              const next = event.target.value;
              setDelivery(next);
              if (pickup < addDays(next, 2)) setPickup(addDays(next, 2));
            }}
            className="h-11 rounded-xl border border-neutral-200 bg-gray-100 px-3 text-sm font-semibold text-primary-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sh5 text-neutral-500">Pickup Date</span>
          <input
            type="date"
            required
            min={minPickup}
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
            className="h-11 rounded-xl border border-neutral-200 bg-gray-100 px-3 text-sm font-semibold text-primary-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          />
        </label>
      </div>
      <p
        className="flex items-start gap-2 rounded-2xl bg-primary-100 p-3 text-b4 text-primary-800"
        aria-live="polite"
      >
        <CalendarDays
          className="mt-0.5 size-4 text-primary-500"
          aria-hidden="true"
        />
        {valid ? (
          <span>
            {days} rental {days === 1 ? "day" : "days"} · delivered{" "}
            {formatShortDate(delivery)}, picked up {formatShortDate(pickup)}.
            Rental starts the day after delivery and ends the day before pickup.
          </span>
        ) : (
          <span>Pickup must be at least two days after delivery.</span>
        )}
      </p>
      <Button type="submit" size="lg" disabled={!valid} className="w-full">
        Confirm dates
      </Button>
    </form>
  );
}
