/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0d',
        surface: {
          DEFAULT: '#121217',
          card: '#16161e',
          glass: 'rgba(22, 22, 30, 0.7)',
          border: 'rgba(220, 38, 38, 0.25)',
        },
        crimson: {
          50: '#fef2f2',
          100: '#ffe1e1',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          glow: 'rgba(220, 38, 38, 0.5)',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          glow: 'rgba(245, 158, 11, 0.4)',
        },
      },
      boxShadow: {
        'crimson-glow': '0 0 25px -5px rgba(220, 38, 38, 0.4)',
        'gold-glow': '0 0 20px -5px rgba(245, 158, 11, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
