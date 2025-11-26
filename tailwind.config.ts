import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050A16',
        'bg-secondary': '#0B1324',
        'bg-tertiary': '#0F1C36',
        'panel': '#0F1A30',
        'outline': '#1E2B48',

        gold: {
          light: '#FCE6B1',
          DEFAULT: '#F7D46D',
          medium: '#E3B85E',
          dark: '#D59A4E',
          bronze: '#8C6B3F',
        },

        'accent-mint': '#8DF9D1',
        'accent-sky': '#73D2FF',
        'accent-iris': '#8DA0FF',

        'text-primary': '#E8EEFF',
        'text-secondary': '#A4B5D6',
        'text-muted': '#6E7A99',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(120deg, #FCE6B1 0%, #F7D46D 35%, #8DF9D1 100%)',
        'gradient-mint': 'linear-gradient(120deg, #73D2FF 0%, #8DF9D1 50%, #F7D46D 100%)',
        'gradient-iris': 'linear-gradient(160deg, #0B1324 0%, #141F3A 50%, #0B1324 100%)',
        'grid-fine': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'hero': '72px',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '48px',
        'xl': '72px',
        '2xl': '120px',
      },
      borderRadius: {
        'card': '16px',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};

export default config;
