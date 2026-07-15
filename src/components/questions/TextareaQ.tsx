"use client";

import { useState } from "react";
import type { Question } from "@/lib/questions";
import { PromptBlock, CommitButton } from "./shared";

export function TextareaQ({
  q,
  index,
  initial,
  onCommit,
}: {
  q: Question;
  index: number;
  initial?: string;
  onCommit: (v: string) => void;
}) {
  const [v, setV] = useState(initial ?? "");
  return (
    <div>
      <PromptBlock index={index} prompt={q.prompt} hint={q.hint} />
      <textarea
        autoFocus
        value={v}
        onChange={(e) => setV(e.target.value)}
        rows={4}
        placeholder="The more detail, the more content you give us…"
        className="w-full resize-none border-2 border-line bg-panel/60 p-5 font-body text-lg text-bone placeholder:text-smoke/50 focus:border-blood focus:outline-none"
      />
      <div className="mt-2 text-right font-mono text-[10px] tracking-widest text-smoke">
        {v.length} CHARACTERS OF EVIDENCE
      </div>
      <CommitButton disabled={v.trim().length < 2} onClick={() => onCommit(v.trim())} />
    </div>
  );
}
