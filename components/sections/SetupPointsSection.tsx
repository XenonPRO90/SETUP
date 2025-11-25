'use client';
import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const SetupPointsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Доступ в <span className="text-gradient-gold">Setup Club</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Чтобы стать участником нашего travel-community и получить доступ ко всем продуктам, 
              нужно активировать <span className="text-gold font-semibold">SP</span> — внутренний баланс, 
              который вы затем используете на любые сервисы платформы
            </p>

            <h3 className="text-3xl font-bold mb-8">КАК ЭТО РАБОТАЕТ</h3>

            <Card hover={false} className="text-center mb-6">
              <p className="text-xl mb-4">Вы активируете SP</p>
              <p className="text-gold text-2xl font-bold mb-6">на сумму 100 / 500 / 1000</p>
              <div className="flex items-center justify-center gap-4 text-4xl font-bold">
                <span>1💎</span>
                <span className="text-gold">=</span>
                <span className="text-gold">1$</span>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <Card hover={false}>
              <h3 className="text-2xl font-bold mb-6 text-gold">
                SP становятся вашим личным балансом в платформе
              </h3>
              
              <p className="text-lg mb-6 text-text-secondary">
                Их можно использовать в течение года с момента их активации:
              </p>

              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-gold text-2xl">✦</span>
                  <span>на бронирование отелей</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-2xl">✦</span>
                  <span>на клубные туры</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-2xl">✦</span>
                  <span>на AI-ботов и сервисы</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-2xl">✦</span>
                  <span>на любые будущие продукты Setup</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
