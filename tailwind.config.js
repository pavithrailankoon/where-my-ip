/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        QuicksandMedium: ["Quicksand-Medium", "sans-serif"],
        QuicksandLight: ["Quicksand-Light", "sans-serif"], 
      },
    },  
  },
  plugins: [],
}

