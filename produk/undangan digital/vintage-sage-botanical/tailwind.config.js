/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F7F2',
          100: '#EAEFE2',
          200: '#D7DFCB',
          300: '#BCC9A9',
          400: '#9EAF84',
          500: '#7E8F65',
          600: '#65744F',
          700: '#515E3F',
          800: '#3D4730',
          900: '#2A3122',
          light: '#EEF0E9',
          bg: '#F5F6F2',
          border: '#D8DED0',
          primary: '#767D63',
          dark: '#51583D',
          deep: '#3A402B',
          olive: '#656A5B',
        },
        vintage: {
          paper: '#FBF9F5',
          ivory: '#F4EFE6',
          parchment: '#EAE4D7',
          border: '#DDD5C5',
          charcoal: '#2C2B29',
          text: '#3D3B38',
          subtext: '#686561',
          gold: '#C2A676',
          goldDark: '#9C8157',
          goldLight: '#E8D8BA',
          accent: '#828C6E',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        upright: ['"Cormorant Upright"', 'Georgia', 'serif'],
        gilda: ['"Gilda Display"', 'Georgia', 'serif'],
        jura: ['"Jura"', 'sans-serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        sans: ['"Montserrat"', '"Quicksand"', 'sans-serif'],
      },
      boxShadow: {
        vintage: '0 10px 30px -5px rgba(81, 88, 61, 0.12)',
        gold: '0 4px 20px rgba(194, 166, 118, 0.25)',
        arch: '0 15px 35px -5px rgba(58, 64, 43, 0.18)',
        luxury: '0 20px 45px -10px rgba(44, 43, 41, 0.15)',
      },
      borderRadius: {
        'arch': '160px 160px 16px 16px',
        'arch-full': '240px 240px 0 0',
      }
    },
  },
  plugins: [],
}
