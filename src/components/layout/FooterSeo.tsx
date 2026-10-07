"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import type { footerSeo } from "@/config/site";
import { cn } from "@/lib/cn";

export interface FooterSeoProps {
  content: typeof footerSeo;
}

/** City blurb + "Categories on Rent" list; extra categories hide behind "Read More". */
export function FooterSeo({ content }: FooterSeoProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const [first, ...rest] = content.categories;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2">
        <h2>
          <a
            href={content.href}
            className="text-sh5 text-gray-100 underline underline-offset-2 hover:text-primary-200 md:text-sh3"
          >
            {content.title}
          </a>
        </h2>
        <p className="text-b5 text-neutral-300 md:text-b3">{content.body}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sh5 text-gray-100 md:text-sh3">
          {content.categoriesTitle}
        </h2>
        <ul id={listId} className="flex flex-col gap-4">
          {[first, ...(expanded ? rest : [])].map(
            (item) =>
              item && (
                <li key={item.title} className="flex flex-col gap-2">
                  <h3>
                    <a
                      href={item.href}
                      className="text-sh5 text-gray-100 underline underline-offset-2 hover:text-primary-200 md:text-sh3"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-b5 text-neutral-300 md:text-b3">
                    {item.body}
                  </p>
                </li>
              ),
          )}
        </ul>
        {rest.length > 0 && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((v) => !v)}
            className="flex w-max items-center gap-1 rounded-sm text-sh7 text-gray-100 hover:text-primary-200 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:outline-none md:text-sh5"
          >
            {expanded ? "Read Less" : "Read More"}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                expanded && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
}
