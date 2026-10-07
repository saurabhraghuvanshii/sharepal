import rawData from "../../data/product-list.json";

import type {
  Facets,
  FilterTag,
  ListingParams,
  Product,
  ProductListFile,
  ProductTag,
  SortKey,
  SubcategorySlug,
} from "@/types/product";

const PRODUCT_TAGS: readonly ProductTag[] = [
  "",
  "Trending",
  "New",
  "Vote to Launch",
];
const FILTER_TAGS: readonly FilterTag[] = ["Trending", "New"];
export const SORT_KEYS: readonly SortKey[] = [
  "popular",
  "price-asc",
  "price-desc",
  "rating",
];

export const SORT_LABELS: Record<SortKey, string> = {
  popular: "Popularity",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
};

/**
 * Name-keyword → subcategory mapping. The JSON carries no category field, so this is
 * derived; first matching rule wins. Logged in .plan/PROGRESS.md.
 */
const SUBCATEGORY_RULES: readonly {
  slug: SubcategorySlug;
  label: string;
  test: RegExp;
}[] = [
  {
    slug: "accessories",
    label: "Racing & Remote Play",
    test: /racing wheel|portal/i,
  },
  { slug: "fc-games", label: "FC Football", test: /\bFC\s?\d{2}\b/i },
  { slug: "digital-games", label: "Digital Games", test: /\(digital game\)/i },
  { slug: "ps5-combos", label: "PS5 Combos", test: /\bPS5\b/i },
];

/** Display label of a product's derived subcategory (e.g. "PS5 Combos"). */
export function subcategoryLabelOf(
  product: Pick<Product, "name">,
): string | null {
  const slug = getSubcategory(product);
  return slug ? SUBCATEGORY_LABELS[slug] : null;
}

export const SUBCATEGORY_LABELS = Object.fromEntries(
  SUBCATEGORY_RULES.map((rule) => [rule.slug, rule.label]),
) as Record<SubcategorySlug, string>;

export const DEFAULT_PARAMS: ListingParams = {
  subcategory: null,
  tags: [],
  inStock: false,
  minPrice: null,
  maxPrice: null,
  query: "",
  sort: "popular",
};

function isProduct(row: unknown): row is Product {
  if (typeof row !== "object" || row === null) return false;
  const r = row as Record<string, unknown>;
  return (
    typeof r.id === "number" &&
    typeof r.name === "string" &&
    r.name.trim().length > 0 &&
    typeof r.image === "string" &&
    r.image.startsWith("https://") &&
    typeof r.rating === "number" &&
    typeof r.booked_count === "number" &&
    typeof r.tag === "string" &&
    PRODUCT_TAGS.includes(r.tag as ProductTag) &&
    typeof r.per_day_rent === "number" &&
    Number.isFinite(r.per_day_rent) &&
    typeof r.out_of_stock === "boolean"
  );
}

function loadProducts(): readonly Product[] {
  const rows = (rawData as ProductListFile).products;
  const valid: Product[] = [];
  rows.forEach((row, index) => {
    if (isProduct(row)) valid.push(Object.freeze({ ...row }));
    else console.warn(`[products] Skipping malformed row at index ${index}`);
  });
  return Object.freeze(valid);
}

const PRODUCTS = loadProducts();

export function getAllProducts(): readonly Product[] {
  return PRODUCTS;
}

/** Only "gaming-gadgets-on-rent" is backed by the JSON; any other slug has no products. */
export function getProductsByCategory(slug: string): readonly Product[] {
  return slug === "gaming-gadgets-on-rent" ? PRODUCTS : [];
}

function getSubcategory(
  product: Pick<Product, "name">,
): SubcategorySlug | null {
  return (
    SUBCATEGORY_RULES.find((rule) => rule.test.test(product.name))?.slug ?? null
  );
}

/** "Vote to Launch" products are not rentable yet and never count as in stock. */
function isRentable(product: Product): boolean {
  return !product.out_of_stock && product.tag !== "Vote to Launch";
}

export function getFacets(products: readonly Product[]): Facets {
  const prices = products.map((p) => p.per_day_rent);
  return {
    subcategories: SUBCATEGORY_RULES.flatMap((rule) => {
      const members = sortProducts(
        products.filter((p) => getSubcategory(p) === rule.slug),
        "popular",
      );
      const cover = members[0];
      return cover
        ? [
            {
              slug: rule.slug,
              label: rule.label,
              count: members.length,
              image: cover.image,
            },
          ]
        : [];
    }),
    tags: FILTER_TAGS.map((tag) => ({
      tag,
      count: products.filter((p) => p.tag === tag).length,
    })).filter((t) => t.count > 0),
    price: {
      min: prices.length ? Math.floor(Math.min(...prices)) : 0,
      max: prices.length ? Math.ceil(Math.max(...prices)) : 0,
    },
    inStockCount: products.filter(isRentable).length,
  };
}

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchesQuery(
  product: Pick<Product, "name">,
  query: string,
): boolean {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalise(product.name);
  return terms.every((term) => haystack.includes(term));
}

export function filterProducts(
  products: readonly Product[],
  params: ListingParams,
): Product[] {
  return products.filter(
    (p) =>
      (params.subcategory === null ||
        getSubcategory(p) === params.subcategory) &&
      (params.tags.length === 0 || params.tags.some((tag) => p.tag === tag)) &&
      (!params.inStock || isRentable(p)) &&
      (params.minPrice === null || p.per_day_rent >= params.minPrice) &&
      (params.maxPrice === null || p.per_day_rent <= params.maxPrice) &&
      matchesQuery(p, params.query),
  );
}

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {
  popular: (a, b) => b.booked_count - a.booked_count,
  "price-asc": (a, b) => a.per_day_rent - b.per_day_rent,
  "price-desc": (a, b) => b.per_day_rent - a.per_day_rent,
  rating: (a, b) => b.rating - a.rating || b.booked_count - a.booked_count,
};

/** Returns a new array; unavailable items always sink below rentable ones. */
export function sortProducts(
  products: readonly Product[],
  key: SortKey,
): Product[] {
  return [...products].sort(
    (a, b) =>
      Number(!isRentable(a)) - Number(!isRentable(b)) || comparators[key](a, b),
  );
}

export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number,
): T[] {
  return items.slice(0, Math.max(1, page) * pageSize);
}

function toNumber(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Parses URL search params into listing params, ignoring unknown or invalid values. */
export function parseListingParams(search: URLSearchParams): ListingParams {
  const sub = search.get("sub");
  const sort = search.get("sort");
  return {
    subcategory:
      sub && sub in SUBCATEGORY_LABELS ? (sub as SubcategorySlug) : null,
    tags: search
      .getAll("tag")
      .filter((t): t is FilterTag =>
        (FILTER_TAGS as readonly string[]).includes(t),
      ),
    inStock: search.get("stock") === "1",
    minPrice: toNumber(search.get("min")),
    maxPrice: toNumber(search.get("max")),
    query: (search.get("q") ?? "").slice(0, 80),
    sort:
      sort && (SORT_KEYS as readonly string[]).includes(sort)
        ? (sort as SortKey)
        : "popular",
  };
}

export function serializeListingParams(params: ListingParams): URLSearchParams {
  const search = new URLSearchParams();
  if (params.subcategory) search.set("sub", params.subcategory);
  params.tags.forEach((tag) => search.append("tag", tag));
  if (params.inStock) search.set("stock", "1");
  if (params.minPrice !== null) search.set("min", String(params.minPrice));
  if (params.maxPrice !== null) search.set("max", String(params.maxPrice));
  if (params.query.trim()) search.set("q", params.query.trim());
  if (params.sort !== "popular") search.set("sort", params.sort);
  return search;
}

interface PriceBucket {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
}

/** Per-day rent bands chosen to split the JSON's ₹158–₹440 range into useful groups. */
export const PRICE_BUCKETS: readonly PriceBucket[] = [
  { id: "under-200", label: "Under ₹200", min: null, max: 199 },
  { id: "200-299", label: "₹200 – ₹299", min: 200, max: 299 },
  { id: "300-plus", label: "₹300 & above", min: 300, max: null },
];

export function activeBucket(
  params: Pick<ListingParams, "minPrice" | "maxPrice">,
) {
  return (
    PRICE_BUCKETS.find(
      (b) => b.min === params.minPrice && b.max === params.maxPrice,
    ) ?? null
  );
}

export function countActiveFilters(params: ListingParams): number {
  return (
    (params.subcategory ? 1 : 0) +
    params.tags.length +
    (params.inStock ? 1 : 0) +
    (params.minPrice !== null || params.maxPrice !== null ? 1 : 0) +
    (params.query.trim() ? 1 : 0)
  );
}
