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
          primary: "#081c38",
          secondary: "#004aab",
          background: "#F1F3F2",
          lightskin: "#F0E2C0",
          titles: "#004aab",
          labels: "#1E0152",
        },
      },
    },
  },
  plugins: [],
}

//"#1E0152
//E94F34