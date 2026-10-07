import {
  ArrowUpRight,
  CalendarDays,
  Gift,
  IndianRupee,
  RefreshCw,
  Tag,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { promoBanners } from "@/config/site";

export interface AssetPartnerBannerProps {
  /** Product photo from product-list.json used as the right-hand visual. */
  image?: string;
}

const ICONS: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  gift: Gift,
  tag: Tag,
  refresh: RefreshCw,
};

/** "Become an Asset Partner. Earn Monthly." banner, after the owner's screenshot. */
export function AssetPartnerBanner({ image }: AssetPartnerBannerProps) {
  const copy = promoBanners.assetPartner;
  return (
    <section
      aria-labelledby="asset-partner-title"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 via-primary-850 to-primary-800 p-4 text-gray-100 md:p-6 lg:rounded-3xl"
    >
      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h2
            id="asset-partner-title"
            className="text-center font-ubuntu text-h5 leading-tight font-bold tracking-tight md:text-h2 lg:text-left xl:text-[2.125rem]"
          >
            {copy.titleStart}{" "}
            <span className="text-secondary-500">{copy.titleHighlight}</span>{" "}
            {copy.titleEnd}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {copy.groups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-gray-100/10 bg-gray-100/[0.03] p-2.5"
              >
                <p className="mb-2 px-1 text-[11px] font-bold tracking-wide uppercase md:text-xs">
                  {group.label}
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const Icon = ICONS[item.icon] ?? Tag;
                    return (
                      <li
                        key={item.value}
                        className="relative flex flex-col rounded-xl border border-gray-100/10 bg-gray-100/[0.04] p-3 pr-8"
                      >
                        <Icon
                          className="absolute top-3 right-3 size-4 text-gray-100/80"
                          aria-hidden="true"
                        />
                        {item.eyebrow && (
                          <span className="text-b6 text-gray-100/80">
                            {item.eyebrow}
                          </span>
                        )}
                        <span className="font-ubuntu text-sh4 leading-tight font-bold text-secondary-500 md:text-h5">
                          {item.value}
                        </span>
                        <span className="mt-1 text-[11px] leading-4 text-gray-100/80 md:text-b6">
                          {item.caption}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 lg:w-52">
          {image && (
            <div className="relative hidden h-32 w-40 lg:block">
              <div className="absolute inset-0 rotate-6 overflow-hidden rounded-2xl bg-gray-100 shadow-medium">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain p-2"
                />
              </div>
              <IndianRupee
                className="absolute -top-2 -left-3 size-6 -rotate-12 text-secondary-500"
                aria-hidden="true"
              />
              <IndianRupee
                className="absolute -right-3 -bottom-1 size-7 rotate-12 text-secondary-500"
                aria-hidden="true"
              />
            </div>
          )}
          <a
            href={copy.href}
            className="flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-secondary-500 px-6 font-ubuntu text-h6 font-bold text-primary-900 transition-colors hover:bg-secondary-600 focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 focus-visible:outline-none sm:w-auto"
          >
            {copy.cta}
            <ArrowUpRight className="size-5 stroke-[2.5]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
