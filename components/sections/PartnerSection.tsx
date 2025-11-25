'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const PartnerSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-transparent to-bg-secondary/30">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Статус <span className="text-gradient-gold">«Partner»</span>
        </h2>

        <p className="text-center text-xl text-text-secondary mb-16 max-w-3xl mx-auto">
          После активации любого партнёрского пакета — Pro 100, Pro 500 или Pro 1000 — 
          вы автоматически получаете статус
        </p>

        <h3 className="text-3xl font-bold text-center mb-12 text-gold">С ЭТОГО МОМЕНТА</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <div className="text-6xl mb-6">👥</div>
            <h4 className="text-2xl font-bold text-white mb-3">
              Вы участвуете в партнёрской программе
            </h4>
          </Card>

          <Card className="text-center">
            <div className="text-6xl mb-6">💰</div>
            <h4 className="text-2xl font-bold text-white mb-3">
              и начинаете зарабатывать <span className="text-gold">от 20%</span> с каждой вашей личной рекомендации
            </h4>
          </Card>
        </div>
      </Container>
    </section>
  );
};
