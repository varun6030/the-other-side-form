"use client";

import { cn } from "@/lib/utils";

/** Raised black panel with hairline border — the base surface of the show. */
export function NoiseCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative border border-line bg-panel/90 backdrop-blur-sm",
        className
      )}
    >
      {/* red corner ticks — evidence-file framing */}
      <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-blood" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-blood" />
      {children}
    </div>
  );
}
