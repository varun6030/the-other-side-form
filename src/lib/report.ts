import { QUESTIONS } from "./questions";
import type { AnswerValue } from "./store";

export interface Report {
  delusion: number; // 0–100
  redFlags: number;
  greenFlags: number;
  mainCharacter: number; // 0–10, one decimal
  parentSurvival: number; // 0–100
  upiAddiction: "Mild" | "Concerning" | "Extreme";
  replySpeed: string;
  mostDangerous: { prompt: string; answer: string } | null;
  confidentiality: string;
}

function num(v: AnswerValue, fallback = 5): number {
  return typeof v === "number" ? v : fallback;
}

function str(v: AnswerValue): string {
  return typeof v === "string" ? v : "";
}

/** Deterministic-ish, tongue-in-cheek scoring. The comedy is the point. */
export function buildReport(answers: Record<string, AnswerValue>): Report {
  // Delusion: self-rated looks + humor stars + resume lie length
  const looks = num(answers["dd-1"]); // 1–10
  const stars = num(answers["dd-4"], 3); // 1–5
  const resumeLie = str(answers["dd-2"]).length;
  const delusion = Math.min(
    100,
    Math.round(looks * 5.5 + stars * 8 + Math.min(resumeLie, 40))
  );

  // Red flags: dangerous questions actually answered + reply speed ghostiness
  const dangerousAnswered = QUESTIONS.filter(
    (q) => q.dangerous && str(answers[q.id]).length > 2
  ).length;
  const replyEmojiIdx = num(answers["rf-3"], 2); // 0 fast … 4 ghost
  const situationship = str(answers["rf-5"]);
  const redFlags =
    dangerousAnswered +
    (replyEmojiIdx >= 3 ? 1 : 0) +
    (situationship.includes("Delusion") || situationship.includes("complicated") ? 1 : 0);

  const greenFlags = Math.max(1, 10 - redFlags);

  // Main character: villain origin + peak + shower song presence
  const mcSignals =
    (str(answers["mc-1"]).length > 3 ? 3 : 0) +
    (str(answers["mc-2"]).length > 3 ? 3 : 0) +
    (str(answers["mc-3"]).length > 3 ? 3.2 : 0);
  const mainCharacter = Math.min(10, Math.round((mcSignals + 1) * 10) / 10);

  // Parent survival: 5-minute-call vets + long-running lie = elite survivor
  const fiveMin = answers["pa-6"] === true;
  const runningLie = str(answers["pa-2"]).length > 3;
  const parentSurvival = Math.min(100, 60 + (fiveMin ? 15 : 0) + (runningLie ? 20 : 0));

  // UPI addiction from 2 AM enabler + delivery-charge crimes
  const brokeStory = str(answers["bb-5"]).length;
  const upiAddiction: Report["upiAddiction"] =
    brokeStory > 60 ? "Extreme" : brokeStory > 15 ? "Concerning" : "Mild";

  const replySpeed =
    ["Lightning", "Quick", "Selective", "Fossil", "Ghost Mode"][replyEmojiIdx] ??
    "Ghost Mode";

  // Most dangerous answer: longest text on a dangerous question
  let mostDangerous: Report["mostDangerous"] = null;
  for (const q of QUESTIONS) {
    if (!q.dangerous) continue;
    const a = str(answers[q.id]);
    if (a.length > (mostDangerous?.answer.length ?? 8)) {
      mostDangerous = { prompt: q.prompt, answer: a };
    }
  }

  return {
    delusion,
    redFlags,
    greenFlags,
    mainCharacter,
    parentSurvival,
    upiAddiction,
    replySpeed,
    mostDangerous,
    confidentiality: "Questionable.",
  };
}
