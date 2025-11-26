'use client';
import React from 'react';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 mt-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-light to-accent-mint rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-black">S</span>
              </div>
              <span className="text-2xl font-bold text-gradient-gold">SETUP</span>
            </div>
            <p className="text-text-secondary">
              Комьюнити-платформа, объединяющая людей, путешествия и технологии. Лучшие цены, AI-сервисы и сильная партнёрка.
            </p>
            <div className="flex gap-3">
              <span className="tag">отели</span>
              <span className="tag">туры</span>
              <span className="tag">AI</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Навигация</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><a href="#" className="hover:text-white transition-colors">О платформе</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Условия использования</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Контакты</h3>
            <p className="text-text-secondary mb-2">
              Email: <a href="mailto:support@setup.app" className="text-gradient-gold hover:underline">support@setup.app</a>
            </p>
            <p className="text-text-secondary">
              Telegram: <a href="#" className="text-gradient-gold hover:underline">@setupclub</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-text-muted text-sm">
          <p>© 2025 Setup.app. Все права защищены.</p>
          <p>Клубный доступ • Travel • AI</p>
        </div>
      </Container>
    </footer>
  );
};
