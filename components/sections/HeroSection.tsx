'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 border-2 border-gold rotate-12 rounded-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 border-2 border-gold -rotate-12 rounded-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <Container className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-12 inline-block">
          <Image
            src="/logo.svg"
            alt="Setup Logo"
            width={200}
            height={200}
            className="animate-float"
            priority
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="text-gradient-gold">SETUP</span>
          <br />
          <span className="text-white">Комьюнити-платформа</span>
          <br />
          <span className="text-text-secondary text-3xl md:text-5xl font-normal">
            объединяющая людей, путешествия и технологии
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
          Получи доступ к лучшим ценам на отели, AI-технологиям и эксклюзивным турам. 
          Зарабатывай с партнёрской программой.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="primary" className="text-lg">
            Присоединиться к Setup Club
          </Button>
          <Button variant="secondary" className="text-lg">
            Узнать больше
          </Button>
        </div>
      </Container>
    </section>
  );
};
