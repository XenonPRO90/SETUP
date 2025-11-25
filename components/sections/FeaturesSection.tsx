'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

const features = [
  {
    title: 'Лучшие цены на отели',
    description: 'по всему миру',
    icon: '🏨'
  },
  {
    title: 'Доступ к новым продуктам',
    description: 'платформы',
    icon: '🚀'
  },
  {
    title: 'Эксклюзивные клубные туры',
    description: 'авторские туры, созданные специально для участников Setup',
    icon: '✈️'
  },
  {
    title: 'AI-боты и сервисы',
    description: 'современные AI-боты для жизни, обучения, путешествий и задач',
    icon: '🤖'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Возможности участников <span className="text-gradient-gold">Setup Club</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-6xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gold">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
