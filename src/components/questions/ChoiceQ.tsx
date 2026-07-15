"use client";

import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock } from "./shared";

/** Multiple choice rendered as evidence cards. Click = commit. */
export function ChoiceQ({
  q,
  index,
  onCommit,
}: {
  q: Question;
  index: number;
  onCommit: (v: string) => void;
}) {
  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />
      <div className="grid gap-3 sm:grid-cols-2">
        {q.options?.map((opt, i) => (
          <motion.button
            key={opt}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onCommit(opt)}
            className="group flex items-center gap-4 border-2 border-line bg-panel/60 p-5 text-left transition-colors hover:border-blood"
          >
            <span className="font-display text-xl text-line group-hover:text-blood">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="font-body text-lg text-bone">{opt}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
