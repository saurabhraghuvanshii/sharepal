"use client";

import { BadgePercent, CalendarClock, Info } from "lucide-react";
import { useState } from "react";

import { Button, RangeCalendar, Sheet } from "@/components/ui";
import { rentalDatesCopy } from "@/config/site";
import { cn } from "@/lib/cn";
import { addDays, formatShortDate, rentalDays, todayISO } from "@/lib/dates";

import type { RentalDates } from "./RentalProvider";

export interface RentalDatesSheetProps {
  open: boolean;
  onClose: () => void;
  initial: RentalDates | null;
  onConfirm: (dates: RentalDates) => void;
}

/** "Select your Dates" dialog: date fields + rental summary on the left, calendar on the right. */
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
      title={rentalDatesCopy.title}
      side="center"
      bodyClassName="pt-3 md:pt-4"
    >
      {/* Remount on open so the form starts from the confirmed dates. */}
      {open && <DatesForm initial={initial} onConfirm={onConfirm} />}
    </Sheet>
  );
}

type Field = "delivery" | "pickup";

/** Pickup must leave at least one chargeable day (delivery and pickup days are free). */
const MIN_GAP_DAYS = 2;

interface DatesFormProps {
  initial: RentalDates | null;
  onConfirm: (dates: RentalDates) => void;
}

function DatesForm({ initial, onConfirm }: DatesFormProps) {
  const today = todayISO();
  const max = addDays(today, rentalDatesCopy.maxDaysAhead);
  const [delivery, setDelivery] = useState<string | null>(
    initial?.delivery ?? null,
  );
  const [pickup, setPickup] = useState<string | null>(initial?.pickup ?? null);
  const [active, setActive] = useState<Field>(initial ? "pickup" : "delivery");

  const days = delivery && pickup ? rentalDays(delivery, pickup) : 0;
  const complete = delivery !== null && pickup !== null && days > 0;

  function select(iso: string) {
    if (active === "delivery" || delivery === null || iso <= delivery) {
      setDelivery(iso);
      if (pickup && pickup < addDays(iso, MIN_GAP_DAYS)) setPickup(null);
      setActive("pickup");
      return;
    }
    setPickup(iso);
  }

  const status = !delivery
    ? "Choose a delivery date on the calendar."
    : !pickup
      ? `Delivery on ${formatShortDate(delivery)}. Now choose a pickup date.`
      : `${days} chargeable ${days === 1 ? "day" : "days"} selected.`;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (complete) onConfirm({ delivery, pickup });
      }}
      className="grid gap-4 [grid-template-areas:'fields'_'calendar'_'details'] md:grid-cols-[minmax(0,29.75rem)_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-6 md:gap-y-4 md:[grid-template-areas:'fields_calendar'_'details_calendar']"
    >
      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      <div className="grid grid-cols-2 gap-3 [grid-area:fields]">
        <DateField
          label="Delivery Date"
          placeholder="Select delivery date"
          value={delivery}
          active={active === "delivery"}
          onActivate={() => setActive("delivery")}
        />
        <DateField
          label="Pickup Date"
          placeholder="Select pickup date"
          value={pickup}
          active={active === "pickup" && delivery !== null}
          onActivate={() => setActive(delivery ? "pickup" : "delivery")}
        />
      </div>

      <RangeCalendar
        className="self-start [grid-area:calendar]"
        start={delivery}
        end={pickup}
        min={today}
        max={max}
        previewRange={
          active === "pickup" && delivery !== null && pickup === null
        }
        isDisabled={(iso) =>
          active === "pickup" &&
          delivery !== null &&
          iso > delivery &&
          iso < addDays(delivery, MIN_GAP_DAYS)
        }
        onSelect={select}
      />

      <div className="flex flex-col gap-4 [grid-area:details]">
        <p className="flex gap-2 rounded-2xl bg-primary-100 px-3 py-2.5 text-b6 text-primary-800 md:text-[13px] md:leading-[18px]">
          <Info
            className="mt-px size-4 shrink-0 fill-primary-500 text-primary-100"
            aria-hidden="true"
          />
          <span>
            <strong>Same-day delivery</strong> between{" "}
            <strong>{rentalDatesCopy.sameDayWindow}</strong>. For future dates,
            you can select a specific time slot available at checkout. We pickup
            between <strong>{rentalDatesCopy.pickupWindow}</strong>.
          </span>
        </p>

        <div>
          <p className="mb-2 text-sh2 text-neutral-900">Your Rental Period:</p>
          <div className="flex items-center gap-6 rounded-2xl border-2 border-neutral-200 bg-gray-100 px-4 py-3">
            <p className="flex shrink-0 items-baseline gap-1">
              <span className="font-ubuntu text-[2.5rem] leading-none font-bold text-neutral-900">
                {String(days).padStart(2, "0")}
              </span>
              <span className="text-b4 text-neutral-500">
                {days > 1 ? "Days" : "Day"}
              </span>
            </p>
            <div className="min-w-0">
              <p className="text-sh7 text-neutral-900 md:text-[13px]">
                Chargeable Period:
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-b4 text-neutral-500">
                <CalendarClock
                  className="size-4 text-neutral-900"
                  aria-hidden="true"
                />
                {complete
                  ? `${formatShortDate(addDays(delivery, 1))} – ${formatShortDate(addDays(pickup, -1))}`
                  : "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-primary-900 px-5 pt-4 pb-5">
          <BadgePercent
            className="absolute -top-1.5 -left-1.5 size-11 -rotate-12 text-secondary-500"
            aria-hidden="true"
          />
          <p className="pl-9 font-ubuntu text-h5 font-bold text-secondary-200 italic md:text-h4">
            {rentalDatesCopy.savingsTitle}
          </p>
          <p className="mt-2 text-b6 font-semibold text-gray-100 md:text-[13px] md:leading-[18px]">
            {rentalDatesCopy.savingsBody}
          </p>
        </div>

        <div className="sticky bottom-0 -mx-5 bg-gray-150 px-5 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] md:static md:mx-0 md:px-0 md:pb-0">
          <Button
            type="submit"
            size="lg"
            disabled={!complete}
            className="w-full disabled:bg-neutral-200 disabled:text-neutral-300 disabled:opacity-100"
          >
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}

interface DateFieldProps {
  label: string;
  placeholder: string;
  value: string | null;
  active: boolean;
  onActivate: () => void;
}

function DateField({
  label,
  placeholder,
  value,
  active,
  onActivate,
}: DateFieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-sh2 text-neutral-900" aria-hidden="true">
        {label} <span className="text-destructive-500">*</span>
      </span>
      <button
        type="button"
        onClick={onActivate}
        aria-pressed={active}
        aria-label={`${label}: ${value ? formatShortDate(value) : "not selected"}. ${active ? "Choosing on calendar" : "Change"}`}
        className={cn(
          "flex h-11 items-center gap-2 rounded-2xl border-2 bg-gray-100 px-3 text-left text-b4 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none md:h-12",
          active
            ? "border-primary-500"
            : "border-neutral-200 hover:border-neutral-250",
        )}
      >
        <CalendarClock
          className="size-4 shrink-0 text-neutral-900"
          aria-hidden="true"
        />
        <span
          className={cn(
            "truncate",
            value ? "font-semibold text-neutral-900" : "text-neutral-400",
          )}
        >
          {value ? (
            formatShortDate(value)
          ) : (
            <>
              <span className="md:hidden">Select date</span>
              <span className="hidden md:inline">{placeholder}</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
