'use client';
import React from 'react';
import { Container } from '../ui/Container';

const features = [
  {
    title: 'Лучшие цены на отели',
    description: 'до -35% от публичных тарифов по миру',
    icon: '🏨',
    tag: 'Travel'
  },
  {
    title: 'Доступ к новым продуктам',
    description: 'все релизы Setup появляются здесь первыми',
    icon: '🚀',
    tag: 'Early access'
  },
  {
    title: 'Эксклюзивные клубные туры',
    description: 'дизайн-маршруты для своих + сопровождение',
    icon: '✈️',
    tag: 'Клуб'
  },
  {
    title: 'AI-боты и сервисы',
    description: 'боты для путешествий, обучения и контента',
    icon: '🤖',
    tag: 'AI stack'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <p className="tag mx-auto w-fit">Что даёт Setup Club</p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Весь стек путешествий и AI в одном доступе
          </h2>
          <p className="text-text-secondary text-lg">
            Подключайте Setup Points и пользуйтесь продуктами клуба без переплат. Каждый новый релиз
            появляется здесь раньше остальных.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-px rounded-[28px] bg-gradient-to-b from-white/8 via-transparent to-white/2" />
              <div className="relative flex items-center justify-between mb-6">
                <span className="text-4xl">{feature.icon}</span>
                <span className="text-xs uppercase tracking-[0.12em] text-text-muted">{feature.tag}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-text-secondary text-base leading-relaxed">{feature.description}</p>

              <div className="mt-6 flex items-center gap-2 text-sm text-accent-mint font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
                доступен сразу после активации SP
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
