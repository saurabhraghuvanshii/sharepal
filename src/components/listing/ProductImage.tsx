"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";

export interface ProductImageProps {
  src: string;
  alt: string;
  preload?: boolean;
  dimmed?: boolean;
}

/** Product photo that fades in once decoded; the square box reserves space (no CLS). */
export function ProductImage({
  src,
  alt,
  preload = false,
  dimmed = false,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      preload={preload}
      loading={preload ? "eager" : "lazy"}
      sizes="(min-width: 1280px) 260px, (min-width: 1024px) 22vw, (min-width: 768px) 28vw, 45vw"
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-contain p-3 transition-[opacity,transform,filter] duration-500 ease-out group-hover:scale-110 md:p-5",
        loaded ? "opacity-100" : "opacity-0",
        dimmed && "opacity-50 grayscale",
      )}
    />
  );
}
