"use client";

import { cn } from "@/lib/utils";

/** Shared prompt block: case number, prompt, microcopy hint. */
export function PromptBlock({
  index,
  prompt,
  hint,
}: {
  index: number;
  prompt: string;
  hint?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 font-mono text-[10px] tracking-[0.4em] text-blood">
        EXHIBIT {String(index).padStart(3, "0")}
      </div>
      <h2 className="font-display text-3xl leading-tight tracking-wide text-bone sm:text-4xl md:text-5xl">
        {prompt}
      </h2>
      {hint && (
        <p className="mt-3 font-mono text-xs tracking-wide text-smoke">{hint}</p>
      )}
    </div>
  );
}

/** Primary action — commit the answer to the record. */
export function CommitButton({
  disabled,
  onClick,
  label = "LOG IT",
}: {
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "mt-10 border-2 px-8 py-3 font-display text-xl tracking-widest transition-all",
        disabled
          ? "cursor-not-allowed border-line text-line"
          : "border-blood bg-blood text-ink hover:bg-transparent hover:text-blood hover:shadow-redGlow active:scale-95"
      )}
    >
      {label} →
    </button>
  );
}
