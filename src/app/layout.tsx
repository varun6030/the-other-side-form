import type { Metadata } from "next";
import { Anton, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/lib/store";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "THE OTHER SIDE — Pre-Show Form",
  description: "Sabka ek Other Side hota hai. This form isn't information. It's evidence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-ink text-bone antialiased noise scanline`}
      >
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
