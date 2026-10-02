/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        emerald: {
          950: '#071A14',
          900: '#0A251C',
          800: '#10372B',
          700: '#184F3E',
          600: '#236E57',
        },
        champagne: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#EADFD4',
          300: '#D8C4B0',
          400: '#C5A88C',
          500: '#B89370',
          600: '#A37C57',
        },
        sand: '#F7F5F0',
      },
      boxShadow: {
        'bezel': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), 0 20px 40px -15px rgba(10, 37, 28, 0.07)',
        'bezel-dark': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 50px -10px rgba(184, 147, 112, 0.25)',
      }
    },
  },
  plugins: [],
}
