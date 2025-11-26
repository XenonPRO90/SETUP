'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-iris opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,249,209,0.14),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(115,210,255,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-grid-fine bg-[size:28px_28px] opacity-10" />
      </div>

      <Container className="relative z-10 pt-24 pb-16 lg:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="tag">
            <span className="h-2 w-2 rounded-full bg-accent-mint animate-pulse" />
            Приватное travel + AI комьюнити
          </div>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            Лучшие цены на отели • AI-боты • Партнёрка 20%+
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-text-primary">
              <Image src="/logo.svg" alt="Setup Logo" width={32} height={32} />
              <span className="text-text-secondary">Setup Club</span>
              <span className="text-accent-mint font-semibold">новая версия 2025</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display leading-tight text-white">
              Платформа, где <span className="text-gradient-gold">путешествия</span> и{' '}
              <span className="text-gradient-gold">AI</span> работают на ваш доход
            </h1>

            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              Лучшая цена на отели, авторские туры и набор AI-сервисов в одном клубе.
              Активируйте Setup Points и зарабатывайте на партнёрке уже с первой рекомендации.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'скидки на отели', value: 'до -35%' },
                { label: 'AI-сервисы', value: '8+ готовых ботов' },
                { label: 'партнёрка', value: 'от 20% c первой продажи' },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm uppercase tracking-wide text-text-muted">{item.label}</p>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button variant="primary" className="text-lg px-9">
                Присоединиться к клубу
              </Button>
              <Button variant="secondary" className="text-lg px-9">
                Посмотреть продукты
              </Button>
              <span className="text-sm text-text-muted">
                7 минут — чтобы настроить доступ
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-12 bg-gradient-to-br from-accent-mint/25 via-transparent to-accent-sky/25 blur-3xl" />
              <div className="relative glass-card border border-white/10 p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-accent-mint to-accent-sky flex items-center justify-center text-black font-bold">
                      SP
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Setup Points</p>
                      <p className="text-lg font-semibold text-white">Внутренний баланс</p>
                    </div>
                  </div>
                  <span className="tag bg-white/10 border-white/10">активно</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: 'Отели', detail: 'до 35% дешевле' },
                    { title: 'AI-боты', detail: 'travel, edu, lifestyle' },
                    { title: 'Клубные туры', detail: 'авторские маршруты' },
                    { title: 'Партнёрка', detail: 'до 55% уровнями' },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-3">
                      <p className="text-xs text-text-muted">{item.title}</p>
                      <p className="font-semibold text-white">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-gold-light/90 via-gold to-accent-mint px-5 py-4 text-black font-semibold shadow-[0_12px_45px_rgba(247,212,109,0.35)]">
                  Активируйте 100 / 500 / 1000 SP и получайте доступ на 1 год ко всем сервисам
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
