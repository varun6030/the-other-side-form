"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOADING_SCREENS } from "@/lib/toasts";
import { pick } from "@/lib/utils";

/**
 * Fake "system scan" that plays between certain sections.
 * Pure theatre. The guest is being processed.
 */
export function FakeLoading({ onDone }: { onDone: () => void }) {
  const [screen] = useState(() => pick(LOADING_SCREENS));
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= screen.lines.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [step, screen.lines.length, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink px-6"
    >
      <div className="mb-8 font-mono text-[10px] tracking-[0.5em] text-blood">
        {screen.label}
      </div>

      <div className="w-full max-w-md space-y-3 font-mono text-sm">
        {screen.lines.slice(0, step + 1).map((line, i) => {
          const done = i < step;
          const isLast = i === screen.lines.length - 1;
          return (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-3 ${
                isLast ? "text-blood" : done ? "text-smoke" : "text-bone"
              }`}
            >
              <span>{done || isLast ? "✓" : "▸"}</span>
              <span className={!done && !isLast ? "animate-flicker" : ""}>{line}</span>
            </motion.div>
          );
        })}
      </div>

      {/* progress bar */}
      <div className="mt-10 h-[3px] w-full max-w-md bg-line">
        <motion.div
          className="h-full bg-blood"
          animate={{ width: `${Math.min(100, (step / screen.lines.length) * 100)}%` }}
        />
      </div>
    </motion.div>
  );
}
