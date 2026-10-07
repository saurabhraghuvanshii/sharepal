import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know the custom type scale from tailwind.config.ts; otherwise
 * `text-b6` and `text-success-600` look like the same group and the size gets dropped.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "d4",
            "d5",
            "d7",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "sh1",
            "sh2",
            "sh3",
            "sh4",
            "sh5",
            "sh6",
            "sh7",
            "b2",
            "b3",
            "b4",
            "b5",
            "b6",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
