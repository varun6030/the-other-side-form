"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormStore } from "@/lib/store";
import { TOTAL_QUESTIONS } from "@/lib/questions";

export function Header({ current }: { current?: number }) {
  const { lastSavedAt } = useFormStore();
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!lastSavedAt) return;
    setShowSaved(true);
    const t = setTimeout(() => setShowSaved(false), 1600);
    return () => clearTimeout(t);
  }, [lastSavedAt]);

  const pct = current ? Math.round((current / TOTAL_QUESTIONS) * 100) : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="The Other Side Show"
            width={44}
            height={44}
            className="rounded-full border border-line"
            priority
          />
          <span className="hidden font-mono text-[11px] tracking-[0.3em] text-smoke sm:block">
            PRE-SHOW INTERROGATION
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <AnimatePresence>
            {showSaved && (
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[10px] tracking-[0.25em] text-smoke"
              >
                ● SAVED AUTOMATICALLY
              </motion.span>
            )}
          </AnimatePresence>

          {current ? (
            <div className="text-right">
              <div className="font-mono text-[11px] tracking-widest text-bone">
                Q {String(current).padStart(2, "0")} / {TOTAL_QUESTIONS}
              </div>
              <motion.div
                key={pct}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="font-display text-lg leading-none text-blood"
              >
                {pct}%
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>

      {/* progress rail */}
      <div className="h-[3px] w-full bg-line">
        <motion.div
          className="h-full bg-blood shadow-redGlow"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>
    </header>
  );
}
