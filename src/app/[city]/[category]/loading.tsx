import { ProductCardSkeleton } from "@/components/listing/ProductCardSkeleton";
import { gridClassName } from "@/components/listing/ProductGrid";
import { SubcategoryRailPlaceholder } from "@/components/listing/SubcategoryRailPlaceholder";
import { Skeleton } from "@/components/ui";

/** Mirrors ListingLayout: banner beside the rail on md+, full width above it on mobile. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading gaming gadgets"
      className="container px-2 pt-3 pb-10 md:px-4 md:pt-4 lg:px-6"
    >
      <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-2 gap-y-4 [grid-template-areas:'hero_hero'_'rail_main'] md:grid-cols-[100px_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-6 md:[grid-template-areas:'rail_hero'_'rail_main'] lg:grid-cols-[120px_minmax(0,1fr)]">
        <Skeleton className="min-h-[150px] w-full rounded-xl [grid-area:hero] md:min-h-[228px] md:rounded-2xl" />
        <div className="[grid-area:rail]">
          <SubcategoryRailPlaceholder />
        </div>
        <div className="flex flex-col gap-5 [grid-area:main]">
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
