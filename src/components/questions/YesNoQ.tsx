"use client";

import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock } from "./shared";

export function YesNoQ({
  q,
  index,
  onCommit,
}: {
  q: Question;
  index: number;
  onCommit: (v: boolean) => void;
}) {
  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onCommit(true)}
          className="flex-1 border-2 border-blood bg-blood py-8 font-display text-3xl tracking-widest text-ink transition-colors hover:bg-transparent hover:text-blood"
        >
          YES
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onCommit(false)}
          className="flex-1 border-2 border-line py-8 font-display text-3xl tracking-widest text-smoke transition-colors hover:border-bone hover:text-bone"
        >
          NO
        </motion.button>
      </div>
      <p className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] text-smoke">
        THE "NO" BUTTON HAS A LIE DETECTOR. ALLEGEDLY.
      </p>
    </div>
  );
}
