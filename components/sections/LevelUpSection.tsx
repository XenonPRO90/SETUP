'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const LevelUpSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <p className="tag mx-auto w-fit">Рост статуса</p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Повышайте процент и ранги, наращивая оборот
          </h2>
          <p className="text-text-secondary text-lg">
            Групповой оборот копится и не сгорает — достигайте новых статусов, закрывая условия по GV и количеству партнёров.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <Card hover={false} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/10 via-transparent to-accent-sky/10" />
            <div className="relative space-y-4">
              <h3 className="text-2xl font-semibold text-white">Групповой оборот (GV)</h3>
              <p className="text-text-secondary">Общая сумма покупок в вашей структуре, копится без обнуления.</p>
              <div className="rounded-2xl bg-gradient-to-r from-gold-light via-gold to-accent-mint px-6 py-5 text-black font-semibold text-4xl shadow-[0_18px_60px_rgba(247,212,109,0.25)]">
                87 045 УЕ
              </div>
              <p className="text-sm text-text-muted">
                Движение GV — главный триггер роста процента в партнёрской программе.
              </p>
            </div>
          </Card>

          <Card hover={false} className="text-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Три партнёра вашего уровня</h3>
              <div className="flex gap-2 text-3xl">
                <span>👑</span>
                <span className="opacity-40">👑</span>
                <span className="opacity-20">👑</span>
              </div>
            </div>
            <p className="text-text-secondary mb-6">
              Выполняйте два условия: нужный GV и три партнёра на текущем статусе. После этого вы переходите на новый уровень и увеличиваете процент.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['GV выполнен', '3 активных партнёра', 'Подтверждение статуса'].map((item, idx) => (
                <div key={idx} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Партнёрские статусы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { level: 'Partner', icon: '👤', percent: '20%' },
              { level: 'Gold', icon: '🟡', percent: '25%' },
              { level: 'Sapphire', icon: '💎', percent: '30%' },
              { level: 'Ruby', icon: '💍', percent: '35%' },
              { level: 'Emerald', icon: '💚', percent: '40%' },
              { level: 'Diamond', icon: '💠', percent: '45%' },
              { level: 'Royal', icon: '👑', percent: '50%' },
              { level: 'Imperial', icon: '⭐', percent: '55%' },
            ].map((status, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{status.icon}</span>
                  <span className="font-semibold text-white">{status.level}</span>
                </div>
                <span className="text-gradient-gold font-semibold text-lg">{status.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
