import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#e11d48',
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337'
        },
        accent: {
          DEFAULT: '#f59e0b',
          50:  '#fffbeb',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted:   '#f8fafc',
          subtle:  '#f1f5f9'
        }
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%)',
        'card-gradient':    'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
        'overlay-gradient': 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)'
      },
      boxShadow: {
        'card':     '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'modal':    '0 25px 60px rgba(0,0,0,0.20)',
        'btn':      '0 4px 14px rgba(225,29,72,0.40)',
        'btn-wa':   '0 4px 14px rgba(37,211,102,0.40)',
        'float':    '0 8px 32px rgba(225,29,72,0.35)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.08)' }
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'drawer-up': {
          '0%':   { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in':    'fade-in 0.25s ease-out both',
        'slide-up':   'slide-up 0.30s cubic-bezier(0.16,1,0.3,1) both',
        'slide-down': 'slide-down 0.25s ease-out both',
        'scale-in':   'scale-in 0.30s cubic-bezier(0.16,1,0.3,1) both',
        'bounce-soft':'bounce-soft 0.35s ease-in-out',
        'shimmer':    'shimmer 2s linear infinite',
        'drawer-up':  'drawer-up 0.35s cubic-bezier(0.16,1,0.3,1) both'
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16,1,0.3,1)'
      }
    }
  },
  plugins: []
};

export default config;
