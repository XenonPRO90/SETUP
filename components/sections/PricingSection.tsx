'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const plans = [
  {
    sp: '100 SP',
    description: 'подходит тем, кто хочет протестировать платформу',
    activity: '30 дней',
    balance: '100 SP'
  },
  {
    sp: '500 SP',
    description: 'Хороший выбор, если вы планируете поездки или продукты в течение полугода',
    activity: '180 дней (6 месяцев)',
    balance: '500 SP'
  },
  {
    sp: '1000 SP',
    description: 'Оптимальное решение',
    activity: '360 дней (12 × 30 дней)',
    balance: '1000 SP'
  }
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Пакеты <span className="text-gradient-gold">SP</span>
        </h2>

        <p className="text-center text-xl text-text-secondary mb-16 max-w-4xl mx-auto">
          При активации SP вы получаете два элемента одновременно:<br />
          <span className="text-gold">✦</span> Баланс SP, который можете тратить на любые продукты Setup<br />
          <span className="text-gold">✦</span> Активность маркетинга, которая открывает доступ к партнёрской программе
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index}>
              <h3 className="text-4xl font-bold text-gold mb-4 text-center">{plan.sp}</h3>
              <p className="text-text-secondary mb-6 text-center min-h-[60px]">{plan.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="border-t border-gold/30 pt-4">
                  <p className="text-sm text-text-secondary mb-1">активность маркетинга</p>
                  <p className="text-xl font-bold">{plan.activity}</p>
                </div>
                <div className="border-t border-gold/30 pt-4">
                  <p className="text-sm text-text-secondary mb-1">баланс</p>
                  <p className="text-2xl font-bold text-gold">{plan.balance}</p>
                </div>
              </div>

              <Button variant="primary" className="w-full">
                Выбрать
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
