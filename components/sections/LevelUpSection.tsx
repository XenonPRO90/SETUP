'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const LevelUpSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Повышайте свой <span className="text-gradient-gold">процент и статус</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          {/* Left Column - GV */}
          <Card hover={false} className="text-center">
            <h3 className="text-3xl font-bold mb-6">Групповой оборот (GV)</h3>
            <p className="text-text-secondary mb-6">Общая сумма покупок в структуре</p>

            <div className="bg-gradient-to-r from-gold-dark to-gold-light p-6 rounded-xl mb-6">
              <p className="text-4xl md:text-5xl font-bold text-black">87 045 УЕ</p>
            </div>

            <p className="text-lg text-text-secondary">
              <span className="text-gold font-bold">Групповой товарооборот (GV)</span> считается накопительно
              и никогда не сгорает
            </p>
          </Card>

          {/* Right Column - Crowns */}
          <Card hover={false} className="text-center">
            <h3 className="text-3xl font-bold mb-6">Три партнёра</h3>
            <p className="text-text-secondary mb-8">вашего уровня</p>

            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="text-7xl">👑</div>
              <div className="text-7xl opacity-30">👑</div>
              <div className="text-7xl opacity-30">👑</div>
            </div>

            <p className="text-lg text-text-secondary">
              Когда оба условия выполнены — вы поднимаетесь на следующую ступень,
              а <span className="text-gold font-bold">ваш процент в системе увеличивается</span>
            </p>
          </Card>
        </div>

        {/* Partner Levels Table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Партнёрские статусы</h3>
          <div className="glass-card p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { level: 'Partner', icon: '👤', percent: '20%' },
                { level: 'Gold', icon: '🟡', percent: '25%' },
                { level: 'Sapphire', icon: '💎', percent: '30%' },
                { level: 'Ruby', icon: '💍', percent: '35%' },
                { level: 'Emerald', icon: '💚', percent: '40%' },
                { level: 'Diamond', icon: '💠', percent: '45%' },
                { level: 'Royal', icon: '👑', percent: '50%' },
                { level: 'Imperial', icon: '⭐', percent: '55%' }
              ].map((status, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-bg-secondary/50 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{status.icon}</span>
                    <span className="font-bold text-lg">{status.level}</span>
                  </div>
                  <span className="text-gold font-bold text-xl">{status.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
