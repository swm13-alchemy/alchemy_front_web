const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notosansKR: ['Noto Sans KR', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'primary': '#1C65D1',
        'secondary': '#67A973',
        'surface': '#F5F6FF'
      },
      boxShadow: {
        '08dp': '0px 8px 16px rgba(0, 0, 0, 0.1)',
        '04dp': '0px 4px 8px rgba(0, 0, 0, 0.1)',
        '02dp': '0px 2px 4px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'google': "url('/asset/loginBtn/googleLogin.png')",
        'kakao': "url('/asset/loginBtn/kakaoLogin.png')"
      }
    },
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
