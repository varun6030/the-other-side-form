"use client";

/** Small animated red burst lines — pulled from the logo's mic accents. */
export function RedLines({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-2 ${className}`}>
      <span className="h-[3px] w-8 origin-left animate-pulseLine bg-blood" />
      <span className="h-[3px] w-14 origin-left animate-pulseLine bg-blood [animation-delay:300ms]" />
      <span className="h-[3px] w-6 origin-left animate-pulseLine bg-blood [animation-delay:600ms]" />
    </div>
  );
}
