/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        newake: ['newake', 'sans-serif'],
        titillium: ['titillium', 'sans-serif'],
      },
      colors: {
        senai: {
          DEFAULT: '#4A87A6',
          100: '#BEECEF',
          200: '#6EBBCE',
        },
      },
    },
  },
  plugins: [],
}