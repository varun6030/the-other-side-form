"use client";

import type { Question } from "@/lib/questions";
import type { AnswerValue } from "@/lib/store";
import { TextQ } from "./TextQ";
import { TextareaQ } from "./TextareaQ";
import { FillQ } from "./FillQ";
import { ChoiceQ } from "./ChoiceQ";
import { ThisOrThatQ } from "./ThisOrThatQ";
import { YesNoQ } from "./YesNoQ";
import { SliderQ } from "./SliderQ";
import { EmojiQ } from "./EmojiQ";
import { StarsQ } from "./StarsQ";
import { RankQ } from "./RankQ";

export function QuestionRenderer({
  q,
  index,
  initial,
  onCommit,
}: {
  q: Question;
  index: number;
  initial?: AnswerValue;
  onCommit: (v: AnswerValue) => void;
}) {
  switch (q.type) {
    case "text":
      return (
        <TextQ q={q} index={index} initial={initial as string} onCommit={onCommit} />
      );
    case "textarea":
      return (
        <TextareaQ q={q} index={index} initial={initial as string} onCommit={onCommit} />
      );
    case "fill":
      return (
        <FillQ q={q} index={index} initial={initial as string} onCommit={onCommit} />
      );
    case "choice":
      return <ChoiceQ q={q} index={index} onCommit={onCommit} />;
    case "thisOrThat":
      return <ThisOrThatQ q={q} index={index} onCommit={onCommit} />;
    case "yesNo":
      return <YesNoQ q={q} index={index} onCommit={onCommit} />;
    case "slider":
    case "scale":
      return (
        <SliderQ q={q} index={index} initial={initial as number} onCommit={onCommit} />
      );
    case "emoji":
      return <EmojiQ q={q} index={index} onCommit={onCommit} />;
    case "stars":
      return (
        <StarsQ q={q} index={index} initial={initial as number} onCommit={onCommit} />
      );
    case "rank":
      return <RankQ q={q} index={index} onCommit={onCommit} />;
    default:
      return null;
  }
}
