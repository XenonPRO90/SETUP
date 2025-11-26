'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const PartnerSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <p className="tag mx-auto w-fit">Партнёрская программа</p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Получите статус «Partner» сразу после активации SP
          </h2>
          <p className="text-text-secondary text-lg">
            Зарабатывайте на рекомендациях Setup: партнёрка стартует с 20% и растёт вместе с вашим статусом.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card hover={false} className="relative overflow-hidden p-8 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-sky/10 via-transparent to-accent-mint/15" />
              <div className="relative grid md:grid-cols-2 gap-6">
                {[
                  { icon: '👥', title: 'Стартовый доход', text: '20% с каждой личной рекомендации сразу после активации SP' },
                  { icon: '💡', title: 'Инструменты', text: 'готовые материалы и AI-боты для коммуникации с аудиторией' },
                  { icon: '⏱️', title: 'Мгновенные выплаты', text: 'фиксируем продажи в реальном времени, выплаты — раз в неделю' },
                  { icon: '📈', title: 'Рост статуса', text: 'увеличивайте процент до 55% за счёт оборота и команды' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-5 flex gap-3 items-start">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-accent-mint/40 bg-gradient-to-b from-accent-mint/10 to-white/5 p-6 shadow-[0_20px_60px_rgba(141,249,209,0.18)]">
              <p className="text-sm uppercase tracking-[0.14em] text-text-muted mb-2">Стартовый процент</p>
              <p className="text-5xl font-semibold text-white mb-3">20%</p>
              <p className="text-text-secondary">фиксируется сразу после покупки любого пакета SP</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.14em] text-text-muted mb-2">Как подключить</p>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex gap-3 items-start">
                  <span className="h-2 w-2 rounded-full bg-accent-mint mt-2" />
                  Активируйте пакет SP (100 / 500 / 1000)
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-2 w-2 rounded-full bg-accent-mint mt-2" />
                  Получите личную реферальную ссылку
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-2 w-2 rounded-full bg-accent-mint mt-2" />
                  Делитесь ссылкой и отслеживайте продажи в кабинете
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
