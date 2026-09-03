/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 40px rgba(15, 23, 42, 0.10)',
      },
      colors: {
        brand: {
          50: '#f2f8ff',
          100: '#dfeeff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};
