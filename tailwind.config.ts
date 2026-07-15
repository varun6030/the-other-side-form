import type { Config } from "tailwindcss";

/**
 * THE OTHER SIDE — design tokens
 * Derived from the official logo: pitch black, bone white, blood red, grunge.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A", // stage black
        panel: "#121212", // raised black
        line: "#232323", // hairline on black
        bone: "#F2EEE6", // logo's distressed white
        smoke: "#8A8578", // muted bone
        blood: "#E53935", // the accent
        bloodDeep: "#8E1512", // pressed / stamped red
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        glitch: {
          "0%, 92%, 100%": { transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "93%": { transform: "translate(-3px, 1px)", clipPath: "inset(10% 0 60% 0)" },
          "95%": { transform: "translate(3px, -1px)", clipPath: "inset(60% 0 5% 0)" },
          "97%": { transform: "translate(-2px, 0)", clipPath: "inset(30% 0 40% 0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseLine: {
          "0%, 100%": { transform: "scaleX(0.2)", opacity: "0.4" },
          "50%": { transform: "scaleX(1)", opacity: "1" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        glitch: "glitch 4s infinite steps(1)",
        scanline: "scanline 9s linear infinite",
        pulseLine: "pulseLine 2.4s ease-in-out infinite",
        flicker: "flicker 3s ease-in-out infinite",
      },
      boxShadow: {
        spotlight: "0 0 120px 30px rgba(242,238,230,0.06)",
        redGlow: "0 0 40px rgba(229,57,53,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
