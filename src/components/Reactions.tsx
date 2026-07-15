"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { REACTION_TOASTS } from "@/lib/toasts";
import { pick } from "@/lib/utils";

// ------------------------------------------------------------------
// Reaction system: funny toast + red "LOGGED" evidence stamp.
// Fired whenever the guest commits an answer.
// ------------------------------------------------------------------

interface ReactionCtx {
  react: () => void;
}

const Ctx = createContext<ReactionCtx>({ react: () => {} });

export function useReactions() {
  return useContext(Ctx);
}

export function ReactionProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [stamp, setStamp] = useState<number | null>(null);
  const idRef = useRef(0);

  const react = useCallback(() => {
    const id = ++idRef.current;
    setToast({ id, text: pick(REACTION_TOASTS) });
    setStamp(id);
    setTimeout(() => {
      setToast((t) => (t?.id === id ? null : t));
    }, 2200);
    setTimeout(() => {
      setStamp((s) => (s === id ? null : s));
    }, 1100);
  }, []);

  return (
    <Ctx.Provider value={{ react }}>
      {children}

      {/* toast — bottom center, dossier voice */}
      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="border border-line bg-panel px-5 py-3 font-mono text-xs tracking-widest text-bone shadow-redGlow"
            >
              <span className="mr-2 text-blood">▮</span>
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LOGGED stamp — slams in center, like a rubber stamp on the file */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
        <AnimatePresence>
          {stamp && (
            <motion.div
              key={stamp}
              initial={{ opacity: 0, scale: 2.2, rotate: -18 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [2.2, 0.95, 1, 1], rotate: -12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, times: [0, 0.25, 0.8, 1] }}
              className="stamp px-6 py-2 font-display text-3xl"
            >
              LOGGED
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
