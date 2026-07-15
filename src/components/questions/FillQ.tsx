"use client";

import { useState } from "react";
import type { Question } from "@/lib/questions";
import { PromptBlock, CommitButton } from "./shared";

/** Sentence completion — the blank glows red until filled. */
export function FillQ({
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
      <p className="font-body text-2xl leading-relaxed text-bone sm:text-3xl">
        {q.prefix}{" "}
        <input
          autoFocus
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && v.trim() && onCommit(v.trim())}
          placeholder="________"
          className="mx-1 inline-block w-56 border-b-2 border-blood bg-transparent text-center text-blood placeholder:text-blood/40 focus:outline-none"
        />{" "}
        <span className="text-smoke">{q.suffix}</span>
      </p>
      <CommitButton disabled={!v.trim()} onClick={() => onCommit(v.trim())} />
    </div>
  );
}
