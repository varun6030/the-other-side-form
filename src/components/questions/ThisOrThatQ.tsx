"use client";

import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock } from "./shared";

/** Two giant halves. A red VS. No third option. */
export function ThisOrThatQ({
  q,
  index,
  onCommit,
}: {
  q: Question;
  index: number;
  onCommit: (v: string) => void;
}) {
  const [a, b] = q.options ?? ["A", "B"];
  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />
      <div className="relative grid gap-4 sm:grid-cols-2">
        {[a, b].map((opt, i) => (
          <motion.button
            key={opt}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onCommit(opt)}
            className="flex min-h-40 items-center justify-center border-2 border-line bg-panel/60 p-6 text-center font-display text-2xl tracking-wide text-bone transition-colors hover:border-blood hover:text-blood sm:min-h-52"
          >
            {opt}
          </motion.button>
        ))}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
          <span className="border-2 border-blood bg-ink px-3 py-1 font-display text-xl text-blood">
            VS
          </span>
        </div>
      </div>
    </div>
  );
}
