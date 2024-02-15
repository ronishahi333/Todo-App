/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/vue-project/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        rang:{
          100: "#516295",
          200: "#f5f2f0",
          300: "#f7f7ff",
          400: "#ed6a5a"
        }
      },
    },
  },
  plugins: [],
}

