/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '3xl': {'min': '1850px'},
      '2xl': {'max': '1536px'},
      'xl': {'max': '1280px'},
      'lg': {'max': '1024px'},
      'md': {'max': '768px'},
      'sm': {'max': '640px'},
      '2sm': {'max': '430px'},
      'h2xl': {'raw': '(max-height: 1000px)'},
      'hxl': {'raw': '(max-height: 800px)'},
      'hlg': {'raw': '(max-height: 650px)'},
      'hsm': {'raw': '(max-height: 550px)'},
    },
    extend: {
      animation: {
        infiniteMove:'infiniteMove 2s infinite ease-in-out',
      },
      keyframes: {
        rotation: {
          '0%':{ borderRadius: "0%", transform: "rotate(0deg)"},
          '100%': { borderRadius: "50%", transform: "rotate(720deg)"},
        },
        infiniteMove:{
          '0%':{transform: 'translateY(-50%)'},
          '50%':{transform: 'translateY(-45%)'},
          '100%':{transform: 'translateY(-50%)'},
        },
      },
      fontFamily: {
        'sans': ['Barlow',...defaultTheme.fontFamily.sans],
        'Quesha': ['Quesha', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "primary": '#DE5B30',
        "secondary": '#582D3E',
        "background": '#FFF7F1',
        "typo": '#000',
      },
      fontSize: {
      },
      boxShadow: {
        'base': '0 3px 6px rgba(0, 0, 0, 0.16)',
      },
      height: {
        'fullwithHeader' : 'calc(100vh - 112px - 35px)',
        'home' : 'calc(97vh - 112px - 35px)',
        'fullwithHeaderCheckout' : 'calc(100vh - 176px)',
      },
      minHeight: {
        'fullwithHeader' : 'calc(100vh - 112px)',
      },
      backgroundImage: {
        mainGradient:'linear-gradient(89.28deg, #582D3E 5.99%, #E25E3E 94.17%)',
        homeGradient1:'linear-gradient(180deg, rgba(200, 179, 194, 0.42) 0%, #ECA683 100%)',
        homeGradient2:'linear-gradient(90deg, #DE5B30 0%, #582D3E 100%)',
        homeGradient3:'linear-gradient(90deg, rgba(200, 179, 194, 1) 0%, #ECA683 100%)',
        pictoGradient:'linear-gradient(90deg, #ECA683 0%, #C8B3C2 100%)',
        menuGradient:'linear-gradient(180deg, #A8798F 0%, #E25E3E 100%)',
        modalRent:"linear-gradient(180deg, rgba(163, 124, 153, 0.6) 0%, rgba(236, 166, 131, 0.6) 100%)",
        footer:'linear-gradient(87.62deg, #ECA683 0%, #FFF7F1 85%)',
        categories:'linear-gradient(90deg, #A37C99 0%, #ECA683 30.5%)'

      },
      width: {
        'rightSide':'calc(100% - 250px)'
      },
    },
    },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
