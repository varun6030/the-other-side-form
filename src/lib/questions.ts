// ============================================================
// THE OTHER SIDE — Question Bank
// Swap / extend freely. The UI reads everything from here.
// ============================================================

export type QuestionType =
  | "text"
  | "textarea"
  | "slider"
  | "emoji"
  | "stars"
  | "choice" // multiple choice, rendered as cards
  | "thisOrThat"
  | "yesNo"
  | "rank"
  | "scale"
  | "fill"; // sentence completion

export interface Question {
  id: string;
  section: string;
  type: QuestionType;
  prompt: string;
  hint?: string; // microcopy under the prompt
  options?: string[]; // choice / thisOrThat / rank
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  emojis?: string[];
  prefix?: string; // for "fill" — text before the blank
  suffix?: string; // for "fill" — text after the blank
  dangerous?: boolean; // flags an answer as potential "most dangerous"
}

export interface Section {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  caseLabel: string; // evidence-file label shown on the section door
}

export const SECTIONS: Section[] = [
  {
    id: "parent-audit",
    emoji: "🏠",
    title: "PARENT AUDIT",
    subtitle: "Your family's PR department is not here to save you.",
    caseLabel: "FILE 01 — DOMESTIC INTELLIGENCE",
  },
  {
    id: "fbi-files",
    emoji: "🚨",
    title: "FBI FILES",
    subtitle: "Time to expose yourself. Your phone already did.",
    caseLabel: "FILE 02 — DIGITAL FORENSICS",
  },
  {
    id: "delusion-detector",
    emoji: "🧠",
    title: "DELUSION DETECTOR",
    subtitle: "Answer honestly. The meter knows when you don't.",
    caseLabel: "FILE 03 — SELF-IMAGE ANALYSIS",
  },
  {
    id: "red-flag-dept",
    emoji: "🚩",
    title: "RED FLAG DEPARTMENT",
    subtitle: "We counted before you walked in.",
    caseLabel: "FILE 04 — BEHAVIOURAL WARNINGS",
  },
  {
    id: "bank-balance-therapy",
    emoji: "💸",
    title: "BANK BALANCE THERAPY",
    subtitle: "Lie down. Tell us about the EMI.",
    caseLabel: "FILE 05 — FINANCIAL TRAUMA",
  },
  {
    id: "main-character",
    emoji: "🎯",
    title: "MAIN CHARACTER ENERGY",
    subtitle: "The camera was never on. You performed anyway.",
    caseLabel: "FILE 06 — PROTAGONIST CLAIMS",
  },
  {
    id: "confession-booth",
    emoji: "🎭",
    title: "CONFESSION BOOTH",
    subtitle: "Last room. Lights are lower here. So are the defences.",
    caseLabel: "FILE 07 — SEALED TESTIMONY",
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "pa-1",
    section: "parent-audit",
    type: "slider",
    prompt: "Rate your parents' WhatsApp forwarding addiction.",
    hint: "Good Morning flowers count double.",
    min: 0,
    max: 10,
    minLabel: "They text like CEOs",
    maxLabel: "Fake NASA facts daily",
  },
  {
    id: "pa-2",
    section: "parent-audit",
    type: "textarea",
    prompt: "A lie you told your parents that is STILL running today.",
    hint: "We hope they never see this. We really do.",
    dangerous: true,
  },
  {
    id: "pa-6",
    section: "parent-audit",
    type: "yesNo",
    prompt: 'Ever said "bas 5 minute" on a call that became 2+ hours?',
    hint: "Answering 'No' will be treated as evidence of lying.",
  },
  {
    id: "fbi-2",
    section: "fbi-files",
    type: "textarea",
    prompt: "If we opened your phone right now, which folder ends your career?",
    hint: "Take your time. Sweat a little.",
    dangerous: true,
  },
  {
    id: "dd-1",
    section: "delusion-detector",
    type: "slider",
    prompt: "Rate your own looks. The meter is live.",
    min: 1,
    max: 10,
    minLabel: "False modesty",
    maxLabel: "Full delusion",
  },
  {
    id: "dd-2",
    section: "delusion-detector",
    type: "text",
    prompt: "A skill on your resume you genuinely CANNOT do.",
    hint: '"Advanced Excel" — say it. Say it with your chest.',
  },
  {
    id: "rf-3",
    section: "red-flag-dept",
    type: "emoji",
    prompt: "Your texting reply speed, honestly:",
    emojis: ["⚡", "🏃", "🚶", "🐢", "👻"],
  },
  {
    id: "rf-4",
    section: "red-flag-dept",
    type: "textarea",
    prompt: "What would your worst ex's 1-star review of you say?",
    hint: "Write it like a Google review. Stars included.",
    dangerous: true,
  },
  {
    id: "rf-5",
    section: "red-flag-dept",
    type: "choice",
    prompt: "What are you CURRENTLY in?",
    options: [
      "Relationship",
      "Situationship",
      "It's complicated",
      "Delusion",
      "Nothing, and I'm coping",
    ],
  },
  {
    id: "bb-2",
    section: "bank-balance-therapy",
    type: "thisOrThat",
    prompt: "Who enables your worst 2 AM decisions?",
    options: ["BLINKIT", "ZOMATO"],
  },
  {
    id: "mc-2",
    section: "main-character",
    type: "fill",
    prompt: "Complete the sentence.",
    prefix: "I peaked when",
    suffix: ". It's been a slow decline since.",
  },
  {
    id: "cb-3",
    section: "confession-booth",
    type: "textarea",
    prompt:
      "If your 10-year-old self saw you right now — what would they be genuinely proud of?",
    hint: "No jokes on this one. The lights are low for a reason.",
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export function questionsBySection(sectionId: string): Question[] {
  return QUESTIONS.filter((q) => q.section === sectionId);
}

export function globalIndexOf(q: Question): number {
  return QUESTIONS.findIndex((x) => x.id === q.id) + 1;
}