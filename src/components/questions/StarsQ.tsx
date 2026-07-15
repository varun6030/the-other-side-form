"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock, CommitButton } from "./shared";

export function StarsQ({
  q,
  index,
  initial,
  onCommit,
}: {
  q: Question;
  index: number;
  initial?: number;
  onCommit: (v: number) => void;
}) {
  const max = q.max ?? 5;
  const [v, setV] = useState(initial ?? 0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />
      <div className="flex justify-center gap-3">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <motion.button
            key={n}
            whileTap={{ scale: 0.8 }}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setV(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="text-5xl transition-transform hover:scale-110 sm:text-6xl"
            style={{ color: n <= (hover || v) ? "#E53935" : "#232323" }}
          >
            ★
          </motion.button>
        ))}
      </div>
      {v > 0 && (
        <p className="mt-4 text-center font-mono text-xs tracking-widest text-smoke">
          {v === max ? "THE CONFIDENCE. WOW." : v === 1 ? "HUMBLE. OR HONEST?" : "NOTED."}
        </p>
      )}
      <CommitButton disabled={v === 0} onClick={() => onCommit(v)} />
    </div>
  );
}
