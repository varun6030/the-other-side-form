"use client";

import { useState } from "react";
import { Reorder, motion } from "framer-motion";
import type { Question } from "@/lib/questions";
import { PromptBlock, CommitButton } from "./shared";

/** Drag-and-drop ranking (framer-motion Reorder — no extra deps). */
export function RankQ({
  q,
  index,
  onCommit,
}: {
  q: Question;
  index: number;
  onCommit: (v: string[]) => void;
}) {
  const [items, setItems] = useState<string[]>(q.options ?? []);

  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint ?? "Drag to reorder. Top = most guilty."} />
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
        {items.map((item, i) => (
          <Reorder.Item
            key={item}
            value={item}
            whileDrag={{ scale: 1.03, boxShadow: "0 0 30px rgba(229,57,53,0.3)" }}
            className="flex cursor-grab items-center gap-4 border-2 border-line bg-panel px-5 py-4 active:cursor-grabbing"
          >
            <motion.span layout className="font-display text-2xl text-blood">
              #{i + 1}
            </motion.span>
            <span className="font-body text-lg text-bone">{item}</span>
            <span className="ml-auto font-mono text-xs text-smoke">⠿</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <CommitButton onClick={() => onCommit(items)} label="LOCK RANKING" />
    </div>
  );
}
