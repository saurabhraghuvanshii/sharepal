import { RotateCcw, SearchX } from "lucide-react";

import { Button } from "@/components/ui";
import type { LinkItem } from "@/config/site";

export interface EmptyStateProps {
  title: string;
  description: string;
  onClear: () => void;
  suggestions?: readonly LinkItem[];
}

export function EmptyState({
  title,
  description,
  onClear,
  suggestions = [],
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-neutral-250 bg-gray-100 px-6 py-12 text-center md:py-16"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-500">
        <SearchX className="size-6" aria-hidden="true" />
      </span>
      <h3 className="text-h6 text-primary-900">{title}</h3>
      <p className="max-w-sm text-b4 text-neutral-500">{description}</p>
      <Button onClick={onClear} className="mt-1">
        <RotateCcw className="size-4" aria-hidden="true" />
        Clear filters
      </Button>
      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-sh7 tracking-wide text-neutral-400 uppercase">
            Or explore
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {suggestions.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full border border-neutral-200 px-3 py-1.5 text-b6 text-neutral-700 transition-colors hover:border-primary-250 hover:text-primary-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
