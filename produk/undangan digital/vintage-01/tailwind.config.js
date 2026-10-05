/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          bg: '#FAF6F0',
          paper: '#F5EFE6',
          card: '#FFFFFF',
          border: '#E6DCCE',
          text: '#3D312A',
          subtext: '#66554B',
          accent: '#8C6A43',
          darkAccent: '#5C4033',
          rose: '#A65B49',
          gold: '#C5A059'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        vintage: '0 10px 30px -5px rgba(61, 49, 42, 0.08)',
        gold: '0 4px 20px rgba(140, 106, 67, 0.2)',
      }
    },
  },
  plugins: [],
}
