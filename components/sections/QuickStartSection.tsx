'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const QuickStartSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-transparent via-gold/5 to-transparent">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          <span className="text-gradient-gold">Бонус быстрого старта</span>
        </h2>

        <p className="text-center text-xl text-text-secondary mb-16 max-w-3xl mx-auto">
          Это лучший способ быстро включиться в систему и увидеть первые результаты
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <Card className="text-center">
            <div className="text-6xl mb-6">📅📅📅</div>
            <h3 className="text-3xl font-bold text-gold mb-3">30 дней</h3>
          </Card>

          <Card className="text-center">
            <div className="text-6xl mb-6">👑👑👑👑</div>
            <h3 className="text-3xl font-bold text-gold mb-3">4 партнера</h3>
          </Card>

          <Card className="text-center">
            <div className="text-6xl mb-6">✦ ✦ ✦</div>
            <h3 className="text-2xl font-bold text-gold mb-2">Бонусы</h3>
            <p className="text-xl text-white font-semibold">100$ / 500$ / 1000$</p>
          </Card>
        </div>

        <p className="text-center text-xl text-text-secondary max-w-3xl mx-auto">
          Выполните два условия и получите бонус в зависимости от вашего пакета
        </p>
      </Container>
    </section>
  );
};
