/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#8E78AA',
        background: '#FAF0E6',
        orangeButton: '#FF8864',
        yellowButton: '#FFC059',
      },
    },
    fontFamily: {
      text: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
