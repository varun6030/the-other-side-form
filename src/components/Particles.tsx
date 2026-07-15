"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface P {
  left: number;
  size: number;
  duration: number;
  delay: number;
  red: boolean;
}

/** Slow-drifting dust in the spotlight. Rendered client-side only (random). */
export function Particles({ count = 26 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo<P[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * -20,
        red: Math.random() < 0.18,
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.red ? "#E53935" : "rgba(242,238,230,0.5)",
            opacity: p.red ? 0.7 : 0.35,
          }}
          initial={{ y: "105vh" }}
          animate={{ y: "-5vh" }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/** Faint vintage mic silhouette — echo of the logo's centrepiece. */
export function MicSilhouette() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 220"
      className="pointer-events-none absolute bottom-0 right-[6%] hidden h-[52vh] opacity-[0.05] md:block"
      fill="currentColor"
    >
      <rect x="30" y="10" width="40" height="70" rx="20" />
      {[22, 32, 42, 52, 62].map((y) => (
        <rect key={y} x="26" y={y} width="48" height="4" rx="2" className="text-ink" fill="#0A0A0A" />
      ))}
      <path d="M20 60 a30 30 0 0 0 60 0 h6 a36 36 0 0 1 -33 35.8 V150 h20 v8 H27 v-8 h20 v-54.2 A36 36 0 0 1 14 60 z" />
      <rect x="34" y="158" width="32" height="8" />
    </svg>
  );
}
