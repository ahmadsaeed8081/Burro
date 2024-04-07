/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'xs': {'max': '430px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      fontFamily: {
        zendots:['"Zen Dots", sans-serif']
      },
      colors: {
        'custom-green': '#7DF9FF',
        'custom-black': '#1C1C1C',
        // 'green-gradients': 'linear-gradient(251.38deg, rgba(141, 250, 255, 1) 0%, rgba(0, 224, 255, 1) 100%)',
        'green-gradients' : 'linear-gradient(251.38deg, #8DFAFF 0%, #00E0FF 99.76%)'
      },
    },
  },
  plugins: [],
}

