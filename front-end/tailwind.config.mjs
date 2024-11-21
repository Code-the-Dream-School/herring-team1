/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#8E78AA',
      },
    },
    fontFamily: {
      text: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
