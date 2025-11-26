import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Setup Club — Комьюнити-платформа для путешествий и AI",
  description: "Присоединяйся к Setup Club! Лучшие цены на отели, AI-боты, эксклюзивные туры и партнёрская программа с заработком 20%. Активируй Setup Points уже сегодня.",
  openGraph: {
    title: "Setup Club — Комьюнити-платформа для путешествий и AI",
    description: "Присоединяйся к Setup Club! Лучшие цены на отели, AI-боты, эксклюзивные туры.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
