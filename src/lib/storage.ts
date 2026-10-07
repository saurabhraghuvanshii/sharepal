/**
 * Tiny localStorage-backed store for `useSyncExternalStore`. Every access is wrapped in
 * try/catch so private mode / blocked storage silently falls back to in-memory state.
 */
export interface StoredValue<T> {
  get: () => T;
  getServer: () => T;
  set: (next: T) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createStoredValue<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): StoredValue<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  function read(): T {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      const parsed: unknown = JSON.parse(raw);
      return isValid(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  function emit() {
    listeners.forEach((listener) => listener());
  }

  return {
    get: () => (cache ??= read()),
    getServer: () => fallback,
    set: (next) => {
      cache = next;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage unavailable: keep the in-memory value only.
      }
      emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      const onStorage = (event: StorageEvent) => {
        if (event.key !== key) return;
        cache = read();
        emit();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}

export function isIdList(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number")
  );
}
