"use client";

import { useState } from "react";
import type { Question } from "@/lib/questions";
import { PromptBlock, CommitButton } from "./shared";

export function TextQ({
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
      <input
        autoFocus
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && v.trim() && onCommit(v.trim())}
        placeholder="Type your confession…"
        className="w-full border-b-2 border-line bg-transparent pb-3 font-body text-xl text-bone placeholder:text-smoke/50 focus:border-blood focus:outline-none sm:text-2xl"
      />
      <CommitButton disabled={!v.trim()} onClick={() => onCommit(v.trim())} />
    </div>
  );
}
