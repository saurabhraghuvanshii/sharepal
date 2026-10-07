import { Skeleton } from "@/components/ui";

export function SubcategoryRailPlaceholder() {
  return (
    <div
      className="rounded-lg bg-gray-100 p-1 py-3 shadow-rail md:rounded-xl md:p-3"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3 lg:gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Skeleton className="aspect-square w-12 rounded-lg md:w-14 md:rounded-xl lg:w-16" />
            <Skeleton className="h-2.5 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
