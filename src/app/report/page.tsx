"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { NoiseCard } from "@/components/NoiseCard";
import { GlitchText } from "@/components/GlitchText";
import { buildReport } from "@/lib/report";
import { useFormStore } from "@/lib/store";

function MeterRow({
  label,
  value,
  display,
  delay,
}: {
  label: string;
  value: number;
  display: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[180px_1fr_auto]"
    >
      <div className="font-mono text-xs tracking-[0.2em] text-smoke">{label}</div>
      <div className="col-span-2 h-3 bg-line sm:col-span-1">
        <motion.div
          className="h-full bg-blood"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="font-display text-2xl text-bone">{display}</div>
    </motion.div>
  );
}

function StatRow({
  label,
  value,
  delay,
  red,
}: {
  label: string;
  value: string;
  delay: number;
  red?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between border-b border-line py-4"
    >
      <span className="font-mono text-xs tracking-[0.2em] text-smoke">{label}</span>
      <span className={`font-display text-2xl ${red ? "text-blood" : "text-bone"}`}>
        {value}
      </span>
    </motion.div>
  );
}

export default function ReportPage() {
  const { answers } = useFormStore();
  const report = useMemo(() => buildReport(answers), [answers]);
  const [revealed, setRevealed] = useState(false);

  // Save answers to Google Sheet
  useEffect(() => {
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, report }),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error("Failed to submit report to Google Sheet:", res.status, await res.text());
        }
      })
      .catch((err) => {
        console.error("Error submitting report to Google Sheet:", err);
      });
  }, [answers, report]);

  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.25 },
        colors: ["#E53935", "#F2EEE6", "#8E1512"],
      });
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <Image
          src="/logo.jpg"
          alt="The Other Side Show"
          width={120}
          height={74}
          className="mx-auto mb-6 h-auto w-28 rounded-sm"
        />
        <div className="font-mono text-[10px] tracking-[0.5em] text-blood">
          CLASSIFIED · FOR SHOW USE ONLY
        </div>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-bone sm:text-6xl">
          THE <GlitchText text="OTHER SIDE" className="text-blood" /> REPORT
        </h1>
        <p className="mt-3 font-mono text-xs tracking-widest text-smoke">
          SUBJECT PROCESSED. FINDINGS BELOW.
        </p>
      </motion.div>

      <NoiseCard className="px-6 py-4 sm:px-10">
        <MeterRow label="DELUSION LEVEL" value={report.delusion} display={`${report.delusion}%`} delay={0.2} />
        <MeterRow
          label="MAIN CHARACTER ENERGY"
          value={report.mainCharacter * 10}
          display={report.mainCharacter.toFixed(1)}
          delay={0.35}
        />
        <MeterRow
          label="INDIAN PARENT SURVIVAL"
          value={report.parentSurvival}
          display={`${report.parentSurvival}%`}
          delay={0.5}
        />
        <StatRow label="RED FLAGS" value={`🚩 × ${report.redFlags}`} delay={0.65} red />
        <StatRow label="GREEN FLAGS" value={`${report.greenFlags}`} delay={0.75} />
        <StatRow label="UPI ADDICTION" value={report.upiAddiction} delay={0.85} red={report.upiAddiction === "Extreme"} />
        <StatRow label="REPLY SPEED" value={report.replySpeed} delay={0.95} />
        <StatRow label="CONFIDENTIALITY LEVEL" value={report.confidentiality} delay={1.05} red />
      </NoiseCard>

      {report.mostDangerous && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10"
        >
          <div className="mb-3 text-center font-mono text-[10px] tracking-[0.5em] text-blood">
            ⚠ MOST DANGEROUS ANSWER ON FILE
          </div>
          <button
            onClick={() => setRevealed(true)}
            className="w-full border-2 border-blood bg-panel p-8 text-left transition-shadow hover:shadow-redGlow"
          >
            <p className="font-mono text-xs tracking-widest text-smoke">
              {report.mostDangerous.prompt}
            </p>
            <p
              className={`mt-4 font-display text-2xl leading-snug text-bone transition-all duration-500 ${
                revealed ? "blur-0" : "blur-md select-none"
              }`}
            >
              &ldquo;{report.mostDangerous.answer}&rdquo;
            </p>
            {!revealed && (
              <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-blood">
                TAP TO DECLASSIFY. YOUR CHOICE. YOUR FUNERAL.
              </p>
            )}
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-12 text-center"
      >
        <p className="font-body text-lg text-bone">
          See you on the show. Bring nothing. We already have everything.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="border-2 border-line px-8 py-3 font-display text-lg tracking-widest text-smoke transition-colors hover:border-bone hover:text-bone"
          >
            HOME
          </Link>
          <Link
            href="/form"
            className="border-2 border-blood px-8 py-3 font-display text-lg tracking-widest text-blood transition-colors hover:bg-blood hover:text-ink"
          >
            AMEND TESTIMONY
          </Link>
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.35em] text-smoke">
          NEW ANGLES. <span className="text-blood">REAL TALK.</span>
        </p>
      </motion.div>
    </main>
  );
}