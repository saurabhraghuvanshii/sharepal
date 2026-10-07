"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useOptimistic, useTransition } from "react";

import {
  DEFAULT_PARAMS,
  parseListingParams,
  serializeListingParams,
} from "@/lib/products";
import type { ListingParams } from "@/types/product";

/**
 * Listing filter/sort state stored in the URL query string, so results are shareable and
 * back/forward works. Updates run in a transition: `isPending` lets the grid dim old results
 * while the optimistic params keep controls responsive.
 */
export function useListingParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const committed = useMemo(
    () => parseListingParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const [params, setOptimistic] = useOptimistic(committed);

  const setParams = useCallback(
    (
      update:
        | Partial<ListingParams>
        | ((current: ListingParams) => Partial<ListingParams>),
    ) => {
      const patch = typeof update === "function" ? update(params) : update;
      const next = { ...params, ...patch };
      const query = serializeListingParams(next).toString();
      startTransition(() => {
        setOptimistic(next);
        router.push(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      });
    },
    [params, pathname, router, setOptimistic],
  );

  const reset = useCallback(
    () => setParams({ ...DEFAULT_PARAMS, sort: params.sort }),
    [params.sort, setParams],
  );

  return { params, setParams, reset, isPending };
}
