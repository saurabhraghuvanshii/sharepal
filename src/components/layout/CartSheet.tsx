"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button, Sheet, buttonVariants } from "@/components/ui";
import { LIVE_SITE } from "@/config/site";
import { useStoredIds } from "@/hooks/useStoredIds";
import { formatINR } from "@/lib/format";
import type { ProductSummary } from "@/types/product";

export const CART_KEY = "sharepal:cart";

export interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  products: readonly ProductSummary[];
}

/** Local-only cart preview (no backend in this build). */
export function CartSheet({ open, onClose, products }: CartSheetProps) {
  const cart = useStoredIds(CART_KEY);
  const items = products.filter((p) => cart.has(p.id));

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={`Your cart (${items.length})`}
      footer={
        items.length > 0 && (
          <a
            href={LIVE_SITE}
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            Continue to checkout on SharePal
          </a>
        )
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-500">
            <ShoppingCart className="size-6" aria-hidden="true" />
          </span>
          <p className="text-sh3 text-primary-900">Your cart is empty</p>
          <p className="text-b4 text-neutral-500">
            Add a console or combo to get started.
          </p>
          <Button variant="soft" onClick={onClose}>
            Browse gaming gadgets
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-2"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sh5 text-primary-900">
                  {item.name}
                </p>
                <p className="text-b6 text-neutral-500">
                  {formatINR(item.per_day_rent)}/day
                </p>
              </div>
              <button
                type="button"
                onClick={() => cart.toggle(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="flex size-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-destructive-100 hover:text-destructive-600"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-b6 text-neutral-400">
        Cart is saved on this device only.
      </p>
    </Sheet>
  );
}
