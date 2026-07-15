"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/Spotlight";
import { Particles, MicSilhouette } from "@/components/Particles";
import { RedLines } from "@/components/RedLines";
import { GlitchText } from "@/components/GlitchText";

export default function Landing() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <Spotlight />
      <Particles />
      <MicSilhouette />

      {/* logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <Image
          src="/logo.jpg"
          alt="The Other Side Show — New Angles. Real Talk."
          width={420}
          height={260}
          priority
          className="h-auto w-72 rounded-sm sm:w-96"
        />
        <div className="absolute inset-0 shadow-spotlight" />
      </motion.div>

      <RedLines className="mt-8" />

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 font-mono text-sm tracking-[0.35em] text-smoke"
      >
        SABKA EK{" "}
        <span className="text-blood">
          <GlitchText text="OTHER SIDE" />
        </span>{" "}
        HOTA HAI.
      </motion.p>

      {/* the setup */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-10 max-w-md text-center"
      >
        <p className="font-body text-xl leading-relaxed text-bone">Welcome.</p>
        <p className="mt-2 font-body text-xl leading-relaxed text-bone">
          This form isn&apos;t just information.
        </p>
        <p className="mt-4 font-display text-4xl tracking-wide text-blood">
          IT&apos;S EVIDENCE.
        </p>
      </motion.div>

      {/* begin */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => router.push("/form")}
        className="mt-12 border-2 border-bone px-14 py-4 font-display text-2xl tracking-[0.3em] text-bone transition-colors hover:border-blood hover:bg-blood hover:text-ink"
      >
        BEGIN
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-6 font-mono text-[10px] tracking-[0.3em] text-smoke"
      >
        WE DEFINITELY WON&apos;T JUDGE. PROBABLY.
      </motion.p>
    </main>
  );
}
