"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FakeLoading } from "@/components/FakeLoading";
import { ReactionProvider, useReactions } from "@/components/Reactions";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { NoiseCard } from "@/components/NoiseCard";
import { RedLines } from "@/components/RedLines";
import { QUESTIONS, SECTIONS } from "@/lib/questions";
import { useFormStore, type AnswerValue } from "@/lib/store";

// Flow = [section door] → its questions → [maybe fake loading] → next door …
type Step =
  | { kind: "door"; sectionId: string }
  | { kind: "question"; qIndex: number } // index into QUESTIONS
  | { kind: "scan" };

function buildFlow(): Step[] {
  const steps: Step[] = [];
  SECTIONS.forEach((s, si) => {
    steps.push({ kind: "door", sectionId: s.id });
    QUESTIONS.forEach((q, qi) => {
      if (q.section === s.id) steps.push({ kind: "question", qIndex: qi });
    });
    // theatre: run a fake system scan after a few chosen rooms
    if (si === 1 || si === 4 || si === 6) steps.push({ kind: "scan" });
  });
  return steps;
}

const roomVariants = {
  enter: { opacity: 0, x: 60, scale: 0.98 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.98 },
};

function FormFlow() {
  const router = useRouter();
  const { answers, setAnswer } = useFormStore();
  const { react } = useReactions();
  const flow = useMemo(buildFlow, []);
  const [stepIdx, setStepIdx] = useState(0);

  const step = flow[stepIdx];
  const currentQuestionNumber =
    step?.kind === "question" ? step.qIndex + 1 : undefined;

  const advance = () => {
    if (stepIdx + 1 >= flow.length) {
      router.push("/report");
      return;
    }
    setStepIdx((i) => i + 1);
  };

  const commit = (qId: string) => (v: AnswerValue) => {
    setAnswer(qId, v);
    react(); // toast + LOGGED stamp
    setTimeout(advance, 650); // let the stamp land before the room changes
  };

  if (!step) return null;

  return (
    <main className="min-h-screen pt-24">
      <Header current={currentQuestionNumber} />

      <div className="mx-auto max-w-3xl px-5 pb-32">
        <AnimatePresence mode="wait">
          {step.kind === "scan" && (
            <FakeLoading key={`scan-${stepIdx}`} onDone={advance} />
          )}

          {step.kind === "door" && (
            <SectionDoor
              key={`door-${step.sectionId}`}
              sectionId={step.sectionId}
              onEnter={advance}
            />
          )}

          {step.kind === "question" && (
            <motion.div
              key={QUESTIONS[step.qIndex].id}
              variants={roomVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-10"
            >
              <QuestionRenderer
                q={QUESTIONS[step.qIndex]}
                index={step.qIndex + 1}
                initial={answers[QUESTIONS[step.qIndex].id]}
                onCommit={commit(QUESTIONS[step.qIndex].id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function SectionDoor({
  sectionId,
  onEnter,
}: {
  sectionId: string;
  onEnter: () => void;
}) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  return (
    <motion.div
      variants={roomVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[70vh] flex-col items-center justify-center text-center"
    >
      <NoiseCard className="w-full max-w-xl px-8 py-14">
        <div className="mb-6 font-mono text-[10px] tracking-[0.45em] text-smoke">
          {section.caseLabel}
        </div>

        <div className="text-6xl">{section.emoji}</div>

        <h1 className="mt-6 font-display text-5xl tracking-wide text-bone sm:text-6xl">
          <span className="text-blood">{section.title.split(" ")[0]}</span>{" "}
          {section.title.split(" ").slice(1).join(" ")}
        </h1>

        <p className="mt-4 font-body text-lg text-smoke">{section.subtitle}</p>

        <RedLines className="mx-auto mt-8 justify-center" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="mt-10 border-2 border-blood px-10 py-3 font-display text-xl tracking-[0.25em] text-blood transition-colors hover:bg-blood hover:text-ink"
        >
          ENTER THE ROOM
        </motion.button>
      </NoiseCard>
    </motion.div>
  );
}

export default function FormPage() {
  return (
    <ReactionProvider>
      <FormFlow />
    </ReactionProvider>
  );
}
