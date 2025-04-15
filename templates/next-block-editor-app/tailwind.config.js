const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'border-flow': 'border-flow 1.5s linear infinite',
        'bg-pulse': 'bg-pulse 3s ease-out infinite',
      },
      keyframes: {
        'border-flow': {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }
        },
        'bg-pulse': {
          '0%': {
            transform: 'scale(1)',
            opacity: '0'
          },
          '50%': {
            opacity: '0.15'
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0'
          }
        }
      },
      backgroundImage: {
        'gradient-animated': 'linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(191, 219, 254) 50%, rgb(37, 99, 235) 100%)',
        'gradient-bg': 'radial-gradient(circle, rgb(224, 242, 254) 0%, rgb(243, 244, 246) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
