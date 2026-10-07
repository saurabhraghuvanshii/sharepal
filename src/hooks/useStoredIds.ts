"use client";

import { useCallback, useSyncExternalStore } from "react";

import { createStoredValue, isIdList, type StoredValue } from "@/lib/storage";

const stores = new Map<string, StoredValue<number[]>>();
const EMPTY: number[] = [];

function storeFor(key: string): StoredValue<number[]> {
  let store = stores.get(key);
  if (!store) {
    store = createStoredValue<number[]>(key, EMPTY, isIdList);
    stores.set(key, store);
  }
  return store;
}

/** A persisted set of product ids (wishlist, cart, notify-me). Local to this browser only. */
export function useStoredIds(key: string) {
  const store = storeFor(key);
  const ids = useSyncExternalStore(store.subscribe, store.get, store.getServer);

  const toggle = useCallback(
    (id: number) => {
      const current = store.get();
      store.set(
        current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      );
    },
    [store],
  );

  const add = useCallback(
    (id: number) => {
      const current = store.get();
      if (!current.includes(id)) store.set([...current, id]);
    },
    [store],
  );

  return { ids, has: (id: number) => ids.includes(id), toggle, add };
}
