import { ProductCardSkeleton } from "@/components/listing/ProductCardSkeleton";
import { gridClassName } from "@/components/listing/ProductGrid";
import { SubcategoryRailPlaceholder } from "@/components/listing/SubcategoryRailPlaceholder";
import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading gaming gadgets">
      <div className="container px-2 pt-3 md:px-4 md:pt-5 lg:px-6">
        <Skeleton className="min-h-[150px] w-full rounded-xl md:min-h-[228px]" />
      </div>
      <div className="container grid grid-cols-[72px_1fr] gap-2 px-2 pt-4 pb-10 md:grid-cols-[100px_1fr] md:gap-8 md:px-4 md:pt-6 lg:grid-cols-[120px_1fr] lg:px-6">
        <SubcategoryRailPlaceholder />
        <div className="flex flex-col gap-5">
          <Skeleton className="h-8 w-2/3 md:h-10" />
          <div className={gridClassName}>
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
