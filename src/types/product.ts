/** Tag values present in data/product-list.json. Empty string means "no tag". */
export type ProductTag = "" | "Trending" | "New" | "Vote to Launch";

/** One row of data/product-list.json, exactly as provided by the owner. */
export interface Product {
  id: number;
  name: string;
  /** Absolute URL on images.sharepal.in; may contain `%20` / `(1)` — use as-is. */
  image: string;
  /** 0 means "not rated yet" and must not be displayed. */
  rating: number;
  booked_count: number;
  tag: ProductTag;
  /** Rent per day in INR; can be fractional (e.g. 158.25). */
  per_day_rent: number;
  out_of_stock: boolean;
}

export interface ProductListFile {
  products: unknown[];
}

/** Subcategory derived from product names (the JSON has no category field). */
export type SubcategorySlug =
  "ps5-combos" | "fc-games" | "digital-games" | "accessories";

export type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

export type FilterTag = "Trending" | "New";

export interface ListingParams {
  subcategory: SubcategorySlug | null;
  tags: FilterTag[];
  inStock: boolean;
  minPrice: number | null;
  maxPrice: number | null;
  query: string;
  sort: SortKey;
}

export interface Facets {
  subcategories: {
    slug: SubcategorySlug;
    label: string;
    count: number;
    /** Photo of the subcategory's most-booked rentable product (from the JSON). */
    image: string;
  }[];
  tags: { tag: FilterTag; count: number }[];
  price: { min: number; max: number };
  inStockCount: number;
}

/** Product fields shipped to global client UI (search panel, cart). */
export type ProductSummary = Pick<
  Product,
  | "id"
  | "name"
  | "image"
  | "per_day_rent"
  | "rating"
  | "booked_count"
  | "tag"
  | "out_of_stock"
>;
