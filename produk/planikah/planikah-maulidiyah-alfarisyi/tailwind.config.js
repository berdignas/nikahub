/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        luxury: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E7DDD3',
          300: '#D5C4B1',
          400: '#BFA68B',
          500: '#A48666',
          600: '#866B4F',
          700: '#6A533D',
          800: '#534131',
          900: '#3D2F23',
          950: '#231A13',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
          600: '#A38218',
        }
      }
    },
  },
  plugins: [],
}
