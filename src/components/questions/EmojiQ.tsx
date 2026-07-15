"use client";

import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock } from "./shared";

/** Emoji rating — commits the INDEX (used by the report scorer). */
export function EmojiQ({
  q,
  index,
  onCommit,
}: {
  q: Question;
  index: number;
  onCommit: (v: number) => void;
}) {
  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />
      <div className="flex flex-wrap justify-center gap-4">
        {q.emojis?.map((e, i) => (
          <motion.button
            key={e}
            whileHover={{ scale: 1.3, rotate: [-4, 4, 0] }}
            whileTap={{ scale: 0.85 }}
            onClick={() => onCommit(i)}
            className="border-2 border-line bg-panel/60 p-5 text-5xl transition-colors hover:border-blood"
            aria-label={`option ${i + 1}`}
          >
            {e}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
