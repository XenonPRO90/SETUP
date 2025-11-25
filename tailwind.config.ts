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
        // Background colors
        'bg-primary': '#000000',
        'bg-secondary': '#1A1A1A',
        'bg-tertiary': '#2D2D2D',
        
        // Gold colors
        'gold': {
          light: '#F4E4C1',
          DEFAULT: '#D4AF37',
          medium: '#D4AF37',
          dark: '#C9A961',
          bronze: '#8B7355',
        },
        
        // Text colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#F5F5DC',
        'text-muted': '#A0A0A0',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #F4E4C1 0%, #D4AF37 50%, #C9A961 100%)',
        'gradient-partner': 'linear-gradient(90deg, #4A4A4A 0%, #3A3A3A 100%)',
        'gradient-sapphire': 'linear-gradient(90deg, #4A5D6B 0%, #5A7D8B 100%)',
        'gradient-ruby': 'linear-gradient(90deg, #6B4A4A 0%, #8B5A5A 100%)',
        'gradient-emerald': 'linear-gradient(90deg, #4A6B4A 0%, #5A8B5A 100%)',
        'gradient-diamond': 'linear-gradient(90deg, #6B6B4A 0%, #8B8B5A 100%)',
        'gradient-royal': 'linear-gradient(90deg, #D4AF37 0%, #F4E4C1 100%)',
        'gradient-imperial': 'linear-gradient(90deg, #F4D03F 0%, #FFE66D 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
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
