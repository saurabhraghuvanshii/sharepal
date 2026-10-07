import type { ReactNode } from "react";

export interface ListingLayoutProps {
  title: string;
  count: number;
  rail: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

/** Shared frame for the interactive listing and its server-rendered fallback. */
export function ListingLayout({
  title,
  count,
  rail,
  toolbar,
  footer,
  children,
}: ListingLayoutProps) {
  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative z-[1] container px-2 pt-4 pb-10 md:px-4 md:pt-6 lg:px-6"
    >
      <div className="grid grid-cols-[72px_1fr] gap-2 md:grid-cols-[100px_1fr] md:gap-8 lg:grid-cols-[120px_1fr]">
        <aside className="min-w-0">{rail}</aside>
        <div className="flex min-w-0 flex-col gap-3 md:gap-5">
          <div className="flex items-center justify-between gap-3 border-b-2 border-neutral-200 pb-3 md:pb-4">
            <h2
              id="products-title"
              className="font-inter text-sh4 capitalize md:text-h2"
            >
              {title}
            </h2>
            <p className="flex shrink-0 items-center gap-1 text-b6 text-neutral-400 md:text-b2">
              <span className="hidden md:inline">Total items:</span>
              <span className="text-neutral-500">{count} items</span>
            </p>
          </div>
          {toolbar}
          {children}
          {footer && (
            <div className="mt-2 flex w-full flex-col items-center gap-3 border-t border-gray-200 py-7 md:mt-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
