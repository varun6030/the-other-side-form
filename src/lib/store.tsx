"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type AnswerValue = string | number | string[] | boolean | null;

interface FormState {
  answers: Record<string, AnswerValue>;
  setAnswer: (id: string, value: AnswerValue) => void;
  lastSavedAt: number | null;
  reset: () => void;
}

const STORAGE_KEY = "the-other-side-form-v1";

const Ctx = createContext<FormState | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      /* fresh start */
    }
  }, []);

  const setAnswer = useCallback((id: string, value: AnswerValue) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          setLastSavedAt(Date.now());
        } catch {
          /* storage full / private mode — keep in memory */
        }
      }, 400);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  return (
    <Ctx.Provider value={{ answers, setAnswer, lastSavedAt, reset }}>
      {children}
    </Ctx.Provider>
  );
}

export function useFormStore(): FormState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFormStore must be used inside <FormProvider>");
  return ctx;
}
