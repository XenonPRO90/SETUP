import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
