/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': '768px',
      // => @media (min-width: 768px) { ... }
      'laptop': '1024px'
      // => @media (min-width: 1024px) { ... }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
