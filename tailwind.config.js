/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: '#4A5E3A',
          light: '#657E51',
          dark: '#314025',
        },
        terracotta: {
          DEFAULT: '#C4875A',
          light: '#D3A17B',
          dark: '#A66B3F',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#E8DFD1',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
