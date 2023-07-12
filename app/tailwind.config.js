/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: {
        DEFAULT: '#1C1C27',
        light: '#363740',
      },
      white: {
        DEFAULT: '#FFFFFF',
        dimmed: {
          DEFAULT: '#FFFFFF66',
          heavy: '#FFFFFF33',
        },
      },
      red: '#EF4444',
      yellow: '#FFB43A',
      green: '#22C55E',
    },
    fontFamily: {
      DEFAULT: ['Inter', 'sans-serif'],
    },

    fontSize: {
      xl: '1.25rem',
      l: '1rem',
      m: '0.875rem',
      s: '0.75rem',
    },
    fontWeight: {
      700: '700',
      500: '500',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
