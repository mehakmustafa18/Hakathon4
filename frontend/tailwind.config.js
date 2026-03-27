/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E50000',
          dark: '#0F0F0F', // Netflix-like main background
          darker: '#0A0A0A',
          gray: '#1A1A1A', // Cards / Secondary bg
          text: '#BFBFBF',
          light: '#E6E6E6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
