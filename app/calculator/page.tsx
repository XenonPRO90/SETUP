import type { Metadata } from "next";
import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Калькулятор дохода — Setup Club",
  description:
    "Рассчитай свой потенциальный доход в партнёрской программе Setup Club. Узнай, сколько можешь зарабатывать с командой.",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen py-12 md:py-20">
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

        <div className="text-center mb-12">
          <div className="tag mb-4 mx-auto w-fit">
            <span className="text-accent-mint">$</span>
            Калькулятор дохода
          </div>
          <h1 className="text-3xl md:text-5xl font-display mb-4">
            Рассчитай свой{" "}
            <span className="text-gradient-gold">доход</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Настрой параметры своей команды и узнай, сколько ты можешь
            зарабатывать в партнёрской программе Setup
          </p>
        </div>

        <IncomeCalculator />
      </Container>
    </main>
  );
}
