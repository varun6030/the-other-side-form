"use client";

import { cn } from "@/lib/utils";

/** Text that occasionally tears — the show's signature typography effect. */
export function GlitchText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={cn("glitch", className)} data-text={text}>
      {text}
    </span>
  );
}
