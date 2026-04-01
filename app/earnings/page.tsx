import type { Metadata } from "next";
import { EarningsCalculator } from "@/components/calculator/EarningsCalculator";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Калькулятор заработка — SETUP",
  description:
    "Узнай, сколько можешь зарабатывать на каждом уровне партнёрской программы SETUP. Прозрачный расчёт дохода.",
};

export default function EarningsPage() {
  return (
    <main className="min-h-screen py-10 md:py-16">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-mint transition-colors mb-8 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          На главную
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Калькулятор{" "}
            <span className="text-gradient-gold">заработка</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Выбери уровень и посмотри, откуда берётся доход и что нужно сделать
          </p>
        </div>

        <EarningsCalculator />
      </Container>
    </main>
  );
}
