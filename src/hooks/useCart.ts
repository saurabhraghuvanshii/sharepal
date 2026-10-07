"use client";

import { useCallback, useSyncExternalStore } from "react";

import { createStoredValue } from "@/lib/storage";

export interface CartLine {
  id: number;
  qty: number;
}

export const MAX_QTY = 5;

function isCart(value: unknown): value is CartLine[] {
  return (
    Array.isArray(value) &&
    value.every(
      (line) =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).id === "number" &&
        typeof (line as CartLine).qty === "number",
    )
  );
}

const EMPTY: CartLine[] = [];
const store = createStoredValue<CartLine[]>("sharepal:cart:v2", EMPTY, isCart);

/** Local-only cart (localStorage) with per-item quantities. */
export function useCart() {
  const lines = useSyncExternalStore(
    store.subscribe,
    store.get,
    store.getServer,
  );

  const add = useCallback((id: number) => {
    const current = store.get();
    if (!current.some((l) => l.id === id))
      store.set([...current, { id, qty: 1 }]);
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    const clamped = Math.max(1, Math.min(MAX_QTY, qty));
    store.set(
      store.get().map((l) => (l.id === id ? { ...l, qty: clamped } : l)),
    );
  }, []);

  const remove = useCallback((id: number) => {
    store.set(store.get().filter((l) => l.id !== id));
  }, []);

  return {
    lines,
    count: lines.length,
    has: (id: number) => lines.some((l) => l.id === id),
    add,
    setQty,
    remove,
  };
}
