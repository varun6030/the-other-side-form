"use client";

import { motion } from "framer-motion";

/** Slow sweeping stage spotlight behind the landing logo. */
export function Spotlight() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[30%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(242,238,230,0.10) 0%, rgba(242,238,230,0.04) 35%, transparent 70%)",
      }}
      animate={{ x: ["-54%", "-46%", "-54%"], scale: [1, 1.06, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
