'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/5 to-transparent"></div>
      
      <Container className="relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Готовы присоединиться к <span className="text-gradient-gold">Setup Club</span>?
        </h2>

        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
          Выберите пакет и начните пользоваться преимуществами уже сегодня
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="primary" className="text-lg">
            Выбрать тариф
          </Button>
          <Button variant="secondary" className="text-lg">
            Узнать больше
          </Button>
        </div>
      </Container>
    </section>
  );
};
