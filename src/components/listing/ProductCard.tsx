"use client";

import {
  Bell,
  BellRing,
  Check,
  Flame,
  Heart,
  ShoppingCart,
  Sparkles,
  Users,
  Vote,
} from "lucide-react";

import { CART_KEY } from "@/components/layout/CartSheet";
import { useRental } from "@/components/layout/RentalProvider";
import { Badge, Button, Price, Rating } from "@/components/ui";
import { useStoredIds } from "@/hooks/useStoredIds";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";
import type { Product } from "@/types/product";

import { ProductImage } from "./ProductImage";

export interface ProductCardProps {
  product: Product;
  preloadImage?: boolean;
}

const WISHLIST_KEY = "sharepal:wishlist";
const NOTIFY_KEY = "sharepal:notify";
const VOTES_KEY = "sharepal:votes";

export function ProductCard({
  product,
  preloadImage = false,
}: ProductCardProps) {
  const { dates, openDatePicker } = useRental();
  const wishlist = useStoredIds(WISHLIST_KEY);
  const cart = useStoredIds(CART_KEY);
  const notify = useStoredIds(NOTIFY_KEY);
  const votes = useStoredIds(VOTES_KEY);

  const isLaunch = product.tag === "Vote to Launch";
  const isOut = product.out_of_stock && !isLaunch;
  const inCart = cart.has(product.id);
  const wished = wishlist.has(product.id);
  const titleId = `product-${product.id}-title`;

  return (
    <article
      id={`product-${product.id}`}
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full scroll-mt-40 flex-col rounded-2xl bg-gray-100 p-2.5 shadow transition-[box-shadow,transform] duration-300 target:ring-2 target:ring-primary-500 hover:-translate-y-1 hover:shadow-medium md:rounded-3xl md:p-3",
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 md:rounded-3xl">
        <ProductImage
          src={product.image}
          alt={product.name}
          preload={preloadImage}
          dimmed={isOut}
        />

        {product.tag && (
          <Badge
            tone={
              product.tag === "Trending"
                ? "trending"
                : product.tag === "New"
                  ? "new"
                  : "launch"
            }
            className="absolute top-2 left-2 md:top-3 md:left-3"
          >
            {product.tag === "Trending" && (
              <Flame className="size-3" aria-hidden="true" />
            )}
            {product.tag === "New" && (
              <Sparkles className="size-3" aria-hidden="true" />
            )}
            {product.tag}
          </Badge>
        )}

        {isOut && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-max rounded-full bg-neutral-900/80 px-3 py-1 text-[11px] font-semibold text-gray-100 md:text-xs">
            Out of stock
          </span>
        )}

        <button
          type="button"
          onClick={() => wishlist.toggle(product.id)}
          aria-pressed={wished}
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute top-1.5 right-1.5 flex size-8 items-center justify-center rounded-full bg-gray-100/90 text-neutral-500 shadow-sm transition-[color,transform] duration-300 hover:scale-110 hover:text-destructive-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none active:scale-95 md:top-2.5 md:right-2.5 md:size-9"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              wished && "fill-destructive-500 text-destructive-500",
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-2.5 md:gap-2 md:px-1 md:pt-3">
        <h3
          id={titleId}
          className="line-clamp-2 min-h-[2.25rem] text-sh5 text-primary-900 md:min-h-12 md:text-sh3"
        >
          {product.name}
        </h3>

        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <Price amount={product.per_day_rent} muted={isOut} />
          {product.rating > 0 && <Rating value={product.rating} />}
        </div>

        <p className="flex items-center gap-1 text-b6 text-neutral-500 md:text-b4">
          {isLaunch ? (
            <Vote
              className="size-3.5 text-category-purple md:size-4"
              aria-hidden="true"
            />
          ) : (
            <Users
              className="size-3.5 text-primary-500 md:size-4"
              aria-hidden="true"
            />
          )}
          {formatCount(product.booked_count + (votes.has(product.id) ? 1 : 0))}+{" "}
          {isLaunch ? "votes" : "booked"}
        </p>

        <div className="mt-auto pt-1 md:pt-2">
          {isLaunch ? (
            <Button
              size="sm"
              className={cn(
                "w-full",
                votes.has(product.id)
                  ? "bg-category-purple/15 text-category-purple-dark hover:bg-category-purple/20"
                  : "bg-category-purple hover:bg-category-purple-dark",
              )}
              aria-pressed={votes.has(product.id)}
              onClick={() => votes.toggle(product.id)}
            >
              {votes.has(product.id) ? (
                <>
                  <Check className="size-4" aria-hidden="true" /> Voted
                </>
              ) : (
                <>
                  <Vote className="size-4" aria-hidden="true" /> Vote to Launch
                </>
              )}
            </Button>
          ) : isOut ? (
            <Button
              size="sm"
              variant="soft"
              className="w-full"
              aria-pressed={notify.has(product.id)}
              onClick={() => notify.toggle(product.id)}
            >
              {notify.has(product.id) ? (
                <>
                  <BellRing className="size-4" aria-hidden="true" /> We&apos;ll
                  notify you
                </>
              ) : (
                <>
                  <Bell className="size-4" aria-hidden="true" /> Notify me
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              variant={inCart ? "soft" : "brand"}
              className="w-full"
              onClick={() => {
                cart.add(product.id);
                if (!dates) openDatePicker();
              }}
            >
              {inCart ? (
                <>
                  <Check className="size-4" aria-hidden="true" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="size-4" aria-hidden="true" /> Rent
                  now
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
