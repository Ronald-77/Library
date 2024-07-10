const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : colors.green[700],
        dbg : '#05061B',
        dcard : '#070E27',
      },
      screens:{
        'md-custom': '900px',
      },
      boxShadow:{
        'ttt':'2px 3px 3px 3px #80867F',
      }
    },
  },
  plugins: [],
}

