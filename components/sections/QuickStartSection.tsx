'use client';
import React from 'react';
import { Container } from '../ui/Container';

export const QuickStartSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-mint/6 via-transparent to-accent-sky/8" />
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <p className="tag mx-auto w-fit">Бонус быстрого старта</p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Получите денежный бонус за первые 30 дней
          </h2>
          <p className="text-text-secondary text-lg">
            Выполните два условия и заберите дополнительный кэш в зависимости от пакета SP.
          </p>
        </div>

        <div className="glass-card p-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📅', title: '30 дней', text: 'С момента активации пакета' },
              { icon: '👥', title: '4 партнёра', text: 'подключите 4 партнёров любого уровня' },
              { icon: '💰', title: 'Бонусы', text: '100$ / 500$ / 1000$ — по вашему пакету' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-accent-mint/40 bg-gradient-to-r from-accent-mint/10 via-white/5 to-accent-sky/10 p-5 text-center text-text-secondary">
            Условия прозрачные: срок — 30 дней, 4 подключённых партнёра и вы получаете денежный бонус в USD.
          </div>
        </div>
      </Container>
    </section>
  );
};
