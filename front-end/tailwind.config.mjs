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
      backgroundColor: {
        main: '#FAF0E6',
        orange: '#F15B2D',
        light_grey: '#D9D9D9',
        purple: '#5F3E97',
        light_purple: '#8E78AA'
      },
      textColor: {
        'custom-red': '#E53E3E',
      }
    },
    screens: {
      'xs': '320px',  
      'sm': '480px',
      'md': '768px',  // => @media (min-width: 768px) { ... }  tablet iPad mini
      'lg': '1024px', // => @media (min-width: 1024px) { ... } tablet iPad Pro
      'xl': '1280px', // => @media (min-width: 1280px) { ... } laptop
      '2xl': '1440px', // => @media (min-width: 1440px) { ... } decktop
      '3xl': '1536px' 
    },
    fontFamily: {
      text: ['Poppins', 'sans-serif'],
      title: ['Inria Sans', 'sans-serif']
    },
  },
  plugins: [],
};
