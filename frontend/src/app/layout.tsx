import type { Metadata } from "next"
import { Syne, JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/global/CustomCursor"
import { GrainOverlay } from "@/components/global/GrainOverlay"
import { AmbientGlow } from "@/components/global/AmbientGlow"
import { LoadingScreen } from "@/components/global/LoadingScreen"
import { PageTransition } from "@/components/global/PageTransition"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Fuad Haque — AI/LLM Backend Engineer",
    template: "%s | Fuad Haque",
  },
  description: "AI/LLM Backend Engineer building production streaming, agentic tool-use loops, and LLM cost accounting with FastAPI, Anthropic SDK, and Next.js. Five live systems deployed, each with public docs and a recorded walkthrough.",
  keywords: ["Anthropic SDK", "LLM Integration", "Agentic Tool Use", "FastAPI", "Next.js", "AI Backend Engineer", "Vercel AI SDK", "Bangladesh developer"],
  openGraph: {
    title: "Fuad Haque — AI/LLM Backend Engineer",
    description: "Production AI backends — token streaming, cost accounting, agentic tool-use loops — and the Next.js interfaces that make them shippable.",
    url: "https://fuadhaque.com",
    siteName: "Fuad Haque",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://fuadhaque.com/og/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Fuad Haque — AI/LLM Backend Engineer",
      },
    ],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0F] text-[#EEEEFF] antialiased">
        <AmbientGlow />
        <GrainOverlay />
        <CustomCursor />
        <LoadingScreen />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}