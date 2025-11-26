'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-mint/15 via-gold/10 to-accent-sky/15" />
        <div className="absolute inset-0 bg-grid-fine bg-[size:32px_32px] opacity-10" />
      </div>

      <Container className="relative z-10">
        <div className="glass-card p-10 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <p className="tag w-fit">Присоединиться к клубу</p>
            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              Выберите пакет SP и заберите клубные преимущества уже сегодня
            </h2>
            <p className="text-text-secondary text-lg">
              Доступ к отелям, турам, AI-сервисам и партнёрским выплатам открывается сразу после оплаты.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-text-muted">
              <span className="tag">скидки на отели</span>
              <span className="tag">8+ AI-ботов</span>
              <span className="tag">партнёрка 20-55%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Button variant="primary" className="text-lg px-8 w-full sm:w-auto">
              Активировать SP
            </Button>
            <Button variant="secondary" className="text-lg px-8 w-full sm:w-auto">
              Посмотреть детали
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
