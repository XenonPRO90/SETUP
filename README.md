# Setup.app Landing Page

Премиальный лендинг для Setup Club - комьюнити-платформы, объединяющей людей, путешествия и технологии.

## Технологии

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations (опционально)

## Запуск проекта

1. Установить зависимости:
```bash
npm install
```

2. Запустить dev-сервер:
```bash
npm run dev
```

3. Открыть [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
setup-website/
├── app/
│   ├── globals.css          # Глобальные стили
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Главная страница
├── components/
│   ├── ui/                   # UI компоненты
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Container.tsx
│   └── sections/             # Секции лендинга
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── SetupPointsSection.tsx
│       ├── PricingSection.tsx
│       ├── PartnerSection.tsx
│       ├── LevelUpSection.tsx
│       ├── QuickStartSection.tsx
│       ├── ProductsSection.tsx
│       ├── CTASection.tsx
│       └── Footer.tsx
└── public/                   # Статические файлы

```

## Особенности

✅ Премиальный темный дизайн с золотыми акцентами  
✅ Полностью адаптивный (mobile, tablet, desktop)  
✅ 10 секций лендинга из ТЗ  
✅ Современные анимации и hover-эффекты  
✅ SEO-оптимизация  
✅ TypeScript для type safety  

## Дизайн

Дизайн основан на фирменном стиле из презентации:
- Темный фон (#1A1A1A)
- Золотые акценты (#D4AF37)
- Шестиугольная геометрия
- Премиальная типографика

## Деплой

Проект готов для деплоя на Vercel:

```bash
npm run build
```

Или просто подключите GitHub репозиторий к Vercel.
