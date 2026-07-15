"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock, CommitButton } from "./shared";

/** Slider + Scale share this. The number reacts as you drag. */
export function SliderQ({
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
  const min = q.min ?? 0;
  const max = q.max ?? 10;
  const [v, setV] = useState(initial ?? Math.round((min + max) / 2));
  const heat = (v - min) / (max - min); // 0 → 1

  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />

      <motion.div
        key={v}
        initial={{ scale: 1.25, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 text-center font-display text-7xl sm:text-8xl"
        style={{ color: heat > 0.66 ? "#E53935" : heat > 0.33 ? "#F2EEE6" : "#8A8578" }}
      >
        {v}
      </motion.div>

      <input
        type="range"
        min={min}
        max={max}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-label={q.prompt}
      />

      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-widest text-smoke">
        <span>{q.minLabel ?? min}</span>
        <span>{q.maxLabel ?? max}</span>
      </div>

      <CommitButton onClick={() => onCommit(v)} />
    </div>
  );
}
