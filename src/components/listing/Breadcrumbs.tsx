import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { SITE_URL } from "@/config/site";
import { cn } from "@/lib/cn";

interface Crumb {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  items: readonly Crumb[];
  className?: string;
}

/** Breadcrumb trail with BreadcrumbList JSON-LD. The last item is the current page. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, SITE_URL).toString(),
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("container py-3 md:py-6", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sh7 md:gap-2.5 md:text-sh5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={item.href}
              className="inline-flex items-center gap-1.5 md:gap-2.5"
            >
              {last ? (
                <span aria-current="page" className="text-neutral-900">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-neutral-500 transition-colors hover:text-primary-500"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight
                    className="size-3.5 text-neutral-400"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </nav>
  );
}
