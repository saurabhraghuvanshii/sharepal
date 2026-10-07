import { Skeleton } from "@/components/ui";

/** Mirrors ProductCard's box model (and the original's SSR skeleton) to avoid layout shift. */
export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl bg-gray-100 p-2.5 shadow md:rounded-3xl md:p-3"
      aria-hidden="true"
    >
      <Skeleton className="aspect-square w-full rounded-2xl bg-neutral-100 md:rounded-3xl" />
      <div className="flex flex-col gap-2 pt-2.5 md:gap-2.5 md:px-1 md:pt-3">
        <Skeleton className="h-3.5 w-3/4 md:h-[18px]" />
        <Skeleton className="h-3 w-full md:h-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 md:h-[22px] md:w-24" />
          <Skeleton className="h-3 w-14 md:h-3.5 md:w-20" />
        </div>
        <Skeleton className="h-3 w-24 md:h-3.5 md:w-32" />
        <Skeleton className="mt-1 h-9 w-full rounded-4xl" />
      </div>
    </div>
  );
}
