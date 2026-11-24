import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santhosh Raj | Full Stack & Backend Developer",
  description:
    "Portfolio of Santhosh Raj — Full Stack & Backend Developer specializing in Python, Next.js, FastAPI, PostgreSQL, and clean web applications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
