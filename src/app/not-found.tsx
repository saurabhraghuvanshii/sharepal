import { Gamepad2 } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui";
import { DEFAULT_CATEGORY, DEFAULT_CITY } from "@/config/site";

export default function NotFound() {
  return (
    <section className="container flex flex-col items-center gap-4 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-100 text-primary-500">
        <Gamepad2 className="size-8" aria-hidden="true" />
      </span>
      <h1 className="font-ubuntu text-h3 text-primary-900">Page not found</h1>
      <p className="max-w-md text-b3 text-neutral-500">
        We couldn&apos;t find that page. Gaming gadgets are available to rent in
        Bangalore.
      </p>
      <Link
        href={`/${DEFAULT_CITY}/${DEFAULT_CATEGORY}`}
        className={buttonVariants({ size: "lg" })}
      >
        Browse gaming gadgets
      </Link>
    </section>
  );
}
