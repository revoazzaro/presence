/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsNormal : ['poppinsRegular', 'sans-serif'],
        poppinsBold : ['poppinsBold', 'sans-serif'],
        poppinsSemiBold : ['poppinsSemiBold', 'sans-serif'],
        poppinsMedium : ['poppinsMedium', 'sans-serif'],
        poppinsRegular : ['poppinsRegular', 'sans-serif'],
      }
    },
    backgroundSize: {
      "88px": '88px',
      "160px": '160px',
    }
  },
  plugins: [],
}

