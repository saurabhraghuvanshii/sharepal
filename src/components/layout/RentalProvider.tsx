"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { RentalDatesSheet } from "./RentalDatesSheet";

export interface RentalDates {
  delivery: string;
  pickup: string;
}

interface RentalContextValue {
  dates: RentalDates | null;
  openDatePicker: () => void;
}

const RentalContext = createContext<RentalContextValue | null>(null);

export interface RentalProviderProps {
  children: ReactNode;
}

/**
 * Shares the selected rental dates and the date-picker sheet. Dates live in memory only:
 * every page load starts with the "Delivery Date / Pickup Date" placeholders, and the
 * header shows dates only after the visitor picks them.
 */
export function RentalProvider({ children }: RentalProviderProps) {
  const [dates, setDates] = useState<RentalDates | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const openDatePicker = useCallback(() => setPickerOpen(true), []);

  const value = useMemo(
    () => ({ dates, openDatePicker }),
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
          setDates(next);
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
