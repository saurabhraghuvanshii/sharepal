import {
  ArrowUpRight,
  Camera,
  Drone,
  Gamepad2,
  Speaker,
  Tv,
  type LucideIcon,
} from "lucide-react";

import { promoBanners } from "@/config/site";
import { cn } from "@/lib/cn";

const DECOR: readonly { Icon: LucideIcon; className: string }[] = [
  { Icon: Drone, className: "top-3 left-4 size-16 -rotate-12 md:size-24" },
  {
    Icon: Tv,
    className: "bottom-3 left-6 hidden size-14 rotate-6 md:block md:size-16",
  },
  {
    Icon: Gamepad2,
    className: "top-3 right-5 size-14 rotate-12 md:right-28 md:size-20",
  },
  {
    Icon: Camera,
    className: "right-24 bottom-3 hidden size-16 -rotate-6 md:block",
  },
  {
    Icon: Speaker,
    className: "right-5 bottom-4 hidden size-16 md:block md:size-20",
  },
];

/** "Rent Out Your Gear on SharePal" banner, after the owner's screenshot. */
export function RentOutBanner() {
  const copy = promoBanners.rentOut;
  return (
    <section
      aria-labelledby="rent-out-title"
      className="relative overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,rgb(var(--primary-300))_0%,rgb(var(--primary-500))_55%,rgb(var(--primary-700))_100%)] px-4 py-8 text-center text-gray-100 md:py-10 lg:rounded-3xl"
    >
      {DECOR.map(({ Icon, className }, index) => (
        <Icon
          key={index}
          aria-hidden="true"
          strokeWidth={1.25}
          className={cn("absolute text-gray-100/35", className)}
        />
      ))}

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-3">
        <p className="font-ubuntu text-b3 md:text-h5 md:font-normal">
          {copy.eyebrowStart}
          <span className="underline decoration-secondary-500 decoration-2 underline-offset-[6px]">
            {copy.eyebrowUnderlined}
          </span>
          {copy.eyebrowEnd}
        </p>
        <h2
          id="rent-out-title"
          className="font-ubuntu text-h5 font-bold [text-shadow:0_0_18px_rgb(255_255_255/0.6)] md:text-h2"
        >
          {copy.title}
        </h2>
        <a
          href={copy.href}
          className="mt-1 flex h-10 items-center gap-1.5 rounded-full bg-secondary-500 px-6 text-sm font-semibold text-primary-900 transition-colors hover:bg-secondary-600 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500 focus-visible:outline-none md:text-base"
        >
          {copy.cta}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
