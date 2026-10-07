"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { createStoredValue } from "@/lib/storage";

import { RentalDatesSheet } from "./RentalDatesSheet";

export interface RentalDates {
  delivery: string;
  pickup: string;
}

function isRentalDates(value: unknown): value is RentalDates | null {
  if (value === null) return true;
  if (typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.delivery === "string" && typeof v.pickup === "string";
}

const datesStore = createStoredValue<RentalDates | null>(
  "sharepal:rental-dates",
  null,
  isRentalDates,
);

interface RentalContextValue {
  dates: RentalDates | null;
  setDates: (dates: RentalDates | null) => void;
  openDatePicker: () => void;
}

const RentalContext = createContext<RentalContextValue | null>(null);

export interface RentalProviderProps {
  children: ReactNode;
}

/** Shares the selected rental dates (persisted locally) and the date-picker sheet. */
export function RentalProvider({ children }: RentalProviderProps) {
  const dates = useSyncExternalStore(
    datesStore.subscribe,
    datesStore.get,
    datesStore.getServer,
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const openDatePicker = useCallback(() => setPickerOpen(true), []);

  const value = useMemo(
    () => ({ dates, setDates: datesStore.set, openDatePicker }),
    [dates, openDatePicker],
  );

  return (
    <RentalContext.Provider value={value}>
      {children}
      <RentalDatesSheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        initial={dates}
        onConfirm={(next) => {
          datesStore.set(next);
          setPickerOpen(false);
        }}
      />
    </RentalContext.Provider>
  );
}

export function useRental(): RentalContextValue {
  const context = useContext(RentalContext);
  if (!context)
    throw new Error("useRental must be used inside <RentalProvider>");
  return context;
}
