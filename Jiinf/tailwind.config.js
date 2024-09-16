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
          primary: "#1E0152",
          secondary: "#E94F34",
          background: "#F1F3F2",
          lightskin: "#F0E2C0",
          titles: "#E94F34",
          labels: "#1E0152",
        },
      },
    },
  },
  plugins: [],
}