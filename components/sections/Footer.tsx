'use client';
import React from 'react';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gold/20 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-light to-gold-dark rounded-xl flex items-center justify-center transform rotate-12">
                <span className="text-2xl font-bold text-black transform -rotate-12">S</span>
              </div>
              <span className="text-2xl font-bold text-gradient-gold">SETUP</span>
            </div>
            <p className="text-text-secondary">
              Комьюнити-платформа, объединяющая людей, путешествия и технологии
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Ссылки</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><a href="#" className="hover:text-gold transition-colors">О платформе</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Условия использования</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Контакты</h3>
            <p className="text-text-secondary mb-2">
              Email: <a href="mailto:support@setup.app" className="text-gold hover:underline">support@setup.app</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 text-center text-text-secondary">
          <p>© 2025 Setup.app. Все права защищены.</p>
        </div>
      </Container>
    </footer>
  );
};
