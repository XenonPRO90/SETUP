'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const SetupPointsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <p className="tag w-fit">Доступ в Setup Club</p>
            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              Setup Points — единый ключ к продуктам платформы
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Активируйте SP, чтобы получить баланс внутри клуба и использовать его на любой продукт.
              Баланс действует год и открывает партнёрку.
            </p>

            <div className="flex flex-wrap gap-3">
              {['100 SP', '500 SP', '1000 SP'].map((item) => (
                <span key={item} className="tag border-white/15 bg-white/5 text-white">
                  {item}
                </span>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-4 text-xl text-white font-semibold">
                <span className="h-11 w-11 rounded-2xl bg-gradient-to-br from-gold-light to-accent-mint text-black flex items-center justify-center font-bold">
                  1
                </span>
                <span className="text-text-secondary">SP =</span>
                <span className="text-gradient-gold text-2xl font-bold">1 USD</span>
              </div>
              <p className="text-sm text-text-muted mt-3">
                Сохраняются 12 месяцев. Можно тратить по частям и докупать по необходимости.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Card hover={false} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/10 via-transparent to-accent-sky/10" />
              <div className="relative grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Активируйте SP', text: 'Выберите пакет 100 / 500 / 1000 SP и зафиксируйте доступ' },
                  { title: 'Получите доступ', text: 'Сразу открываются отели, туры и AI-боты на год' },
                  { title: 'Зарабатывайте', text: 'Партнёрская комиссия от 20% с каждой рекомендации' },
                ].map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-9 w-9 rounded-2xl bg-gradient-to-br from-gold-light to-accent-mint text-black font-semibold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-sm uppercase tracking-[0.14em] text-text-muted">шаг</p>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                На что можно тратить SP
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Бронирование отелей и апартаментов по клубной цене',
                  'Клубные авторские туры с командой Setup',
                  'AI-боты: travel, контент, обучение, lifestyle',
                  'Любые будущие продукты платформы',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="h-2 w-2 rounded-full bg-accent-mint mt-2" />
                    <p className="text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
