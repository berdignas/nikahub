/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8dcce',
          300: '#d7c4ae',
          400: '#c2a58b',
          500: '#ab896e',
          600: '#957158',
          700: '#7a5a46',
          800: '#644b3c',
          900: '#523f33',
        },
        sage: {
          50: '#f5f7f5',
          100: '#e5ebe5',
          200: '#cedbcd',
          300: '#acc2ab',
          400: '#86a385',
          500: '#688768',
          600: '#516c52',
          700: '#415642',
          800: '#364637',
          900: '#2d3b2e',
        },
        champagne: {
          50: '#fffdfa',
          100: '#fef9ee',
          200: '#fcf0d6',
          300: '#f8e2b3',
          400: '#f3ce89',
          500: '#eab65b',
          600: '#dc9a37',
          700: '#b87729',
          800: '#945c26',
          900: '#794b23',
        },
        gold: {
          light: '#f5e4b8',
          DEFAULT: '#c9a86a',
          dark: '#9a793c',
          metallic: '#dfba73',
        },
        olive: {
          DEFAULT: '#5d6b55',
          dark: '#3f4b39',
        },
        cream: '#faf7f2',
        parchment: '#f3ede2',
        wood: '#2c221e',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['var(--font-alex-brush)', 'Great Vibes', 'Alex Brush', 'cursive'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'float-slow': 'floating 4s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
