/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jiinf: {
          primary: "#4922A4",
          secondary: "#593E99",
        },
      },
    },
  },
  plugins: [],
}