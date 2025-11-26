'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const plans = [
  {
    sp: '100 SP',
    title: 'Start',
    description: 'Попробуйте продукты и проверьте цены на отели',
    activity: '30 дней активности партнёрки',
    balance: '100 SP на сервисы',
    bonus: '20% с каждой рекомендации',
  },
  {
    sp: '500 SP',
    title: 'Growth',
    description: 'Подходит для поездок и первых продаж в партнёрке',
    activity: '180 дней активности',
    balance: '500 SP на сервисы',
    bonus: '25% c продаж + бонусы быстрого старта',
    highlighted: true,
  },
  {
    sp: '1000 SP',
    title: 'Pro',
    description: 'Максимальный доступ и высокий процент в системе',
    activity: '360 дней активности',
    balance: '1000 SP на сервисы',
    bonus: '30%+ с оборота и приоритетный доступ',
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <p className="tag mx-auto w-fit">Пакеты Setup Points</p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Выберите объём SP и фиксируйте доступ на год
          </h2>
          <p className="text-text-secondary text-lg">
            Каждый пакет даёт баланс SP на сервисы Setup и активирует партнёрскую программу сразу
            после покупки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl border ${
                plan.highlighted ? 'border-accent-mint/60 shadow-[0_20px_80px_rgba(141,249,209,0.18)]' : 'border-white/10'
              } bg-white/5 p-6 backdrop-blur-lg flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-2`}
            >
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/10 via-transparent to-accent-sky/15" />
              )}
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-text-muted mb-1">{plan.title}</p>
                  <h3 className="text-4xl font-semibold text-white">{plan.sp}</h3>
                </div>
                <span className="tag bg-white/10 border-white/10">{plan.balance}</span>
              </div>

              <p className="relative text-text-secondary leading-relaxed min-h-[64px]">{plan.description}</p>

              <div className="relative space-y-3">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-text-muted mb-1">Активность партнёрки</p>
                  <p className="text-lg text-white font-semibold">{plan.activity}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-gold-light/60 via-gold/80 to-accent-mint/70 p-4 text-black font-semibold shadow-[0_12px_40px_rgba(247,212,109,0.25)]">
                  {plan.bonus}
                </div>
              </div>

              <div className="relative mt-auto">
                <Button variant="primary" className="w-full">
                  Активировать
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Card hover={false} className="text-center py-6">
          <p className="text-text-secondary">
            Оплачивая SP вы получаете внутренний баланс = стоимости в USD и доступ ко всем продуктам на 12 месяцев.
          </p>
        </Card>
      </Container>
    </section>
  );
};
