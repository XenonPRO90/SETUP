'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

const products = [
  {
    title: 'Бронирование отелей',
    features: ['Лучшие цены по всему миру', 'Оплата через SP'],
    icon: '🏨'
  },
  {
    title: 'AI-боты',
    features: ['Бот-нутрициолог', 'AI сохранение контента', 'AI фотосессии', 'Travel Search Bot', 'Транскрипция'],
    icon: '🤖'
  },
  {
    title: 'Клубные туры',
    features: ['Эксклюзивные маршруты', 'Для участников Setup Club'],
    icon: '🌍'
  },
  {
    title: 'Будущие продукты',
    features: ['Ранний доступ для участников', 'Новые AI-сервисы'],
    icon: '🚀'
  }
];

export const ProductsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Что доступно в <span className="text-gradient-gold">Setup</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <Card key={index}>
              <div className="text-6xl mb-6">{product.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gold">{product.title}</h3>
              <ul className="space-y-2">
                {product.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2 text-text-secondary">
                    <span className="text-gold">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
