import { Skeleton } from "@/components/ui";

/** Mirrors ProductCard's layout to avoid layout shift. */
export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <Skeleton className="aspect-square w-full rounded-2xl bg-neutral-100 md:rounded-3xl" />
      <div className="flex flex-col gap-2 px-1 pt-3 md:px-2 md:pt-4">
        <Skeleton className="h-4 w-full md:h-5" />
        <Skeleton className="h-4 w-2/3 md:h-5" />
        <div className="mt-2 flex items-end justify-between border-t border-neutral-200 pt-2.5">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-20 md:h-3.5 md:w-24" />
            <Skeleton className="h-5 w-16 md:h-6 md:w-20" />
            <Skeleton className="h-4 w-14 md:w-20" />
          </div>
          <Skeleton className="size-11 rounded-full md:size-12" />
        </div>
      </div>
    </div>
  );
}
